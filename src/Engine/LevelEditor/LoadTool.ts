import {AbstractTool} from "@/Engine/LevelEditor/AbstractTool";
import {Game} from "@/Engine/Game";

export class LoadTool extends AbstractTool {

  constructor() {
    super("load", "Load level locally", false);
  }

  on_select(game: Game) {
    const map_info = localStorage.getItem("map");
    if (!map_info)
      return;

    game.map.load_from_serialized(JSON.parse(map_info));
    game.player.pos = { ...game.map.starting_pos };
  }

}
