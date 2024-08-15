import { AbstractTool } from "@/Engine/LevelEditor/AbstractTool";
import { Game } from "@/Engine/Game";
import { Vector2 } from "@/Engine/Geometry/Vector2";
import { Teleporter } from "@/Engine/Tiles/Teleporter";

export class RotateTool extends AbstractTool {

    constructor() {
        super("rotate", "Rotate a teleporter");
    }

    left_click(game: Game, map_pos: Vector2, client_pos: Vector2): boolean | void {
        const tile = game.map.tile(map_pos.x, map_pos.y, false);
        if (tile.tile_type !== "teleporter")
            return;
        const tp = tile as Teleporter;
        tp.rotate();
    }
}
