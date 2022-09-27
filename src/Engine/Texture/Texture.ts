import { Vector2 } from "@/Engine/Geometry/Vector2";

export type Pixel = {
  r: number;
  g: number;
  b: number;
};

export class Texture {
  public readonly columns: Array<Array<Pixel>>;

  constructor(pixels: Array<Pixel>, public size: Vector2) {
    this.columns = [];
    for (let x = 0; x < this.size.x; x++) {
      this.columns.push(pixels.filter((v, i) => i % this.size.y === x));
    }
  }
}
