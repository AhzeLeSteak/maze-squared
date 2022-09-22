import { Game } from "@/Engine/Game";
import { Vector2 } from "@/Engine/Vector2";
import { Tile } from "@/Engine/Tiles/Tile";

export class LevelEditor {

  constructor(
    canvas: HTMLCanvasElement,
    private readonly tile_size: number,
    private readonly game: Game
  ) {
    this.tile_size = tile_size;

    const set_box = (ev: MouseEvent) => {
      const v = this.getPos(ev);
      ev.preventDefault();
      this.game.map.setTile(v, ev.button === 0 ? new Tile(1) : new Tile(0));
    };

    const set_player_pos = (ev: MouseEvent) => {
      const v = this.getPos(ev);
      if (!game.map.tile(v.x, v.y).solid) {
        game.player.pos = { ...v };
        //game.player.pos.x += 0.5;
        //game.player.pos.y += 0.5;
        game.map.map_info.playerPos = v;
      }
    };

    canvas.addEventListener("click", set_box);
    canvas.addEventListener("dblclick", set_player_pos);
    document.oncontextmenu = (ev) => {
      ev.preventDefault();
      set_box(ev);
    };
  }

  private getPos(ev: MouseEvent): Vector2 {
    return {
      x: Math.floor(ev.offsetX / this.tile_size),
      y: Math.floor(ev.offsetY / this.tile_size)
    };
  }

  reset_map() {
    this.game.map.load();
  }
}