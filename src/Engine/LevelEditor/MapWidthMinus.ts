import {AbstractTool} from "@/Engine/LevelEditor/AbstractTool";
import {Game} from "@/Engine/Game";
import '../../utils/array.extension';

export class MapWidthMinus extends AbstractTool {

    constructor() {
        super("w-", "Decrease map width", false);
    }

    on_select(game: Game) {
        const {map} = game;
        if(map.size.x === 1)
            return;
        const rows = map.tiles.chunk(map.size.x);
        map.size.x--;
        map.tiles = rows.map(row => row.slice(0, row.length-1)).flat()
    }

}
