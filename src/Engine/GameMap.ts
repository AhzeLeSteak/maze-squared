import {Vector2} from "./Vector2";
import {Tile, WALL} from "@/Engine/Tiles/Tile";
import {two_pi} from "@/Engine/utils";
import {Teleporter} from "@/Engine/Tiles/Teleporter";

export enum Direction{
    UP,
    DOWN,
    LEFT,
    RIGHT,
    NONE
}
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
        const array: number[] = new Array(this.size.x * this.size.y)
            .fill(0)
            .map((_, i) =>
                i < this.size.x
                || i > this.size.x * (this.size.y - 1)
                || i % this.size.x === 0
                || (i + 1) % this.size.x === 0
                    ? 1 : 0);
        array[this.size.x+1] = 2;
        array[this.size.x*2+1] = 1;
        array[array.length - this.size.x - 2] = 2;
        array[array.length - this.size.x*2 - 2] = 1;
        this.load_from_array(array);
    }

    public load_from_array(tile_as_numbers: number[]){
        this.map_info.boxes = [];
        const teleporters: {[key: number]: Teleporter} = {};
        for(let n of tile_as_numbers){
            if(n < 2)
                this.map_info.boxes.push(new Tile(n));
            else{
                const tp_type = n-2;
                const new_tp = new Teleporter(tp_type);
                if(teleporters[tp_type]){
                    new_tp.twin = teleporters[tp_type];
                    teleporters[tp_type].twin = new_tp;
                }
                else
                    teleporters[tp_type] = new_tp;
                this.map_info.boxes.push(new_tp);
            }
        }
    }

    vector_to_map_index(v: Vector2): number {
        return Math.floor(v.x) + Math.floor(v.y) * this.size.x;
    }

    map_index_to_vector(i: number): Vector2 {
        if(i < 0 || i > this.map_info.boxes.length)
            throw new Error(i+' out of array bound');
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
        v = {...v};
        let t = this.getTileFromSideCoords(v, angle, true);
        let dist = 0;
        let orientation: "vertical" | "horizontal";
        do {
            const next_point = t.getNextPoint(this, v.x%1, v.y%1, angle);
            dist += next_point.dist;
            v.x += next_point.v.x;
            v.y += next_point.v.y;
            t = this.getTileFromSideCoords(v, angle);
            orientation = next_point.orientation;
        } while (t.solid === 0);

        const wallCol = (orientation === "horizontal" ? v.x : v.y) % 1;


        return { v, distance: dist, orientation, wallCol };
    }

    getTileFromSideCoords({ x, y }: Vector2, angle: number, initial = false): Tile {
        const x_is_int = x === Math.floor(x);
        const y_is_int = y === Math.floor(y);

        if (x_is_int) {
            const face_left = angle >= Math.PI / 2 && angle <= Math.PI * 3 / 2;
            return this.tile(x + (face_left ? -1 : 0),  y, true);
        } else if (y_is_int) {
            const face_down = angle <= Math.PI;
            return this.tile(x, y + (face_down ? 0 : -1), true);
        }
        else if(initial)
            return this.tile(x, y, true, false);
        throw new Error("Get Tile from Side coords");
    }


    // </editor-fold>
}
