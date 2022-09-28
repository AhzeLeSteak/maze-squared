import { Game } from "@/Engine/Game";
import { degreToRadian } from "@/Engine/Geometry/angles";
import { textures } from "@/Engine/Texture/load_textures";
import { Pixel } from "@/Engine/Texture/Texture";
import { CanvasWebGL } from "./Abstract/CanvalWebGL";
import { Orientation } from "@/Engine/GameMap";
import { distance_vectors, Lines, Vector2 } from "@/Engine/Geometry/Vector2";


const SAMPLE_SIZE = 10;
let tick_index = 0;
let tick_sum = 0;
const tick_list = new Array(SAMPLE_SIZE).fill(0);

export class CanvasRaycast extends CanvasWebGL {
    private shadow_ratio = 0.2;
    private context2D: CanvasRenderingContext2D;

    constructor(width: number, height: number, canvas: HTMLCanvasElement) {
        super({ x: width, y: height }, canvas);
        this.context2D = this.createCanvas().getContext("2d")!;
        this.resizeCanvasHtml(this.context2D.canvas, this.size);
        this.context2D.font = "16px Comic sans";
        this.context2D.fillStyle = "yellow";
    }

    drawContext(game: Game, dt: number): void {
        //if (!environment.draw3d) return;
        this.reset();

        this.drawFps(dt);

        const map = game.map;
        const player_pos = game.player.pos;

        const col_size = 16; //numbers of columns grouped for rendering
        const col_size_floors = 16;

        let prev_dist = 0;

        for (let base_x = 0; base_x < this.size.x; base_x += col_size) {
            const ray_diff_angle = (((base_x - this.size.x / 2) * game.view_angle) / this.size.x) * degreToRadian;
            const ray_angle = game.player.angle + ray_diff_angle; // get the angle of the actual ray
            const next_wall = map.get_next_wall(player_pos, ray_angle); // calculate where the ray goes

            const t = textures.get(next_wall.orientation === Orientation.VERTICAL ? "wall" : "wall_2")!;
            const tile_size = t.columns.length;
            const dist = next_wall.distance * tile_size * Math.cos(ray_diff_angle); // diff_angle to fix fish eye effect

            const lineHeight =
              next_wall.distance === Infinity
                ? 0
                : Math.floor((tile_size * this.size.y) / dist);
            const tile_y_step = 1 / tile_size;
            const tile_y_offset = 0;

            const base_y = Math.floor(this.size.y / 2 - lineHeight / 2); // centering the line

            // draw walls
            const colIndex = Math.floor(next_wall.wallCol * t.columns.length);
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
            let color: Pixel = { r: 0, g: 0, b: 0 };
            let last_draw_y = base_y + lineHeight - 1;

            const raFix = Math.cos(ray_diff_angle);

            if(base_x % col_size_floors === 0)
                for (let y = last_draw_y; y <= this.size.y; y++) {
                    const dy = y / this.size.y - 0.5;
                    const floor_dist = 1 / (dy * 2);

                    // let tx = player_pos.x + floor_dist * coeff_x;
                    //let ty = player_pos.y + floor_dist * coeff_y;
                    let { x: tx, y: ty } = this.get_coords_from_lines(floor_dist / raFix, next_wall.points);
                    const floor_text = textures.get(Math.floor(tx) % 2 === 0 ? "floor" : "floor_2")!;
                    const floor_tile_size = floor_text.columns[0].length;
                    tx = Math.floor(tx * floor_tile_size);
                    ty = Math.floor(ty * floor_tile_size);

                    const nColor = floor_text.columns[tx & (floor_tile_size - 1)][ty & (floor_tile_size - 1)];
                    if (nColor !== color || y === this.size.y) {
                        this.setColor(color.r / 255, color.g / 255, color.b / 255);
                        color = nColor;
                        this.drawRectangle(base_x, last_draw_y, col_size_floors, y - last_draw_y);
                        //this.drawRectangle(base_x, this.size.y - last_draw_y, col_size_floors, this.size.y - y - last_draw_y);
                        last_draw_y = y;
                    }
                }
            prev_dist = dist;
        }
        this.finishDrawing();
    }


    get_coords_from_lines(distance_to_reach: number, points: Lines): Vector2 {
        let distance_parcourue = 0;
        for (let i = 0; i < points.length - 1; i++) {
            const p1 = points[i];
            const p2 = points[i + 1];
            if (p2.new_line)
                continue;
            const line_length = distance_vectors(p1, p2);
            if (distance_parcourue + line_length >= distance_to_reach) {
                const longueur_restante = distance_to_reach - distance_parcourue;
                const ratio = longueur_restante / line_length;
                return {
                    x: p1.x + (p2.x - p1.x) * ratio,
                    y: p1.y + (p2.y - p1.y) * ratio
                };
            }
            distance_parcourue += line_length;
        }
        return points[points.length - 1];
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
