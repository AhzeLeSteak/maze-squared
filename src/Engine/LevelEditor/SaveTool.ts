import {AbstractTool} from "@/Engine/LevelEditor/AbstractTool";
import {Game} from "@/Engine/Game";

export class SaveTool extends AbstractTool {
  constructor() {
    super("save", "Save level locally", false);
  }

  on_select(game: Game) {
    localStorage.setItem("map", JSON.stringify(game.map));
  }

}
