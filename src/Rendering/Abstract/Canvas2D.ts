import { Canvas } from "@/Rendering/Abstract/Canvas";
import { Vector2 } from "@/Engine/Geometry/Vector2";

export abstract class Canvas2D extends Canvas {
  protected contextd2D: CanvasRenderingContext2D;

  protected constructor(size: Vector2, canvas ?: HTMLCanvasElement) {
    super(size, canvas);
    const context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = "black";
    context.lineWidth = 1;

    this.contextd2D = context;
  }

  protected drawLine(x1: number, y1: number, x2: number, y2: number): void {
    this.contextd2D.beginPath();
    this.contextd2D.moveTo(x1, y1);
    this.contextd2D.lineTo(x2, y2);
    this.contextd2D.stroke();
  }

  public drawSquare(x: number, y: number, width: number, height: number): void {
    this.contextd2D.fillRect(x, y, width, height);
  }

  protected reset(): void {
    this.contextd2D.clearRect(0, 0, this.size.x, this.size.y);
  }

  protected setColor(red: number, green: number, blue: number): void {
    this.contextd2D.strokeStyle = `rgb(${red}, ${green}, ${blue})`;
  }
}
