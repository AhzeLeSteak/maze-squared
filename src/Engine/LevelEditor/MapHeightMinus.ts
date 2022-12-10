import {AbstractTool} from "@/Engine/LevelEditor/AbstractTool";
import {Game} from "@/Engine/Game";
import '../../utils/array.extension';

export class MapHeightMinus extends AbstractTool {

    constructor() {
        super("h-", "Reduce map height", false);
    }

    on_select(game: Game) {
        const {map} = game;
        if(map.size.y === 1)
            return;
        for(let i = 0; i < map.size.x; i++){
            map.tiles.pop();
        }
        map.size.y--;
    }

}
