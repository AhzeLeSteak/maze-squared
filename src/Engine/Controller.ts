import { Game } from "@/Engine/Game";
import { degreToRadian, pi, pi_over_2 } from "@/Engine/Geometry/utils";

export class Controller {
  private UP = false;
  private DOWN = false;
  private LEFT = false;
  private RIGHT = false;
  private STRAFE_LEFT = false;
  private STRAFE_RIGHT = false;

  constructor(private game: Game) {
    this.bindEvents();
  }

  update(dt: number): void {
    const speed = this.game.player.rotation_speed;
    if (this.RIGHT) this.game.player.addAngle(degreToRadian * speed * dt);
    else if (this.LEFT) this.game.player.addAngle(-degreToRadian * speed * dt);

    const side = this.STRAFE_LEFT || this.STRAFE_RIGHT;
    const forward = this.UP || this.DOWN;
    if (!side && !forward) return;

    let delta_speed = 1;
    let diff_angle = 0;
    let base_angle = this.game.player.angle;

    if (side)
      diff_angle = this.STRAFE_RIGHT ? pi_over_2 : -pi_over_2;
    if (forward) {
      if (this.DOWN) base_angle += pi;
      if (side) {
        //diagonal movement
        diff_angle /= this.DOWN ? -2 : 2; //45° angle
        delta_speed = 1 / Math.sqrt(2); //waling speed divided by sqrt(2) (pythagorean theorem)
      }
    }

    this.game.player.walk(
      this.game.map,
      dt * delta_speed,
      base_angle + diff_angle
    );
  }

  bindEvents(): void {
    const listener = (event: KeyboardEvent) => {
      const val = event.type === "keydown";
      switch (event.code) {
        case "KeyW":
          this.UP = val;
          break;
        case "KeyS":
          this.DOWN = val;
          break;
        case "KeyQ":
          this.LEFT = val;
          break;
        case "KeyE":
          this.RIGHT = val;
          break;
        case "KeyA":
          this.STRAFE_LEFT = val;
          break;
        case "KeyD":
          this.STRAFE_RIGHT = val;
          break;
      }
    };

    document.addEventListener("keydown", listener);
    document.addEventListener("keyup", listener);
  }
}
