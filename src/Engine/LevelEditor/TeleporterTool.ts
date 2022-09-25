import {AbstractTool} from "@/Engine/LevelEditor/AbstractTool";
import {Game} from "@/Engine/Game";
import {Vector2} from "@/Engine/Vector2";
import {Teleporter, TeleporterType, TP_TYPE_NAMES} from "@/Engine/Tiles/Teleporter";
import {Tile} from "@/Engine/Tiles/Tile";
import {CanvasTopView} from "@/Rendering/CanvasTopView";

export class TeleporterTool extends AbstractTool {

    remaining_clicks = 2;
    first_tp_tile ?: Teleporter;

    constructor(private type: TeleporterType, private canvas: CanvasTopView) {
        super(`tp_${TP_TYPE_NAMES[type]}`, "Put teleporting tile");
    }

    on_select(game: Game) {
        this.remaining_clicks = 2;
        this.canvas.draw_player = false;
    }

    on_unselect(game: Game) {
        this.canvas.draw_player = true;
        if (this.remaining_clicks === 0)
            return;
        for(let y = 0; y < game.map.size.y; y++){
            for(let x = 0; x < game.map.size.x; x++) {
                const tile = game.map.tile(x, y)
                if(tile.tile_type === 'teleporter' && (tile as Teleporter).teleporter_type === this.type)
                    game.map.setTile({x, y}, new Tile(0));
            }
        }
    }


    left_click(game: Game, map_pos: Vector2, client_pos: Vector2): boolean | void {
        const new_tp_tile = new Teleporter(this.type);
        if(this.first_tp_tile){
            this.first_tp_tile.twin = new_tp_tile;
            new_tp_tile.twin = this.first_tp_tile;
        }
        else
            this.first_tp_tile = new_tp_tile;
        game.map.setTile(map_pos, new_tp_tile);
        return --this.remaining_clicks === 0;
    }


}
