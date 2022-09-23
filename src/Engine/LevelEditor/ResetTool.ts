import { AbstractTool } from "@/Engine/LevelEditor/AbstractTool";
import { Game } from "@/Engine/Game";

export class ResetTool extends AbstractTool {
  constructor() {
    super("reset", "Reset level", false);
  }

  on_select(game: Game) {
    game.map.load();
  }

}
