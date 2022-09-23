import { Game } from "@/Engine/Game";
import { Vector2 } from "@/Engine/Vector2";
import { AbstractTool } from "@/Engine/LevelEditor/AbstractTool";
import { WallFloorTool } from "@/Engine/LevelEditor/WallFloorTool";
import { ResetTool } from "@/Engine/LevelEditor/ResetTool";
import { PlayerPosTool } from "@/Engine/LevelEditor/PlayerPosTool";
import { TeleporterTool } from "@/Engine/LevelEditor/TeleporterTool";

export class LevelEditor {

  public tool_index = 0;
  public readonly AVAILABLE_TOOLS: AbstractTool[] = [
    new WallFloorTool(),
    new TeleporterTool("heart"),
    new TeleporterTool("diamonds"),
    new TeleporterTool("clubs"),
    new TeleporterTool("spades"),
    new PlayerPosTool(),
    new ResetTool()
  ];

  constructor(
    canvas: HTMLCanvasElement,
    private readonly tile_size: number,
    private readonly game: Game
  ) {

  }

  click(ev: MouseEvent) {
    const change_tool = this.AVAILABLE_TOOLS[this.tool_index].left_click(this.game, this.getPos(ev), {
      x: ev.offsetX,
      y: ev.offsetY
    });
    if (change_tool)
      this.tool_index = 0;
  }

  context_menu(ev: MouseEvent) {
    ev.preventDefault();
    this.AVAILABLE_TOOLS[this.tool_index].right_click(this.game, this.getPos(ev), { x: ev.offsetX, y: ev.offsetY });
  }

  select(tool_index: number) {
    const new_tools = this.AVAILABLE_TOOLS[tool_index];
    new_tools.on_select(this.game);
    if (new_tools.selectable)
      this.tool_index = tool_index;
  }

  private getPos(ev: MouseEvent): Vector2 {
    return {
      x: Math.floor(ev.offsetX / this.tile_size),
      y: Math.floor(ev.offsetY / this.tile_size)
    };
  }

}
