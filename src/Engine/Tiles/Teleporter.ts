import {Tile} from "@/Engine/Tiles/Tile";
import {Vector2} from "@/Engine/Vector2";
import {Direction, GameMap} from "@/Engine/GameMap";
import {Player} from "@/Engine/Player";
import {angle_faces_down, angle_faces_left} from "@/Engine/utils";

export enum TeleporterType {
    hearts,
    diamonds,
    clubs,
    spades
}

export const TP_TYPE_NAMES = ['hearts', 'diamonds', 'clubs', 'spades'];

export class Teleporter extends Tile {

    public twin !: Teleporter;

    constructor(public readonly teleporter_type: TeleporterType, public rotation = 0) {
        super(0);
        this.tile_type = "teleporter";
    }


    getNextPoint(map: GameMap, x: number, y: number, angle: number): { v: Vector2; dist: number; orientation: "vertical" | "horizontal" } {
         const res = super.getNextPoint(map, x, y, angle);
         const direction =
             (x === 0)
                 ? (angle_faces_left(angle) ? Direction.LEFT : Direction.RIGHT)
                 : (angle_faces_down(angle) ? Direction.DOWN : Direction.UP)
         ;
         this.teleport(map, res.v, direction);
         return res;
    }

    on_walk(map: GameMap, player: Player, walk_direction: Direction) {
        super.on_walk(map, player, walk_direction);
        this.teleport(map, player.pos, walk_direction, true);
    }

    teleport(map: GameMap, pos: Vector2, direction: Direction, is_player = false){
        const coord = map.getCoordsOfTile(this);
        const twin_coord = map.getCoordsOfTile(this.twin);
        pos.x += - coord.x + twin_coord.x;
        pos.y += - coord.y + twin_coord.y;
        if(direction === Direction.UP)
            pos.y--;
        else if(direction === Direction.DOWN)
            pos.y++;
        else if(direction === Direction.RIGHT)
            pos.x++;
        else if(direction === Direction.LEFT)
            pos.x--;
    }

}
