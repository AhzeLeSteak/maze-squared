import { AbstractTool } from "@/Engine/LevelEditor/AbstractTool";
import { Game } from "@/Engine/Game";
import { Vector2 } from "@/Engine/Geometry/Vector2";
import { Teleporter } from "@/Engine/Tiles/Teleporter";
import { Tile } from "@/Engine/Tiles/Tile";
import { CanvasTopView } from "@/Rendering/CanvasTopView";

export class TeleporterTool extends AbstractTool {

    remaining_clicks = 2;
    first_tp_tile ?: Teleporter;

    constructor(private canvas: CanvasTopView) {
        super(`tp`, "Put teleporting tile");
    }

    on_select(game: Game) {
        this.remaining_clicks = 2;
        this.canvas.draw_player = false;
        this.first_tp_tile = undefined;
    }

    on_unselect(game: Game) {
        this.canvas.draw_player = true;
        if (this.remaining_clicks === 0)
            return;
        for(let y = 0; y < game.map.size.y; y++){
            for(let x = 0; x < game.map.size.x; x++) {
                const tile = game.map.tile(x, y);
                if (tile.tile_type === "teleporter")
                    game.map.set_tile({ x, y }, new Tile(0));
            }
        }
    }


    left_click(game: Game, map_pos: Vector2, client_pos: Vector2): boolean | void {
        const new_tp_tile = new Teleporter();
        if(this.first_tp_tile) {
            this.first_tp_tile.twin_index = game.map.vector_to_map_index(map_pos);
            new_tp_tile.twin_index = game.map.vector_to_map_index(game.map.get_coords_of_tile(this.first_tp_tile));
        }
        else
            this.first_tp_tile = new_tp_tile;
        game.map.set_tile(map_pos, new_tp_tile);
        return --this.remaining_clicks === 0;
    }


}
