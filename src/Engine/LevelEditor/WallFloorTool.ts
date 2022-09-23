import { AbstractTool } from "@/Engine/LevelEditor/AbstractTool";
import { Vector2 } from "@/Engine/Vector2";
import { Game } from "@/Engine/Game";
import { Tile } from "@/Engine/Tiles/Tile";

export class WallFloorTool extends AbstractTool {

  constructor() {
    super("wall_floor", "Put and remove walls");
  }

  left_click(game: Game, map_pos: Vector2, client_pos: Vector2): void {
    game.map.setTile(map_pos, new Tile(1));
  }

  right_click(game: Game, map_pos: Vector2, client_pos: Vector2): void {
    game.map.setTile(map_pos, new Tile(0));
  }

}
