import { Tile } from "@/Engine/Tiles/Tile";
import { Lines, Vector2 } from "@/Engine/Geometry/Vector2";
import { GameMap, Orientation } from "@/Engine/GameMap";
import { Player } from "@/Engine/Player";
import { angle_faces_down, angle_faces_left, correct_angle, pi_over_2 } from "@/Engine/Geometry/angles";
import { Direction, opposite } from "@/Engine/Geometry/Direction";

export enum TeleporterType {
    hearts,
    diamonds,
    clubs,
    spades
}

export const TP_TYPE_NAMES = ["hearts", "diamonds", "clubs", "spades"];

function rotate_point(rotation_center: Vector2, angle: number, p: Vector2): Vector2{
    let s = Math.sin(angle);
    let c = Math.cos(angle);

    // translate point back to origin:
    p.x -= rotation_center.x;
    p.y -= rotation_center.y;

    // rotate point
    let xnew = p.x * c - p.y * s;
    let ynew = p.x * s + p.y * c;

    // translate point back:
    p.x = xnew + rotation_center.x;
    p.y = ynew + rotation_center.y;
    return p;
}

export class Teleporter extends Tile {

    public twin_index = -1;

    constructor(public entrance = Direction.DOWN) {
        super(0);
        this.tile_type = "teleporter";
    }

    get has_twin() {
        return this.twin_index >= 0;
    }

    get_next_point(map: GameMap, exploration: { v: Vector2, angle: number, distance: number, orientation: Orientation }, points: Lines): boolean {
        const direction =
          (exploration.v.x % 1 === 0)
            ? (angle_faces_left(exploration.angle) ? Direction.LEFT : Direction.RIGHT)
            : (angle_faces_down(exploration.angle) ? Direction.DOWN : Direction.UP)
        ;
        if (direction !== opposite(this.entrance))
            return true;

        this.teleport(map, exploration.v, direction, points);
        this.rotate(map, exploration, exploration.v, points);
        return super.get_next_point(map, exploration, points);
    }

    on_walk(map: GameMap, player: Player, walk_direction: Direction) {
        super.on_walk(map, player, walk_direction);
        this.teleport(map, player.pos, walk_direction);
        this.rotate(map, player, player.pos);
    }

    teleport(map: GameMap, pos: Vector2, direction: Direction, points ?: Lines) {
        const coord = map.get_coords_of_tile(this);
        const twin_coord = map.get_coords_of_tile(this.twin(map));
        pos.x += -coord.x + twin_coord.x;
        pos.y += -coord.y + twin_coord.y;
        if (direction === Direction.UP)
            pos.y--;
        else if (direction === Direction.DOWN)
            pos.y++;
        else if (direction === Direction.RIGHT)
            pos.x++;
        else if (direction === Direction.LEFT)
            pos.x--;
        points?.push({ ...pos, new_line: true });
    }

    rotate(map: GameMap, obj: { angle: number }, pos: Vector2, points ?: Lines) {
        const nb_rotation = ((2 + this.twin(map).entrance - this.entrance) % 4);
        if (nb_rotation !== 0) {
            const tp_angle = pi_over_2 * nb_rotation;
            const twin_coord = map.get_coords_of_tile(this.twin(map));
            rotate_point({ x: twin_coord.x + .5, y: twin_coord.y + .5 }, tp_angle, pos);
            obj.angle = correct_angle(obj.angle + tp_angle);
            points?.pop();
            points?.push({ ...pos, new_line: true });
        }
    }

    can_go_through(direction: Direction): boolean {
        return direction === opposite(this.entrance);
    }

    twin(map: GameMap) {
        return map.tiles[this.twin_index] as Teleporter;
    }

}
