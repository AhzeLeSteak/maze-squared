import { Vector2 } from "@/Engine/Vector2";
import { pi_over_2, two_pi } from "@/Engine/utils";
import { GameMap } from "@/Engine/GameMap";

export class Player {
  /**
   * Angle en radian
   */
  public angle = -pi_over_2;
  public readonly speed = 2; //tile per second
  public readonly rotation_speed = 120; // deg per second
  private box_type = 0;

  constructor(public pos: Vector2) {
    this.pos.x += 0.5;
    this.pos.y += 0.5;
  }

  addAngle(da: number): void {
    this.angle += da;
    this.angle = (this.angle + two_pi) % two_pi;
  }

  walk(map: GameMap, dt: number, angle = this.angle): void {
    const nextPoint = this.getNextPointWalking(dt, angle);
    const old_pos: Vector2 = { ...this.pos };
    if (map.box(nextPoint.x, nextPoint.y, true) !== 1) {
      this.pos.x = nextPoint.x;
      this.pos.y = nextPoint.y;
    } else if (map.box(this.pos.x, nextPoint.y, true) !== 1) {
      this.pos.y = nextPoint.y;
    } else if (map.box(nextPoint.x, this.pos.y, true) !== 1) {
      this.pos.x = nextPoint.x;
    }

    const diff_pos: Vector2 = {
      x: Math.floor(this.pos.x) - Math.floor(old_pos.x),
      y: Math.floor(this.pos.y) - Math.floor(old_pos.y),
    };

    const direction =
      diff_pos.x === 1
        ? "RIGHT"
        : diff_pos.x === -1
        ? "LEFT"
        : diff_pos.y === 1
        ? "DOWN"
        : "UP";

    const new_type = Math.floor(map.box(this.pos.x, this.pos.y));
    if (new_type > 1 && this.box_type !== new_type) {
      const { v, angle: n_angle } = map.getThrough(
        { x: this.pos.x, y: this.pos.y },
        this.angle,
        direction,
        true
      );
      this.pos.x = v.x;
      this.pos.y = v.y;
      this.angle = n_angle;
    }
    this.box_type = new_type;
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
