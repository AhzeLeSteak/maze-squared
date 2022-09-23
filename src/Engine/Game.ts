import { Player } from "@/Engine/Player";
import { GameMap } from "@/Engine/GameMap";
import { Controller } from "@/Engine/Controller";
import { Canvas } from "@/Rendering/Abstract/Canvas";
import { getAllTexture, textures } from "@/Engine/Texture/load_textures";

export class Game {
  public readonly player: Player;
  public readonly map: GameMap;
  private readonly controller: Controller;

  private interval: any;
  public readonly view_angle = 80;
  private last_tick = 0;

  constructor(public fps = 40) {
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

  loop(renderers: Canvas[]): void {
    this.interval = setTimeout(() => this.loop(renderers), 1000 / this.fps);

    const new_tick = new Date().getTime() / 1000;
    const delta = new_tick - this.last_tick;
    this.last_tick = new_tick;
    this.update(delta);
    this.render(delta, renderers);
  }

  stop(): void {
    clearTimeout(this.interval);
  }

  render(dt: number, renderers: Canvas[]): void {
    renderers.forEach((r) => r.drawContext(this, dt));
  }

  update(dt: number): void {
    this.controller.update(dt);
    this.player.update(this.map);
  }
}
