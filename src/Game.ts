import {Player} from './Player';
import {GameMap} from './GameMap';
import {Canvas} from './Canvas/Abstract/Canvas';
import {CanvasRaycast} from './Canvas/CanvasRaycast';
import {Controller} from './Controller';
import {CanvasTopView} from "./Canvas/CanvasTopView";
import {getAllTexture, textures} from "./Texture/load_textures";
import {environment} from "./main/environments/environment";

export class Game {

	static singleton = false;
	public readonly player: Player;
	public readonly map: GameMap;
	private readonly controller: Controller;

	private interval: any;


	public readonly view_angle = 90;
	private renderers: Array<Canvas>;

	constructor() {
		console.log('Instanciating Game class');
		if (Game.singleton) {
			throw new Error('Game class can\'t be instanciated several times');
		} else {
			Game.singleton = true;
		}
		this.controller = new Controller(this);
		this.map = new GameMap();
		this.player = new Player(this.map.map_info.playerPos);
		this.renderers = [
			new CanvasRaycast(500),
			new CanvasTopView(this.map.size, this, 64)
		];

	}


	init() {
		console.log('Waiting for textures to load');
		return getAllTexture().then(() => {
			console.log('Textures loaded', textures);
		});
	}


	loop(): void {
		this.interval = setTimeout(() => this.loop(), 1000 / environment.fps)
		this.update();
		this.render();
	}

	stop(): void {
		clearTimeout(this.interval);
	}


	render(): void {
		this.renderers.forEach(r => r.drawContext(this));
	}

	update(): void {
		this.controller.update();
		this.player.update(this.map);
	}

}
