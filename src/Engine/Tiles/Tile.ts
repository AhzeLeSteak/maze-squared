import {Vector2} from "@/Engine/Vector2";
import {correct_angle} from "@/Engine/utils";
import {Direction, GameMap} from "@/Engine/GameMap";
import {Player} from "@/Engine/Player";

type TileType = "base" | "teleporter";

export class Tile {

    public tile_type: TileType = "base";

    constructor(public solid: number) {

    }


    /**
     * Calcule la nouvelle position d'un point à partir d'un angle donné
     * @param map carte de jeu
     * @param x Nombre [0;1[
     * @param y Nombre [0; 1[
     * @param angle Nombre [0; 2pi[
     */
    getNextPoint(map: GameMap, x: number, y: number, angle: number): { v: Vector2, dist: number, orientation: "vertical" | "horizontal" } {
        const x_is_int = x === 0;
        const y_is_int = y === 0;

        if (angle === 0) //vers la droits
            return { v: { x: x_is_int ? 1 : 1-x, y: 0 }, dist: 1, orientation: "horizontal" };
        if (angle === Math.PI) //vers la gauche
            return { v: { x: x_is_int ? -1 : -x, y: 0 }, dist: 1, orientation: "horizontal" };
        if (angle === Math.PI * 3 / 2) //vers le haut
            return { v: { x: 0, y: y_is_int ? -1 :  -y }, dist: 1, orientation: "vertical" };
        if (angle === Math.PI / 2) //vers le bas
            return { v: { x: 0, y: y_is_int ? 1 : 1 - y }, dist: 1, orientation: "vertical" };

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
        let dist: number;
        let orientation: "vertical" | "horizontal";

        if (hypo_y < hypo_x) {
            next_x = normalized_x * (face_left ? -1 : 1);
            dist = hypo_y;
            orientation = "vertical";
        } else {
            next_y = normalized_y * (!face_down ? -1 : 1);
            dist = hypo_x;
            orientation = "horizontal";
        }

        return {
            v: {
                x: next_x,
                y: next_y
            },
            dist,
            orientation
        };
    }

    on_walk(map: GameMap, player: Player, d: Direction){

    }

}

export const WALL = new Tile(1);
export const FLOOR = new Tile(0);
