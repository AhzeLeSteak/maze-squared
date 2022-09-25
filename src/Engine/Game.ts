import {Player} from "@/Engine/Player";
import {GameMap} from "@/Engine/GameMap";
import {Controller} from "@/Engine/Controller";
import {Canvas} from "@/Rendering/Abstract/Canvas";
import {getAllTexture, textures} from "@/Engine/Texture/load_textures";

export class Game {
    public readonly player: Player;
    public readonly map: GameMap;
    private readonly controller: Controller;

    public readonly view_angle = 70;

    private requestAnimationFrameId = 0;

    constructor(public fps = 60) {
        console.log("Instanciating Game class");
        this.controller = new Controller(this);
        this.map = new GameMap();
        this.player = new Player(this.map.map_info.player_pos);
    }

    init() {
        console.log("Waiting for textures to load");
        return getAllTexture().then(() => {
            console.log("Textures loaded", textures);
        });
    }

    start_loop(renderer: Canvas): void {
        let last = 0;
        const loop = (c: DOMHighResTimeStamp) => {
            const delta = (c - last)/1000;
            this.update(delta);
            renderer.drawContext(this, delta);
            last = c;
            this.requestAnimationFrameId = requestAnimationFrame(loop);
        }

        this.requestAnimationFrameId = requestAnimationFrame(loop);
    }

    stop(): void {
        cancelAnimationFrame(this.requestAnimationFrameId);
    }


    update(dt: number): void {
        this.controller.update(dt);
        this.player.update(this.map);
    }
}
