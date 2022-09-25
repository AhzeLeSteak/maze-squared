import {Game} from "@/Engine/Game";
import {degreToRadian} from "@/Engine/utils";
import {textures} from "@/Engine/Texture/load_textures";
import {Pixel} from "@/Engine/Texture/Texture";
import {CanvasWebGL} from "./Abstract/CanvalWebGL";


const SAMPLE_SIZE = 10;
let tick_index = 0;
let tick_sum = 0;
const tick_list = new Array(SAMPLE_SIZE).fill(0);

export class CanvasRaycast extends CanvasWebGL {
    private shadow_ratio = 0.2;
    private context2D: CanvasRenderingContext2D;

    constructor(width: number, height?: number) {
        super({ x: width, y: height || (width * 9) / 16 });
        this.context2D = this.createCanvas().getContext("2d")!;
        this.resizeCanvasHtml(this.context2D.canvas, this.size);
        this.context2D.font = "16px Comic sans";
        this.context2D.fillStyle = "yellow";
    }

    drawContext(game: Game, dt: number): void {
        //if (!environment.draw3d) return;
        this.reset();

        this.drawFps(dt);

        const floor_texture = textures.get("floor")!;
        const floor_tile_size = floor_texture.columns.length;

        const map = game.map;
        const player_pos = game.player.pos;

        const col_size = 8; //numbers of columns grouped for rendering
        const col_size_floors = 8;

        let prev_dist = 0;

        for (let base_x = 0; base_x < this.size.x; base_x+=col_size) {
            const ray_diff_angle = (((base_x - this.size.x / 2) * game.view_angle) / this.size.x) * degreToRadian;
            const ray_angle = game.player.angle + ray_diff_angle; // get the angle of the actual ray
            const nextWall = map.getNextWall(player_pos, ray_angle); // calculate where the ray goes

            const t = textures.get(nextWall.orientation === "vertical" ? "wall" : "wall_2")!;
            const tile_size = t.columns.length;
            const dist = nextWall.distance * tile_size * Math.cos(ray_diff_angle); // diff_angle to fix fish eye effect

            const lineHeight =
                nextWall.distance === Infinity
                    ? 0
                    : Math.floor((tile_size * this.size.y) / dist);
            const tile_y_step = 1 / tile_size;
            const tile_y_offset = 0;

            const base_y = Math.floor(this.size.y / 2 - lineHeight / 2); // centering the line

            // draw walls
            const colIndex = Math.floor(nextWall.wallCol * t.columns.length);
            const col = t.columns[colIndex] as Pixel[];
            let tile_y = tile_y_offset * tile_y_step;
            const line_ratio = Math.min(lineHeight, this.size.y) / this.size.y;
            for (
                let y = 0;
                y < tile_size && base_y + (y * lineHeight) / tile_size < this.size.y;
                y++
            ) {
                const p: Pixel = col[Math.floor(tile_y * tile_size)];
                const color_ratio = -255 * this.shadow_ratio * (1 - line_ratio);
                this.setColor(
                    (p.r + color_ratio) / 255,
                    (p.g + color_ratio) / 255,
                    (p.b + color_ratio) / 255
                );
                const y1 = base_y + (y * lineHeight) / tile_size;
                const dy = lineHeight / tile_size + 1;
                // for(let x = base_x; x < base_x + col_size; x++){
                // 	this.drawHorizontalLine(x, y1, y1+dy);
                // }
                this.drawRectangle(base_x, y1, col_size, dy);
                tile_y += tile_y_step;
            }

            //draw floor and ceiling
            let color = floor_texture.columns[0][0];
            let last_draw_y = base_y + lineHeight - 1;

            const raFix = Math.cos(ray_diff_angle);
            const coeff_x = Math.cos(ray_angle) / raFix;
            const coeff_y = Math.sin(ray_angle) / raFix;

            if(base_x % col_size_floors === 0)
                for (let y = last_draw_y; y <= this.size.y; y++) {
                    const dy = y / this.size.y - 0.5;
                    const floor_dist = 1 / (dy * 2);

                    let tx = player_pos.x + floor_dist * coeff_x;
                    let ty = player_pos.y + floor_dist * coeff_y;
                    tx = Math.floor(tx * floor_tile_size);
                    ty = Math.floor(ty * floor_tile_size);

                    const nColor = floor_texture.columns[tx & (floor_tile_size - 1)][ty & (floor_tile_size - 1)];
                    if (nColor !== color || y === this.size.y) {
                        this.setColor(color.r / 255, color.g / 255, color.b / 255);
                        color = nColor;
                        // for (let x = base_x; x < base_x + col_size; x++) {
                        // 	this.drawHorizontalLine(x, this.size.y - last_draw_y, this.size.y - y);
                        // 	this.drawHorizontalLine(x, last_draw_y, y);
                        // }
                        this.drawRectangle(base_x, last_draw_y, col_size_floors, y - last_draw_y);
                        this.drawRectangle(
                            base_x,
                            this.size.y - last_draw_y,
                            col_size_floors,
                            this.size.y - y - last_draw_y
                        );
                        last_draw_y = y;
                    }
                }
            prev_dist = dist;
        }
        this.finishDrawing();
    }

    /**
     * Calcule et affiche le nombre de FPS à l'écran
     * @param dt le dernier délai entre deux affichage
     */
    drawFps(dt: number) {
        tick_sum -= tick_list[tick_index];
        tick_sum += dt;
        tick_list[tick_index] = dt;
        tick_index = ++tick_index % SAMPLE_SIZE;

        const fps = SAMPLE_SIZE / tick_sum;
        this.context2D.clearRect(0, 0, this.size.x, this.size.y);
        this.context2D.fillText(fps.toFixed(2), this.size.x - 40, 15);
    }
}
