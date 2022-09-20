import {Vector2} from "@/Engine/Vector2";
import {Game} from "@/Engine/Game";

export abstract class Canvas {
    private static id = 0;
    protected canvas: HTMLCanvasElement;

    protected constructor(public size: Vector2, canvas ?: HTMLCanvasElement) {
        this.canvas = canvas || this.createCanvas();
        this.size.x = Math.floor(this.size.x);
        this.size.y = Math.floor(this.size.y);
        this.resizeCanvasHtml(this.canvas, this.size);
    }

    public abstract drawContext(context: Game, dt: number): void;

    protected abstract reset(): void;

    protected resizeCanvasHtml(canvas: HTMLCanvasElement, size: Vector2){
        canvas.setAttribute("width", size.x + "");
        canvas.setAttribute("height", size.y + "");
    }

    protected createCanvas(centered = true): HTMLCanvasElement {
        const id = "canvas_" + Canvas.id++;
        const canvasElement = document.createElement("canvas");
        canvasElement.setAttribute("id", id);
        canvasElement.setAttribute("style", "border: 3px solid black");
        if(centered)
            canvasElement.classList.add('centered');
        document.getElementById("canvas-container")?.appendChild(canvasElement);
        return canvasElement;
    }


}
