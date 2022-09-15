import { Player } from "@/Engine/Player";
import { GameMap } from "@/Engine/GameMap";
import { Controller } from "@/Engine/Controller";
import { Canvas } from "@/Rendering/Abstract/Canvas";
import { getAllTexture, textures } from "@/Engine/Texture/load_textures";
import { CanvasTopView } from "@/Rendering/CanvasTopView";
import { CanvasRaycast } from "@/Rendering/CanvasRaycast";

export class Game {
  public readonly player: Player;
  public readonly map: GameMap;
  private readonly controller: Controller;

  public edit_mode = true;
  private renderers: Array<Canvas> = [];

  private interval: any;
  public readonly view_angle = 80;
  private last_tick = 0;

  constructor() {
    console.log("Instanciating Game class");
    this.controller = new Controller(this);
    this.map = new GameMap();
    this.player = new Player(this.map.map_info.playerPos);
    this.toggle();
  }

  init() {
    console.log("Waiting for textures to load");
    return getAllTexture().then(() => {
      console.log("Textures loaded", textures);
    });
  }

  loop(): void {
    this.interval = setTimeout(() => this.loop(), 1000 / 40);

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
    document
      .querySelectorAll("#canvas-container canvas")
      .forEach((e) => e.remove());
    this.edit_mode = !this.edit_mode;
    this.renderers = this.edit_mode
      ? [new CanvasTopView(this.map.size, this, 64)]
      : [new CanvasRaycast(window.innerWidth * 0.8, window.innerHeight * 0.8)];
  }

  render(dt: number): void {
    this.renderers.forEach((r) => r.drawContext(this, dt));
  }

  update(dt: number): void {
    this.controller.update(dt);
    this.player.update(this.map);
  }
}
