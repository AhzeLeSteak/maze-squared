import { AbstractTool } from "@/Engine/LevelEditor/AbstractTool";
import { Game } from "@/Engine/Game";
import { Vector2 } from "@/Engine/Vector2";

export class PlayerPosTool extends AbstractTool {

  constructor() {
    super("player_pos", "Set player starting position");
  }

  left_click(game: Game, map_pos: Vector2, client_pos: Vector2): boolean | void {
    if (game.map.tile(map_pos.x, map_pos.y).solid)
      return;
    game.map.map_info.player_pos = {
      x: map_pos.x + .5,
      y: map_pos.y + .5
    };
    game.player.pos = { ...game.map.map_info.player_pos };
    return true;
  }
}
