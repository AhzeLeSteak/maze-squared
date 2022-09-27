import { AbstractTool } from "@/Engine/LevelEditor/AbstractTool";
import { Game } from "@/Engine/Game";
import { Vector2 } from "@/Engine/Geometry/Vector2";

export class StartingPosTool extends AbstractTool {

  constructor() {
    super("start", "Set player starting position");
  }

  left_click(game: Game, map_pos: Vector2, client_pos: Vector2): boolean | void {
    const tile = game.map.tile(map_pos.x, map_pos.y, false);
    if (tile.solid || tile.tile_type === "teleporter")
      return;
    game.map.starting_pos = { ...map_pos };
    return true;
  }
}
