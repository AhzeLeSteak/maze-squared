import {AbstractTool} from "@/Engine/LevelEditor/AbstractTool";
import {Game} from "@/Engine/Game";
import '../../utils/array.extension';
import {Tile} from "@/Engine/Tiles/Tile";

export class MapWidthPlus extends AbstractTool {

    constructor() {
        super("w+", "Increase map height", false);
    }

    on_select(game: Game) {
        const {map} = game;
        if(map.size.x === 15)
            return;
        const rows = map.tiles.chunk(map.size.x);
        map.size.x++;
        map.tiles = rows.map(row => [...row, new Tile(1)]).flat()
    }

}
