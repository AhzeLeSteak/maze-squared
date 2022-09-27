import { Lines, Vector2 } from "./Geometry/Vector2";
import { Tile, WALL } from "@/Engine/Tiles/Tile";
import { angle_faces_down, angle_faces_left, two_pi } from "@/Engine/Geometry/utils";
import { Teleporter } from "@/Engine/Tiles/Teleporter";


export enum Orientation {
    HORIZONTAL,
    VERTICAL
}


export class GameMap {
    // <editor-fold desc="Attributes and constructor">
    tiles = [] as Array<Tile>;
    starting_pos = { x: 1, y: 1 } as Vector2;
    ending_pos = { x: 8, y: 8 };

    size: Vector2 = {
        x: 10,
        y: 10
    };

    constructor() {
        this.load();
    }

    // </editor-fold>

    // <editor-fold desc="Tile gestion">

    public load(): void {
        this.tiles = new Array(this.size.x * this.size.y)
          .fill(0)
          .map((_, i) =>
            i < this.size.x
            || i > this.size.x * (this.size.y - 1)
            || i % this.size.x === 0
            || (i + 1) % this.size.x === 0
              ? new Tile(1) : new Tile(0));
    }

    public load_from_serialized(options: { tiles: Tile[], size: Vector2, starting_pos: Vector2, ending_pos: Vector2 }) {
        console.log(this);
        this.tiles = [];
        for (let tile of options.tiles) {
            if (tile.tile_type === "base")
                this.tiles.push(new Tile(tile.solid));
            else {
                const new_tp = new Teleporter();
                new_tp.twin_index = (tile as Teleporter).twin_index;
                new_tp.entrance = (tile as Teleporter).entrance;
                this.tiles.push(new_tp);
            }
        }
        this.size = options.size;
        this.starting_pos = options.starting_pos;
        this.ending_pos = options.ending_pos;
        console.log(this);
    }

    vector_to_map_index(v: Vector2): number {
        return Math.floor(v.x) + Math.floor(v.y) * this.size.x;
    }

    map_index_to_vector(i: number): Vector2 {
        if (i < 0 || i > this.tiles.length)
            throw new Error(i + " out of array bound");
        return {
            x: i % this.size.x,
            y: Math.floor(i / this.size.x)
        };
    }

    tile(x: number, y: number, parseInt = true, can_oob = false): Tile {
        if(parseInt) {
            x = Math.floor(x);
            y = Math.floor(y);
        }
        if (this.isOutOfBound({ x, y })) {
            if (can_oob) return WALL;
            throw new Error(`Out of bound : {x:${x}, y:${y}}`);
        }
        return this.tiles[x + y * this.size.x];
    }

    isOutOfBound({ x, y }: Vector2): boolean {
        return x < 0 || y < 0 || x >= this.size.x || y >= this.size.y;
    }

    set_tile(v: Vector2, tile: Tile): void {
        const index = this.vector_to_map_index(v);
        this.tiles[index] = tile;
    }

    replace_tile(old_tile: Tile, new_tile: Tile) {
        const pos = this.get_coords_of_tile(old_tile);
        this.set_tile(pos, new_tile);
    }

    // </editor-fold>

    // <editor-fold desc="Map exploration">
    get_coords_of_tile(tile: Tile) {
        return this.map_index_to_vector(this.tiles.findIndex(t => t === tile));
    }

    get_next_wall(original_pos: Vector2, angle: number) {
        angle = (angle + two_pi) % two_pi;
        const points: Lines = [{ ...original_pos }];
        let t = this.get_tile_from_side_coords(original_pos, angle, true);
        let end = false;
        const exploration = { v: { ...original_pos }, angle, distance: 0, orientation: Orientation.HORIZONTAL };
        do {
            if (t.get_next_point(this, exploration, points))
                break;
            points.push({ ...exploration.v });
            t = this.get_tile_from_side_coords(exploration.v, exploration.angle);
            end = t.solid === 1 || exploration.distance > 100;
        } while (!end);

        const wallCol = (exploration.orientation === Orientation.HORIZONTAL ? exploration.v.x : exploration.v.y) % 1;


        return { ...exploration, wallCol, points };
    }

    get_tile_from_side_coords({ x, y }: Vector2, angle: number, initial = false): Tile {
        const x_is_int = x === Math.floor(x);
        const y_is_int = y === Math.floor(y);

        if (x_is_int) {
            const face_left = angle_faces_left(angle);
            return this.tile(x + (face_left ? -1 : 0), y, true, true);
        } else if (y_is_int) {
            const face_down = angle_faces_down(angle);
            return this.tile(x, y + (face_down ? 0 : -1), true, true);
        }
        else if(initial)
            return this.tile(x, y, true, false);
        throw new Error(`Get Tile from Side coords {x:${x}, y:${y}}`);
    }


    // </editor-fold>
}
