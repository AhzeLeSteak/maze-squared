import {Vector2} from '../Vector2';
import {Game} from '../Game';

export class LevelEditor {

	private box_type = 1;

	constructor(canvas: HTMLCanvasElement, private readonly tile_size: number, private readonly game: Game) {
		this.tile_size = tile_size;

		const set_box = (ev: MouseEvent) => {
			const v = this.getPos(ev);
			ev.preventDefault();

			if (v.y >= game.map.size.y) {
				switch (v.x) {
					case 0:
						// save
						localStorage.setItem('map_info', JSON.stringify(game.map.map_info));
						break;
					case 1:
						// load
						game.map.load();
						break;
					default:
						this.box_type = v.x - 2;
				}
			} else if (v.x > 0 && v.x < game.map.size.x - 1 && v.y > 0 && v.y < game.map.size.y - 1) {
				this.game.map.setBox(v, ev.button === 0 ? this.box_type : 0);
			}
		};

		const change_box_type = (ev: KeyboardEvent) => {
			const value = ev.key.charCodeAt(0) - '0'.charCodeAt(0);
			if (value >= 0 && value < 5) {
				this.box_type = value;
			}
		};

		const set_player_pos = (ev: MouseEvent) => {
			const v = this.getPos(ev);
			if (game.map.box(v.x, v.y) === 0) {
				game.player.pos = {...v};
				game.player.pos.x += 0.5;
				game.player.pos.y += 0.5;
				game.map.map_info.playerPos = v;
			}
		};

		canvas.addEventListener('click', set_box);
		canvas.addEventListener('dblclick', set_player_pos);
		document.addEventListener('keypress', change_box_type);
		document.oncontextmenu = (ev => {
			ev.preventDefault();
			set_box(ev);
		});
	}

	private getPos(ev: MouseEvent): Vector2 {
		return {
			x: Math.floor(ev.offsetX / this.tile_size),
			y: Math.floor(ev.offsetY / this.tile_size)
		};
	}

	get type(): number {
		return this.box_type;
	}

}
