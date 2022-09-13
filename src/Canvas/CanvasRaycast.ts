import {Game} from '../Game';
import {degreToRadian} from '../utils';
import {textures} from '../Texture/load_textures';
import {Pixel} from '../Texture/Texture';
import {environment} from '../main/environments/environment';
import {CanvasWebGL} from "./Abstract/CanvalWebGL";


export class CanvasRaycast extends CanvasWebGL {

	private shadow_ratio = .2;

	constructor(height: number) {
		super({x: height * 16 / 9, y: height});
	}

	drawContext(game: Game): void {
		this.reset();
		if (!environment.draw3d) return;

		const floor_texture = textures.get('floor')!;

		const map = game.map;
		const player_pos = game.player.pos;
		const tile_size = 16;

		const col_size = 2;

		for(let base_x = 0; base_x < this.size.x; base_x += col_size){

			const ray_diff_angle = (base_x - this.size.x/2) * game.view_angle / this.size.x * degreToRadian;
			const ray_angle = game.player.angle + ray_diff_angle; // get the angle of the actual ray
			const nextWall = map.getNextPoint(player_pos, ray_angle); // calculate where the ray goes

			//const t = textures.get(nextWall.from === 'VERTICAL' ? 'bricks' : 'stone_bricks')!
			const t = textures.get('wall')!

			const dist = nextWall.distance * tile_size * Math.cos(ray_diff_angle); // diff_angle to fix fish eye effect



			const lineHeight = nextWall.distance === Infinity
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
			for (let y = 0; y < tile_size && base_y + y * lineHeight / tile_size < this.size.y; y++) {
				const p: Pixel = col[Math.floor(tile_y * tile_size)];
				const color_ratio = -255 * this.shadow_ratio * (1 - line_ratio);
				this.setColor((p.r + color_ratio)/255, (p.g + color_ratio)/255, (p.b + color_ratio)/255);
				//this.drawSquare(base_x, base_y + y * lineHeight / tile_size, this.lineWidth, lineHeight / tile_size + 1);
				const y1 = base_y + y * lineHeight / tile_size;
				const dy = lineHeight / tile_size + 1;
				for(let x = base_x; x < base_x + col_size; x++){
					this.drawHorizontalLine(x, y1, y1+dy);
				}
				tile_y += tile_y_step;
			}

			//draw floor
			let color = floor_texture.columns[0][0];
			let last_draw_y = base_y + lineHeight;

			const raFix = Math.cos(ray_diff_angle);

			for(let y = last_draw_y; y < this.size.y; y++){
				const dy = y/this.size.y - 0.5;
				const dx = 1/(dy*2);

				let tx = player_pos.x + dx * Math.cos(ray_angle)/raFix;
				let ty = player_pos.y + dx * Math.sin(ray_angle)/raFix;
				tx = Math.floor(tx*tile_size);
				ty = Math.floor(ty*tile_size);


				const nColor = floor_texture.columns[tx&15][ty&15];
				if(nColor !== color || y + 1 === this.size.y){
					this.setColor(color.r/255, color.g/255, color.b/255);
					color = nColor;
					for(let x = base_x; x < base_x + col_size; x++){
						this.drawHorizontalLine(x, this.size.y-last_draw_y, this.size.y-y);
						this.drawHorizontalLine(x, last_draw_y, y);
					}
					last_draw_y = y;
				}
			}
		}
		this.finishDrawing();
	}


}


/*
for(let floor of [true, false]){
				const limit = floor ? this.size.y - 1 : 0;
				const texture_name = floor ? 'wall_1' : 'wall_2';
				let color = textures.get(texture_name)!.columns[0][0];
				const dy = floor ? 1 : -1;
				let last_draw_y = Math.round((this.size.y + lineHeight * dy)/2);
				for(let y = last_draw_y; (floor && y < this.size.y) || (!floor && y >= 0); y+=dy){
					const dy = y - this.size.y/2;
					const raFix = Math.cos((game.player.angle - ray_angle) % two_pi);
					const tx = Math.round(player_pos.x*tile_size/2 + Math.cos(ray_angle) * 158 * tile_size/dy/raFix);
					const ty = Math.round(player_pos.y*tile_size/2 + Math.sin(ray_angle) * 158 * tile_size/dy/raFix);
					const nColor = textures.get(texture_name)!.columns[ty&(tile_size-1)][tx&(tile_size-1)];
					if(nColor !== color || y === limit){
						this.setColor(color.r/255, color.g/255, color.b/255);
						color = nColor;
						for(let x = base_x; x < base_x + this.colGroup; x++)
							this.drawHorizontalLine(x, last_draw_y, y);
						last_draw_y = y;
					}
				}
			}
 */
