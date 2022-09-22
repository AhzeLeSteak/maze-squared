type TileType = "base" | "teleporter";

export class Tile {

  public tile_type: TileType = "base";

  constructor(public solid: number) {

  }


}

export const WALL = new Tile(1);
export const FLOOR = new Tile(0);
