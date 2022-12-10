import {Game} from "@/Engine/Game";
import {Vector2} from "@/Engine/Geometry/Vector2";
import {AbstractTool} from "@/Engine/LevelEditor/AbstractTool";
import {WallFloorTool} from "@/Engine/LevelEditor/WallFloorTool";
import {ResetTool} from "@/Engine/LevelEditor/ResetTool";
import {StartingPosTool} from "@/Engine/LevelEditor/StartingPosTool";
import {TeleporterTool} from "@/Engine/LevelEditor/TeleporterTool";
import {CanvasTopView} from "@/Rendering/CanvasTopView";
import {RotateTool} from "@/Engine/LevelEditor/RotateTool";
import {EndingPosTool} from "@/Engine/LevelEditor/EndingPosTool";
import {SaveTool} from "@/Engine/LevelEditor/SaveTool";
import {LoadTool} from "@/Engine/LevelEditor/LoadTool";
import {ExportTool} from "@/Engine/LevelEditor/ExportTool";
import {MapWidthPlus} from "@/Engine/LevelEditor/MapWidthPlus";
import {MapWidthMinus} from "@/Engine/LevelEditor/MapWidthMinus";
import {MapHeightMinus} from "@/Engine/LevelEditor/MapHeightMinus";
import {MapHeightPlus} from "@/Engine/LevelEditor/MapHeightPlus";

export class LevelEditor {

    public tool_index = 0;
    public readonly AVAILABLE_TOOLS: AbstractTool[];
    public dragging = -1;

    constructor(
      private readonly game: Game,
      private readonly canvas: CanvasTopView
    ) {
        this.AVAILABLE_TOOLS = [
            new WallFloorTool(),
            new ResetTool(),
            new TeleporterTool(canvas),
            new RotateTool(),
            new StartingPosTool(),
            new EndingPosTool(),
            new SaveTool(),
            new LoadTool(),
            new MapWidthPlus(),
            new MapWidthMinus(),
            new MapHeightPlus(),
            new MapHeightMinus(),
            new ExportTool()
        ];
    }

    click(ev: MouseEvent) {
        const change_tool = this.AVAILABLE_TOOLS[this.tool_index].left_click(this.game, this.getPos(ev), {
            x: ev.offsetX,
            y: ev.offsetY
        });
        if (change_tool) {
            this.AVAILABLE_TOOLS[this.tool_index].on_unselect(this.game);
            this.tool_index = 0;
        }
    }

    context_menu(ev: MouseEvent) {
        ev.preventDefault();
        this.AVAILABLE_TOOLS[this.tool_index].right_click(this.game, this.getPos(ev), { x: ev.offsetX, y: ev.offsetY });
    }

    mouse_move(ev: MouseEvent) {
        this.canvas.tile_pos_hovered = this.getPos(ev);
        if (this.dragging >= 0 && this.tool_index === 0) {
            this.dragging === 0 ? this.click(ev) : this.context_menu(ev);
        }
    }

    mouse_leave(ev: MouseEvent) {
        this.canvas.tile_pos_hovered = undefined;
    }

    select(tool_index: number) {
        const new_tools = this.AVAILABLE_TOOLS[tool_index];
        new_tools.on_select(this.game);
        if (new_tools.selectable) {
            this.AVAILABLE_TOOLS[this.tool_index].on_unselect(this.game);
            this.tool_index = tool_index;
        }
    }

    private getPos(ev: MouseEvent): Vector2 {
        return {
            x: Math.floor(ev.offsetX / this.canvas.tile_size),
            y: Math.floor(ev.offsetY / this.canvas.tile_size)
        };
    }

}
