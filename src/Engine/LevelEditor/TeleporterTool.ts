import { AbstractTool } from "@/Engine/LevelEditor/AbstractTool";
import { Game } from "@/Engine/Game";
import { Vector2 } from "@/Engine/Vector2";
import { Teleporter, TeleporterType } from "@/Engine/Tiles/Teleporter";

export class TeleporterTool extends AbstractTool {

  remaining_clicks = 2;

  constructor(private type: TeleporterType) {
    super(`tp_${type}`, "Put teleporting tile");
  }

  on_select(game: Game) {
    this.remaining_clicks = 2;
  }

  left_click(game: Game, map_pos: Vector2, client_pos: Vector2): boolean | void {
    game.map.setTile(map_pos, new Teleporter(this.type));
    return --this.remaining_clicks === 0;
  }


}
