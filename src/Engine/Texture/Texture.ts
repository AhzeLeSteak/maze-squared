import { Vector2 } from "@/Engine/Geometry/Vector2";

export type Color = number;

export const distance = (c1: Color, c2: Color) => Math.abs(c1 - c2);

export class Texture {
  public readonly columns: Array<Array<Color>>;

  constructor(pixels: Array<Color>, public size: Vector2) {
    this.columns = [];
    for (let x = 0; x < this.size.x; x++) {
      this.columns.push(pixels.filter((v, i) => i % this.size.y === x));
    }
  }
}
