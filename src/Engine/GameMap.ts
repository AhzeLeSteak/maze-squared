import { Vector2 } from "./Vector2";
import { Tile, WALL } from "@/Engine/Tiles/Tile";
import { correct_angle, two_pi } from "@/Engine/utils";


export class GameMap {
    // <editor-fold desc="Attributes and constructor">
    map_info = {
        boxes: [] as Array<Tile>,
        player_pos: { x: 5, y: 5 } as Vector2
    };

    size: Vector2 = {
        x: 10,
        y: 10
    };

    constructor() {
        this.load();
    }

    // </editor-fold>

    // <editor-fold desc="Box gestion">

    get boxes(): Array<Tile> {
        return this.map_info.boxes;
    }

    public load(): void {
        this.map_info.boxes = new Array(this.size.x * this.size.y)
            .fill(0)
            .map((_, i) =>
                i < this.size.x
                || i > this.size.x * (this.size.y - 1)
                || i % this.size.x === 0
                || (i + 1) % this.size.x === 0
                    ? new Tile(1) : new Tile(0));
    }

    vector_to_map_index(v: Vector2): number {
        return Math.floor(v.x) + Math.floor(v.y) * this.size.x;
    }

    map_index_to_vector(i: number): Vector2 {
        return {
            x: i % this.size.x,
            y: Math.floor(i / this.size.x)
        };
    }

    tile(x: number, y: number, can_oob = false): Tile {
        x = Math.floor(x);
        y = Math.floor(y);
        if (this.isOutOfBound({ x, y })) {
            if (can_oob) return WALL;
            throw new Error(`Out of bound : {x:${x}, y:${y}}`);
        }
        return this.boxes[x + y * this.size.x];
    }

    isOutOfBound({ x, y }: Vector2): boolean {
        return x < 0 || y < 0 || x >= this.size.x || y >= this.size.y;
    }

    setTile(v: Vector2, tile: Tile): void {
        const index = this.vector_to_map_index(v);
        this.boxes[index] = tile;
    }

    // </editor-fold>

    // <editor-fold desc="Map exploration">
    getCoordsOfTile(tile: Tile) {
        return this.map_index_to_vector(this.boxes.findIndex(t => t === tile));
    }

    getNextWall(v: Vector2, angle: number): { v: Vector2, distance: number, wallCol: number, orientation: "vertical" | "horizontal"; } {
        angle = (angle+two_pi)%two_pi;
        let t: Tile;
        let dist = 0;
        let orientation: "vertical" | "horizontal";
        do {
            const next_point = this.getNextPoint(v, angle);
            t = this.getTileFromSideCoords(next_point.v, angle);
            dist += next_point.dist;
            v = next_point.v;
            orientation = next_point.orientation;
        } while (t.solid === 0);

        const wallCol = (orientation === "horizontal" ? v.x : v.y) % 1;


        return { v, distance: dist, orientation, wallCol };
    }

    getNextPoint({ x, y }: Vector2, angle: number): { v: Vector2, dist: number, orientation: "vertical" | "horizontal" } {
        const x_is_int = x === Math.floor(x);
        const y_is_int = y === Math.floor(y);

        if (angle === 0)
            return { v: { x: x_is_int ? x + 1 : Math.ceil(x), y }, dist: 1, orientation: "horizontal" };
        if (angle === Math.PI)
            return { v: { x: x_is_int ? x - 1 : Math.floor(x), y }, dist: 1, orientation: "horizontal" };
        if (angle === Math.PI * 3 / 2)
            return { v: { x, y: y_is_int ? y - 1 : Math.floor(y) }, dist: 1, orientation: "vertical" };
        if (angle === Math.PI / 2)
            return { v: { x, y: y_is_int ? y + 1 : Math.ceil(y) }, dist: 1, orientation: "vertical" };

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
            next_x = Math.round(x + normalized_x * (face_left ? -1 : 1));
            next_y += y;
            dist = hypo_y;
            orientation = "vertical";
        } else {
            next_y = Math.round(y + normalized_y * (!face_down ? -1 : 1));
            next_x += x;
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
        //this.getNextPoint({x: next_x, y: next_y}, angle, dist-1);
    }

    getTileFromSideCoords({ x, y }: Vector2, angle: number): Tile {
        const x_is_int = x === Math.floor(x);
        const y_is_int = y === Math.floor(y);

        if (x_is_int) {
            const face_left = angle >= Math.PI / 2 && angle <= Math.PI * 3 / 2;
            return this.tile(x + (face_left ? -1 : 0), Math.floor(y));
        } else if (y_is_int) {
            const face_down = angle <= Math.PI;
            return this.tile(Math.floor(x), y + (face_down ? 0 : -1));
        }
        throw new Error("Get Tile from Side coords");
    }


    // </editor-fold>
}
