import { Lines, Vector2 } from "@/Engine/Vector2";
import { correct_angle } from "@/Engine/utils";
import { Direction, GameMap, Orientation } from "@/Engine/GameMap";
import { Player } from "@/Engine/Player";

type TileType = "base" | "teleporter";

export class Tile {

    public tile_type: TileType = "base";

    constructor(public solid: number) {

    }


    getNextPoint(map: GameMap, exploration: { v: Vector2, angle: number, distance: number, orientation: Orientation }, lines: Lines): boolean {
        const x = exploration.v.x % 1;
        const y = exploration.v.y % 1;
        const angle = exploration.angle;

        if (angle === 0) { //vers la droite
            exploration.v.x++;
            exploration.distance++;
            exploration.orientation = Orientation.HORIZONTAL;
            return true;
        }
        if (angle === Math.PI) { //vers la gauche
            exploration.v.x--;
            exploration.distance++;
            exploration.orientation = Orientation.HORIZONTAL;
            return true;
        }
        if (angle === Math.PI * 3 / 2) { //vers le haut
            exploration.v.y--;
            exploration.distance++;
            exploration.orientation = Orientation.VERTICAL;
            return true;
        }
        if (angle === Math.PI / 2) { //vers le bas
            exploration.v.y++;
            exploration.distance++;
            exploration.orientation = Orientation.VERTICAL;
            return true;
        }

        const face_left = angle >= Math.PI / 2 && angle <= Math.PI * 3 / 2;
        const face_down = angle <= Math.PI;

        let normalized_x = face_left ? x % 1 : 1 - (x % 1);
        let normalized_y = !face_down ? y % 1 : 1 - (y % 1);
        normalized_x = normalized_x === 0 ? 1 : normalized_x;
        normalized_y = normalized_y === 0 ? 1 : normalized_y;


        let next_y = normalized_x * Math.tan(face_left ? correct_angle(Math.PI - angle) : angle);
        let next_x = normalized_y / Math.tan(face_down ? angle : correct_angle(Math.PI - angle));

        const hypo_x = next_x / Math.cos(angle);
        const hypo_y = next_y / Math.sin(angle);

        if (hypo_y < hypo_x) {
            exploration.v.y += next_y;
            exploration.v.x += normalized_x * (face_left ? -1 : 1);
            exploration.distance += hypo_y;
            exploration.orientation = Orientation.VERTICAL;
        } else {
            exploration.v.x += next_x;
            exploration.v.y += normalized_y * (face_down ? 1 : -1);
            exploration.distance += hypo_x;
            exploration.orientation = Orientation.HORIZONTAL;
        }

        return false;
    }

    on_walk(map: GameMap, player: Player, d: Direction){

    }

}

export const WALL = new Tile(1);
export const FLOOR = new Tile(0);
