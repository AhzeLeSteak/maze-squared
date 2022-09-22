import { Tile } from "@/Engine/Tiles/Tile";

export class Teleporter extends Tile {

  constructor(public rotation = 0) {
    super(1);
    this.tile_type = "teleporter";
  }

  public add_rotation() {
    this.rotation = ++this.rotation % 4;
  }


}
