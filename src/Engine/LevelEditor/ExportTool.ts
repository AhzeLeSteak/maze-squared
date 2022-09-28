import { AbstractTool } from "@/Engine/LevelEditor/AbstractTool";
import { Game } from "@/Engine/Game";
import { cipher } from "@/cypher";

export class ExportTool extends AbstractTool {
  constructor() {
    super("export", "Export level", false);
  }

  on_select(game: Game) {
    const map_json = JSON.stringify(game.map);

    console.log(cipher(map_json));

    alert("Link copied");
  }

}
