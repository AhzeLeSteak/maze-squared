import { distance, infinite, Vector2 } from "./Vector2";
import { pi, pi_over_2, two_pi } from "./utils";

export class GameMap {
  // <editor-fold desc="Attributes and constructor">
  map_info: {
    boxes: Array<number>;
    playerPos: Vector2;
  } = {
    boxes: [],
    playerPos: { x: 5, y: 5 },
  };

  size: Vector2 = {
    x: 10,
    y: 10,
  };

  constructor() {
    this.load();
  }

  // </editor-fold>

  // <editor-fold desc="Box gestion">

  get boxes(): Array<number> {
    return this.map_info.boxes;
  }

  public load(): void {
    this.map_info.boxes = [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0, 0, 0, 0, 1, 3, 1, 1, 0, 1, 0, 0,
      0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1,
      1, 2, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0,
      0, 0, 0, 0, 1, 1, 1, 1, 3, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ];
  }

  to_index(v: Vector2): number {
    return Math.floor(v.x) + Math.floor(v.y) * this.size.x;
  }

  box(x: number, y: number, can_oob = false): number {
    x = Math.floor(x);
    y = Math.floor(y);
    if (this.isOutOfBound({ x, y })) {
      if (can_oob) return 1;
      throw new Error(`Out of bound : {x:${x}, y:${y}}`);
    }
    return this.boxes[x + y * this.size.x];
  }

  isOutOfBound({ x, y }: Vector2): boolean {
    return x < 0 || y < 0 || x >= this.size.x || y >= this.size.y;
  }

  setBox(v: Vector2, box_type: number): void {
    const index = this.to_index(v);
    if (Math.floor(this.boxes[index]) !== box_type || box_type < 2) {
      this.boxes[index] = box_type;
    } else {
      this.boxes[index] += 0.25;
      if (this.boxes[index] - box_type === 1) {
        this.boxes[index]--;
      }
    }
  }

  // </editor-fold>

  // <editor-fold desc="Map exploration">
  getNextPoint(
    { x, y }: Vector2,
    angle: number
  ): {
    point: Vector2;
    distance: number;
    wallCol: number;
    from: "HORIZONTAL" | "VERTICAL";
    pointsToDraw: Array<Vector2>;
    pointBreak: Array<number>;
    squaresToDraw: Array<Vector2>;
  } {
    const in_range_angle = (a: number) => (a + two_pi) % two_pi;
    angle = in_range_angle(angle);
    const pointsToDraw: Array<Vector2> = [];
    const squaresToDraw: Array<Vector2> = [];
    const pointBreak: Array<number> = [];

    let from: "HORIZONTAL" | "VERTICAL" = "HORIZONTAL";
    const directionV = () => (angle > Math.PI ? "UP" : "DOWN");
    const directionH = () =>
      angle > pi_over_2 && angle < 3 * pi_over_2 ? "LEFT" : "RIGHT";

    let old_x = x;
    let old_y = y;
    let nx = x;
    let ny = y;

    const get_box_type = () => {
      let dx = 0;
      let dy = 0;
      if (nx % 1 === 0 && directionH() === "LEFT") {
        dx = -1;
      }
      if (ny % 1 === 0 && "HORIZONTAL" && directionV() === "UP") {
        dy = -1;
      }

      squaresToDraw.push({ x: Math.floor(nx) + dx, y: Math.floor(ny) + dy });
      return this.box(Math.floor(nx) + dx, Math.floor(ny) + dy, true);
    };

    let dist = 0;
    let i = 0;

    try {
      do {
        if (i++ > 100) {
          return {
            point: infinite,
            distance: Infinity,
            wallCol: 0,
            from,
            pointsToDraw: [],
            pointBreak,
            squaresToDraw: [],
          };
        }

        const diff_x_left_side =
          (nx % 1) + (nx % 1 === 0 && directionH() === "LEFT" ? 1 : 0);
        const diff_x_right_side = 1 - diff_x_left_side;
        const diff_y_up_side =
          (ny % 1) + (ny % 1 === 0 && directionV() === "UP" ? 1 : 0);
        const diff_y_down_side = 1 - diff_y_up_side;

        const angle1 = in_range_angle(
          Math.atan2(diff_y_down_side, diff_x_right_side)
        ); // DOWN RIGHT CORNER
        const angle2 = in_range_angle(
          Math.atan2(diff_y_down_side, -diff_x_left_side)
        ); // DOWN LEFT CORNER
        const angle3 = in_range_angle(
          Math.atan2(-diff_y_up_side, -diff_x_left_side)
        ); // UP LEFT CORNER
        const angle4 = in_range_angle(
          Math.atan2(-diff_y_up_side, diff_x_right_side)
        ); // UP RIGHT CORNER

        let direction: "RIGHT" | "DOWN" | "LEFT" | "UP";

        const tmp_x = nx;
        const tmp_y = ny;
        if (angle < angle1) {
          // RIGHT
          nx = nx - (nx % 1) + 1;
          ny = (nx - old_x) * Math.tan(angle) + old_y;
          from = "VERTICAL";
          direction = "RIGHT";
        } else if (angle < angle2) {
          // DOWN
          ny = ny - (ny % 1) + 1;
          nx = (old_y - ny) * Math.tan(angle - pi_over_2) + old_x;
          from = "HORIZONTAL";
          direction = "DOWN";
        } else if (angle < angle3) {
          // GAUCHE
          if (nx % 1 === 0) {
            nx -= 1;
          } else {
            nx = nx - (nx % 1);
          }
          ny = (nx - old_x) * Math.tan(angle - pi) + old_y;
          from = "VERTICAL";
          direction = "LEFT";
        } else if (angle < angle4) {
          // HAUT
          if (ny % 1 === 0) {
            ny -= 1;
          } else {
            ny = ny - (ny % 1);
          }
          nx = (old_y - ny) * Math.tan(angle - pi_over_2) + old_x;
          from = "HORIZONTAL";
          direction = "UP";
        } else {
          // RIGHT AGAIN
          nx = nx - (nx % 1) + 1;
          ny = (nx - old_x) * Math.tan(angle) + old_y;
          from = "VERTICAL";
          direction = "RIGHT";
        }
        old_x = tmp_x;
        old_y = tmp_y;

        dist += distance({ x: old_x, y: old_y }, { x: nx, y: ny });
        pointsToDraw.push({ x: nx, y: ny });

        const box_type = get_box_type();
        if (box_type > 1) {
          const { v, angle: n_angle } = this.getThrough(
            { x: nx, y: ny },
            angle,
            direction
          );
          nx = v.x;
          ny = v.y;
          old_x = nx;
          old_y = ny;
          angle = n_angle;
          pointBreak.push(pointsToDraw.length);
          pointsToDraw.push({ x: nx, y: ny });
        }
      } while (get_box_type() !== 1);
    } catch (e) {
      console.error(e);
    }
    const wallCol = (from === "HORIZONTAL" ? nx : ny) % 1;

    return {
      point: {
        x: nx,
        y: ny,
      },
      distance: dist,
      wallCol,
      from,
      pointsToDraw,
      pointBreak,
      squaresToDraw,
    };
  }

  public getThrough(
    v: Vector2,
    angle: number,
    direction: "RIGHT" | "DOWN" | "LEFT" | "UP",
    isPlayer = false
  ): {
    v: Vector2;
    angle: number;
  } {
    const nv = this.getOtherBox(
      v.x - (v.x % 1 === 0 && direction === "LEFT" ? 1 : 0),
      v.y - (v.y % 1 === 0 && direction === "UP" ? 1 : 0)
    );

    const rotation =
      (this.box(
        v.x - (v.x % 1 === 0 && direction === "LEFT" ? 1 : 0),
        v.y - (v.y % 1 === 0 && direction === "UP" ? 1 : 0)
      ) %
        1) /
      0.25;

    const diff: Vector2 = {
      x: v.x % 1,
      y: v.y % 1,
    };

    if (rotation == 2) {
      if (direction == "UP" || direction == "DOWN") {
        diff.x = 1 - diff.x;
        diff.y = direction === "UP" ? 1 - diff.y : diff.y * -1;
        if (isPlayer && direction === "UP") {
          nv.y++;
        }
      } else {
        diff.y = 1 - diff.y;
        diff.x = direction === "LEFT" ? 1 - diff.x : diff.x * -1;
        if (isPlayer && direction === "LEFT") {
          nv.x++;
        }
      }

      return {
        v: {
          x: nv.x + diff.x,
          y: nv.y + diff.y,
        },
        angle: (angle + pi) % two_pi,
      };
    }

    const dirs: Array<"UP" | "RIGHT" | "LEFT" | "DOWN"> = [
      "UP",
      "RIGHT",
      "DOWN",
      "LEFT",
    ];

    for (let i = 0; i < rotation; i++) {
      //rotate
      const x = diff.x;
      diff.x = 1 - diff.y;
      diff.y = x;
      direction = dirs[(dirs.indexOf(direction) + 1) % 4];
      angle = (angle + pi_over_2) % two_pi;
    }

    // #### corrections

    switch (rotation === 0 && direction) {
      case "DOWN":
        nv.y++;
        break;
      case "RIGHT":
        nv.x++;
        break;
    }
    switch (rotation === 0 && isPlayer && direction) {
      case "UP":
        nv.y--;
        break;
      case "LEFT":
        nv.x--;
        break;
    }

    switch (rotation == 1 && isPlayer && direction) {
      case "DOWN":
        nv.y++;
        break;
      case "RIGHT":
        nv.x++;
        break;
      case "UP":
        nv.y--;
        break;
      case "LEFT":
        nv.x--;
        break;
    }

    switch (rotation == 1 && !isPlayer && direction) {
      case "LEFT":
        nv.x--;
        break;
      case "DOWN":
        nv.y++;
        break;
    }

    switch (rotation === 3 && direction) {
      case "UP":
        nv.y--;
        break;
      case "RIGHT":
        nv.x++;
    }

    switch (rotation === 3 && isPlayer && direction) {
      case "LEFT":
        nv.x--;
        break;
      case "DOWN":
        nv.y++;
        break;
    }

    return {
      v: {
        x: nv.x + diff.x,
        y: nv.y + diff.y,
      },
      angle,
    };
  }

  public getOtherBox(x: number, y: number): Vector2 {
    x = Math.floor(x);
    y = Math.floor(y);
    const box_type = Math.floor(this.box(x, y));
    if (box_type <= 1) {
      throw new Error(box_type + " can not be a teleporter");
    }
    for (let i = 0; i < this.boxes.length; i++) {
      if (Math.floor(this.boxes[i]) === box_type && i !== x + y * this.size.x) {
        return {
          x: i % this.size.x,
          y: Math.floor(i / this.size.x),
        };
      }
    }
    throw new Error(`Can't find other box of type ${box_type}`);
  }

  // </editor-fold>
}
