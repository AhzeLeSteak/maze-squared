import { AbstractTool } from "@/Engine/LevelEditor/AbstractTool";
import { Vector2 } from "@/Engine/Geometry/Vector2";
import { Game } from "@/Engine/Game";
import { Tile } from "@/Engine/Tiles/Tile";
import { Teleporter } from "@/Engine/Tiles/Teleporter";

export class WallFloorTool extends AbstractTool {

  constructor() {
    super("wall_floor", "Put and remove walls");
  }

  left_click(game: Game, map_pos: Vector2, client_pos: Vector2): void {
    this.set(game, map_pos, () => new Tile(1));
  }

  right_click(game: Game, map_pos: Vector2, client_pos: Vector2): void {
    this.set(game, map_pos, () => new Tile(0));
  }

  set(game: Game, map_pos: Vector2, tile_generator: () => Tile) {
    const tile = game.map.tile(map_pos.x, map_pos.y);
    if (tile.tile_type === "teleporter")
      game.map.replace_tile((tile as Teleporter).twin(game.map), tile_generator());
    game.map.set_tile(map_pos, tile_generator());
  }

}
