import { Tile } from "@/Engine/Tiles/Tile";

export type TeleporterType = "heart" | "diamonds" | "clubs" | "spades";

export class Teleporter extends Tile {

  constructor(public readonly teleporter_type: TeleporterType, public rotation = 0) {
    super(1);
    this.tile_type = "teleporter";
  }

  public add_rotation() {
    this.rotation = ++this.rotation % 4;
  }


}
