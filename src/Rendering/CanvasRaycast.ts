import { Game } from "@/Engine/Game";
import { degreToRadian } from "@/Engine/Geometry/angles";
import { textures } from "@/Engine/Texture/load_textures";
import { Color, distance, Texture } from "@/Engine/Texture/Texture";
import { Orientation, Wall } from "@/Engine/GameMap";
import { distance_vectors, Lines, Vector2 } from "@/Engine/Geometry/Vector2";
import { CanvasWebGLTest } from "@/Rendering/Abstract/CanvasWebGLTest";
import {Canvas2DTest} from "@/Rendering/Abstract/Canvas2DTest";

const SAMPLE_SIZE = 10;
let tick_index = 0;
let tick_sum = 0;
const tick_list = new Array(SAMPLE_SIZE).fill(0);

export class CanvasRaycast extends CanvasWebGLTest {
  private shadow_ratio = 0.2;
  private context2D: CanvasRenderingContext2D;

  constructor(width: number, height: number, canvas: HTMLCanvasElement) {
    super({ x: width, y: height }, canvas);
    this.context2D = this.createCanvas().getContext("2d")!;
    this.resizeCanvasHtml(this.context2D.canvas, { x: this.canvas.width * 3, y: this.canvas.height * 3 });
    this.context2D.font = "24px Comic sans";
    this.context2D.fillStyle = "red";
  }

    drawContext(game: Game, dt: number): void {
      //if (!environment.draw3d) return;
      this.reset();

      const map = game.map;
      const player_pos = game.player.pos;

      //const col_size = 2; //numbers of columns grouped for rendering
      //const col_size_floors = col_size;


      for (let base_x = 0; base_x < this.size.x; base_x += 1) {
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

        const base_y = Math.floor(this.size.y / 2 - lineHeight / 2); // centering the line

        this.drawCeiling(base_y, lineHeight, ray_diff_angle, base_x, next_wall);
        this.drawWalls(lineHeight, next_wall, t);
        this.drawFloor(base_y, lineHeight, ray_diff_angle, base_x, next_wall);

        this.newColumn();
      }

      this.drawFps(dt);
      this.finishDrawing();
    }

  drawWalls(lineHeight: number, next_wall: Wall, t: Texture) {


    const colIndex = Math.floor(next_wall.wallCol * t.columns.length);
    const col = t.columns[colIndex];
    let tile_y = 0;
    const line_ratio = Math.min(lineHeight, this.size.y) / this.size.y;

    const line_start = Math.floor((this.size.y - lineHeight) / 2);
    let last_draw_y = line_start;
    let color = col[0];

    for (let dy = 0; dy <= lineHeight; dy++) {
      const y = line_start + dy;
      const color_index = Math.min(col.length - 1, Math.floor(col.length * dy / lineHeight));
      const new_color = col[color_index];

      if (distance(new_color, color) > 5 || dy === lineHeight) {
        this.setColor(color.r / 255, color.g / 255, color.b / 255);
        color = new_color;

        //this.drawRectangle(base_x, last_draw_y, col_size_floors, y - last_draw_y);
        this.drawHorizontalLine(y - last_draw_y);

        last_draw_y = y;
      }
    }
  }

  drawCeiling(base_y: number, lineHeight: number, ray_diff_angle: number, base_x: number, next_wall: Wall) {
    if (lineHeight === this.size.y) return;
    if(false){
        this.setColor(0, 0, 0);
        this.drawHorizontalLine(base_y);
        return;
    }
    //draw floor and ceiling
    let color: Color = { r: 0, g: 0, b: 0 };
    let last_draw_y = 0;

    const raFix = Math.cos(ray_diff_angle);

    for (let y = 0; y <= base_y; y++) {
      const dy = (this.size.y - y) / this.size.y - 0.5;
      const floor_dist = 1 / (dy * 2);

      // let tx = player_pos.x + floor_dist * coeff_x;
      //let ty = player_pos.y + floor_dist * coeff_y;
      let { x: tx, y: ty } = this.get_coords_from_lines(floor_dist / raFix, next_wall.points);
      const floor_text = textures.get(Math.floor(tx) % 2 === 0 ? "floor" : "floor_2")!;
      const floor_tile_size = floor_text.columns[0].length;
      tx = Math.floor(tx * floor_tile_size);
      ty = Math.floor(ty * floor_tile_size);

      const nColor = floor_text.columns[tx & (floor_tile_size - 1)][ty & (floor_tile_size - 1)];
      if (distance(nColor, color) > 20 || y === base_y) {
        this.setColor(color.r / 255, color.g / 255, color.b / 255);
        color = nColor;
        //this.drawRectangle(base_x, this.size.y - last_draw_y, col_size_floors, this.size.y - y - last_draw_y);
        this.drawHorizontalLine(y - last_draw_y);

        last_draw_y = y;
      }
    }
  }

  drawFloor(base_y: number, lineHeight: number, ray_diff_angle: number, base_x: number, next_wall: Wall) {
      if (lineHeight === this.size.y) return;
      if(false){
          this.setColor(0, 0, 0);
          this.drawHorizontalLine(base_y);
          return;
      }
      //draw floor and ceiling
      let color: Color = { r: 0, g: 0, b: 0 };
      let last_draw_y = base_y + lineHeight;

      const raFix = Math.cos(ray_diff_angle);

      for (let y = base_y + lineHeight; y <= this.size.y; y++) {
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
          if (distance(nColor, color) > 20 || y === this.size.y) {
              this.setColor(color.r / 255, color.g / 255, color.b / 255);
              color = nColor;
              //this.drawRectangle(base_x, this.size.y - last_draw_y, col_size_floors, this.size.y - y - last_draw_y);
              this.drawHorizontalLine(y - last_draw_y);

              last_draw_y = y;
          }
      }
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
      this.context2D.fillText(fps.toFixed(2), 10, 20);
    }
}
