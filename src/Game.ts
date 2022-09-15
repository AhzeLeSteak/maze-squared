import {Player} from './Player';
import {GameMap} from './GameMap';
import {Canvas} from './Canvas/Abstract/Canvas';
import {CanvasRaycast} from './Canvas/CanvasRaycast';
import {Controller} from './Controller';
import {CanvasTopView} from "./Canvas/CanvasTopView";
import {getAllTexture, textures} from "./Texture/load_textures";
import {environment} from "./main/environments/environment";

export class Game {

	public readonly player: Player;
	public readonly map: GameMap;
	private readonly controller: Controller;

	public edit_mode = false;
	private renderers: Array<Canvas> = [];

	private interval: any;
	public readonly view_angle = 80;
	private last_tick = 0;

	constructor() {
		console.log('Instanciating Game class');
		this.controller = new Controller(this);
		this.map = new GameMap();
		this.player = new Player(this.map.map_info.playerPos);
		this.toggle();
	}


	init() {
		console.log('Waiting for textures to load');
		return getAllTexture().then(() => {
			console.log('Textures loaded', textures);
		});
	}


	loop(): void {
		this.interval = setTimeout(() => this.loop(), 1000 / environment.fps)

		const new_tick = new Date().getTime() / 1000;
		const delta = new_tick - this.last_tick;
		this.last_tick = new_tick;
		this.update(delta);
		this.render(delta);
	}

	stop(): void {
		clearTimeout(this.interval);
	}

	toggle() {
		document.querySelectorAll('#canvas-container canvas').forEach(e => e.remove())
		this.edit_mode = !this.edit_mode;
		this.renderers = this.edit_mode
			? [new CanvasTopView(this.map.size, this, 64)]
			: [new CanvasRaycast(window.innerWidth * .8, window.innerHeight * .8)];
	}

	render(dt: number): void {
		this.renderers.forEach(r => r.drawContext(this, dt));
	}

	update(dt: number): void {
		this.controller.update(dt);
		this.player.update(this.map);
	}

}
