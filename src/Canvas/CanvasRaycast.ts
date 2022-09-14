import {Game} from '../Game';
import {degreToRadian} from '../utils';
import {textures} from '../Texture/load_textures';
import {Pixel} from '../Texture/Texture';
import {environment} from '../main/environments/environment';
import {CanvasWebGL} from "./Abstract/CanvalWebGL";

declare let webglUtils: any;

let tick_index = 0;
let tick_sum = 0;
let tick_list = new Array(100).fill(0);
let last_tick = 0;

export class CanvasRaycast extends CanvasWebGL {

	private shadow_ratio = .2;
	private context2D: CanvasRenderingContext2D;

	constructor(height: number) {
		super({x: height * 16 / 9, y: height});
		this.context2D = this.createCanvas('abs').getContext('2d')!;
		this.context2D.font = '16px Comic sans';
		this.context2D.fillStyle = 'yellow';
		this.canvas.classList.add('abs')

		webglUtils.resizeCanvasToDisplaySize(this.gl.canvas);
		webglUtils.resizeCanvasToDisplaySize(this.context2D.canvas);
	}

	drawContext(game: Game): void {
		if (!environment.draw3d) return;
		this.reset();

		this.drawFps();


		const floor_texture = textures.get('floor')!;

		const map = game.map;
		const player_pos = game.player.pos;
		const tile_size = 16; // size of sprites

		const col_size = 2; //numbers of columns grouped for rendering

		for (let base_x = 0; base_x < this.size.x; base_x += col_size) {

			const ray_diff_angle = (base_x - this.size.x / 2) * game.view_angle / this.size.x * degreToRadian;
			const ray_angle = game.player.angle + ray_diff_angle; // get the angle of the actual ray
			const nextWall = map.getNextPoint(player_pos, ray_angle); // calculate where the ray goes

			const t = textures.get(nextWall.from === 'VERTICAL' ? 'wall' : 'wall_2')!

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

			//draw floor and ceiling
			let color = floor_texture.columns[0][0];
			let last_draw_y = base_y + lineHeight;

			const raFix = Math.cos(ray_diff_angle);

			for(let y = last_draw_y; y < this.size.y; y++) {
				const dy = y / this.size.y - 0.5;
				const floor_dist = 1 / (dy * 2);

				let tx = player_pos.x + floor_dist * Math.cos(ray_angle) / raFix;
				let ty = player_pos.y + floor_dist * Math.sin(ray_angle) / raFix;
				tx = Math.floor(tx * tile_size);
				ty = Math.floor(ty * tile_size);


				const nColor = floor_texture.columns[tx & (tile_size - 1)][ty & (tile_size - 1)];
				if (nColor !== color || y + 1 === this.size.y) {
					this.setColor(color.r / 255, color.g / 255, color.b / 255);
					color = nColor;
					for (let x = base_x; x < base_x + col_size; x++) {
						this.drawHorizontalLine(x, this.size.y - last_draw_y, this.size.y - y);
						this.drawHorizontalLine(x, last_draw_y, y);
					}
					last_draw_y = y;
				}
			}
		}
		this.finishDrawing();
	}

	drawFps() {
		const new_tick = new Date().getTime() / 1000;
		const delta = new_tick - last_tick;
		last_tick = new_tick;
		tick_sum -= tick_list[tick_index];
		tick_sum += delta;
		tick_list[tick_index] = delta;
		tick_index = (++tick_index) % 100;

		const fps = 100 / tick_sum
		this.context2D.clearRect(0, 0, this.size.x, this.size.y);
		this.context2D.fillText(fps.toFixed(2), this.size.x - 40, 15);
	}

}
