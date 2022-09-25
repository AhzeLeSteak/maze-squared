import {Vector2} from "@/Engine/Vector2";
import {Game} from "@/Engine/Game";

export abstract class AbstractTool {

  protected constructor(public texture_name: string, public tooltip: string, public selectable = true) {
  }

  on_select(game: Game) {

  }

  on_unselect(game: Game){

  }

  left_click(game: Game, map_pos: Vector2, client_pos: Vector2): boolean | void {

  }

  right_click(game: Game, map_pos: Vector2, client_pos: Vector2): void {

  }

}
