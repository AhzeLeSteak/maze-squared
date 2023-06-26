import { Canvas } from "@/Rendering/Abstract/Canvas";
import { Vector2 } from "@/Engine/Geometry/Vector2";

export abstract class Canvas2DTest extends Canvas {
  x = 0;
  y = 0;
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

  public drawSquare(x: number, y: number, width: number, height: number): void {
    this.contextd2D.fillRect(x, y, width, height);
  }

  public drawHorizontalLine(length: number) {
    length = Math.min(length, this.size.y - this.y);
    console.log(length);
    this.contextd2D.fillRect(this.x, this.y, 1, length);
    this.y += length;
    if (this.y >= this.size.y - 1) {
      this.x++;
      this.y = 0;
    }
  }

  newColumn(){

  }

  public finishDrawing() {
    this.y = 0;
    this.x = 0;
  }

  protected drawLine(x1: number, y1: number, x2: number, y2: number): void {
    this.contextd2D.beginPath();
    this.contextd2D.moveTo(x1, y1);
    this.contextd2D.lineTo(x2, y2);
    this.contextd2D.stroke();
  }

  protected reset(): void {
    this.contextd2D.clearRect(0, 0, this.size.x, this.size.y);
    this.x = 0;
    this.y = 0;
  }

  protected setColor(red: number, green: number, blue: number): void {
    red = Math.floor(red * 255);
    blue = Math.floor(blue * 255);
    green = Math.floor(green * 255);
    this.contextd2D.strokeStyle = `rgb(${red}, ${green}, ${blue})`;
    this.contextd2D.fillStyle = `rgb(${red}, ${green}, ${blue})`;
  }
}
