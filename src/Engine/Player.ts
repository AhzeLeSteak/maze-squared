import { Vector2 } from "@/Engine/Geometry/Vector2";
import { correct_angle, pi_over_2 } from "@/Engine/Geometry/utils";
import { GameMap } from "@/Engine/GameMap";
import { Direction } from "@/Engine/Geometry/Direction";

export class Player {
  /**
   * Angle en radian
   */
  public angle = pi_over_2 + 0.1;
  public readonly speed = 2; //tile per second
  public readonly rotation_speed = 120; // deg per second

  constructor(public pos: Vector2) {
    this.pos = { x: pos.x + .5, y: pos.y + .5 };
  }

  addAngle(da: number): void {
    this.angle += da;
    this.angle = correct_angle(this.angle);
  }

  walk(map: GameMap, dt: number, angle = this.angle): void {
    const nextPoint = this.getNextPointWalking(dt, angle);

    const diff_pos: Vector2 = {
      x: Math.floor(nextPoint.x) - Math.floor(this.pos.x),
      y: Math.floor(nextPoint.y) - Math.floor(this.pos.y)
    };

    const direction =
      diff_pos.x === 1
        ? Direction.RIGHT
        : diff_pos.x === -1
          ? Direction.LEFT
          : diff_pos.y === 1
            ? Direction.DOWN
            : Direction.UP;

    if (map.tile(nextPoint.x, nextPoint.y, true, true).can_go_through(direction)) {
      this.pos.x = nextPoint.x;
      this.pos.y = nextPoint.y;
    }


    map.tile(this.pos.x, this.pos.y, true).on_walk(map, this, direction);
  }

  getNextPointWalking(
    dt: number,
    angle = this.angle,
    speed: number = this.speed
  ): Vector2 {
    const x = this.pos.x + Math.cos(angle) * speed * dt;
    const y = this.pos.y + Math.sin(angle) * speed * dt;
    return { x, y };
  }

  update(map: GameMap): void {
    /*
		const new_type = map.box(this.pos.x, this.pos.y);
		if(new_type > 1 && this.box_type !== new_type) {
		  const v = map.getThrough({x: this.pos.x, y: this.pos.y}, this.angle, true);
		  this.pos.x = v.x;
		  this.pos.y = v.y;
		}
		this.box_type = new_type;

		 */
  }
}
