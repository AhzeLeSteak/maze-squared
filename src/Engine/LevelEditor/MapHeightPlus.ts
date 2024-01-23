import {AbstractTool} from "@/Engine/LevelEditor/AbstractTool";
import {Game} from "@/Engine/Game";
import '../../utils/array.extension';
import {Tile} from "@/Engine/Tiles/Tile";

export class MapHeightPlus extends AbstractTool {

    constructor() {
        super("h+", "Increase map height", false);
    }

    on_select(game: Game) {
        const {map} = game;
        if(map.size.y === 15)
            return;
        for(let i = 0; i < map.size.x; i++){
            map.tiles.push(new Tile(1));
        }
        map.size.y++
    }

}
