import { Vector2 } from "@/Engine/Geometry/Vector2";

export type Color = {
  r: number;
  g: number;
  b: number;
};

export const distance = (c1: Color, c2: Color) =>
  Math.sqrt(
    (c1.r - c2.r) ** 2 +
    (c1.g - c2.g) ** 2 +
    (c1.b - c2.b) ** 2
  ) * 255;

export class Texture {
  public readonly columns: Array<Array<Color>>;

  constructor(pixels: Array<Color>, public size: Vector2) {
    this.columns = [];
    for (let x = 0; x < this.size.x; x++) {
      this.columns.push(pixels.filter((v, i) => i % this.size.y === x));
    }
  }
}
