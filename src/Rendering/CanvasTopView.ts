import {Game} from "@/Engine/Game";
import {Vector2} from "@/Engine/Geometry/Vector2";
import {degreToRadian, pi} from "@/Engine/Geometry/angles";
import {Canvas2D} from "./Abstract/Canvas2D";
import {Teleporter} from "@/Engine/Tiles/Teleporter";
import {Orientation} from "@/Engine/GameMap";
import {Direction} from "@/Engine/Geometry/Direction";
import {WALL} from "@/Engine/Tiles/Tile";

export class CanvasTopView extends Canvas2D {

    private last_player_pos: Vector2;
    public tile_pos_hovered ?: Vector2;
    public draw_player = true;

    constructor(game: Game, public readonly tile_size: number, canvas ?: HTMLCanvasElement) {
        super({
            x: game.map.size.x * tile_size,
            y: game.map.size.y * tile_size,
        }, canvas);
        this.last_player_pos = { x: Infinity, y: Infinity };
    }

    drawContext(game: Game): void {
        this.size = {
            x: game.map.size.x * this.tile_size,
            y: game.map.size.y * this.tile_size,
        }
        this.resizeCanvasHtml(this.canvas, this.size);
        this.reset();
        const tile_size = this.tile_size;

        this.contextd2D.strokeStyle = "black";
        this.contextd2D.font = Math.floor(tile_size * 0.3) + "px Comic sans";

        // affichage de la map
        const map = game.map;
        for (let y = 0; y < map.size.y; y++) {
            for (let x = 0; x < map.size.x; x++) {
                const tile = map.tile(x, y, false);
                this.contextd2D.fillStyle = tile.tile_type === "teleporter" ? "purple" : (["grey", "black"][tile.solid] ?? "yellow");
                this.drawSquare(
                  x * tile_size + 1,
                  y * tile_size + 1,
                  tile_size - 2,
                  tile_size - 2
                );
                if (tile.tile_type === "teleporter") {
                    const tp = tile as Teleporter;
                    this.contextd2D.fillStyle = "rgba(66,58,58,0.9)";
                    const width = tile_size / 5;
                    this.drawSquare(
                      x * tile_size + (tp.entrance === Direction.RIGHT ? tile_size - width : 0),
                      y * tile_size + (tp.entrance === Direction.DOWN ? tile_size - width : 0),
                      [Direction.UP, Direction.DOWN].includes(tp.entrance) ? tile_size : width,
                      [Direction.LEFT, Direction.RIGHT].includes(tp.entrance) ? tile_size : width
                    );
                }

            }
        }

        //affichage départ et arrivée
        const ratio = .3;
        this.contextd2D.fillStyle = "rgba(18,255,73, 1)";
        this.drawSquare(
          (game.map.starting_pos.x + .5 - ratio / 2) * tile_size,
          (game.map.starting_pos.y + .5 - ratio / 2) * tile_size,
          tile_size * ratio,
          tile_size * ratio
        );
        this.contextd2D.fillStyle = "rgba(255, 18,73, 1)";
        this.drawSquare(
          (game.map.ending_pos.x + .5 - ratio / 2) * tile_size,
          (game.map.ending_pos.y + .5 - ratio / 2) * tile_size,
          tile_size * ratio,
          tile_size * ratio
        );

        if (this.draw_player) {
            const player_pos: Vector2 = { ...game.player.pos };

            //affichage du champ de vision
            for (let i = -game.view_angle / 2; false && i < game.view_angle / 2; i++) {
                for (let j = 0; j < 1; j++) {
                    const angle = game.player.angle + (i + j / 2) * degreToRadian;
                    const nextWall = map.get_next_wall(game.player.pos, angle);
                    nextWall.orientation === Orientation.HORIZONTAL
                      ? this.setColor(55, 200, 40)
                      : this.setColor(50, 85, 255);
                    for (let i = 0; i < nextWall.points.length - 1; i++) {
                        const p1 = nextWall.points[i];
                        const p2 = nextWall.points[i + 1];
                        if (!p2.new_line)
                            this.drawLine(
                              p1.x * tile_size,
                              p1.y * tile_size,
                              p2.x * tile_size,
                              p2.y * tile_size
                            );
                    }


                }
            }

            //affichage du rayon face au joueur
            const { v, distance, points, angle } = game.map.get_next_wall(player_pos, game.player.angle);
            for (let i = 0; i < points.length - 1 && i < 64; i++) {
                this.contextd2D.strokeStyle = i % 2 === 0 ? "cyan" : "darkred";
                const p1 = points[i];
                const p2 = points[i + 1];
                if (!p2.new_line)
                    this.drawLine(
                      p1.x * tile_size,
                      p1.y * tile_size,
                      p2.x * tile_size,
                      p2.y * tile_size
                    );
            }


            //surbrillance de la case pointée par le joueur
            const tile = game.map.get_tile_from_side_coords(v, angle);
            if (tile !== WALL) {
                const tile_coords = game.map.get_coords_of_tile(tile);
                this.drawSquare(tile_coords.x * tile_size, tile_coords.y * tile_size, tile_size, tile_size);
            }

            this.contextd2D.fillStyle = "darkblue";
            this.contextd2D.fillText(distance.toString().substring(0, 4), (player_pos.x + v.x) * tile_size / 2, (player_pos.y + v.y) * tile_size / 2);


            //surbrillance de la case où se situe le joueur
            let x = Math.floor(game.player.pos.x) * tile_size;
            let y = Math.floor(game.player.pos.y) * tile_size;

            this.contextd2D.fillStyle = "rgba(100, 100, 100, 0.6)";
            this.drawSquare(x + 1, y + 1, tile_size - 2, tile_size - 2);



            // affichage du joueur
            this.contextd2D.strokeStyle = "red";
            this.contextd2D.fillStyle = "red";
            const player_size = 8;
            this.drawSquare(
              player_pos.x * tile_size - player_size / 2,
              player_pos.y * tile_size - player_size / 2,
              player_size,
              player_size
            );


            // affichage de l'angle
            this.contextd2D.fillStyle = "black";
            this.contextd2D.font = "16px Comic sans";
            this.contextd2D.fillText(
              (game.player.angle / pi).toFixed(2) + "pi",
              player_pos.x * tile_size + 10,
              player_pos.y * tile_size + 10
            );
        }


        //surbrillance de la case où se situe le curseur
        if(this.tile_pos_hovered) {
            const x = Math.floor(this.tile_pos_hovered.x) * tile_size;
            const y = Math.floor(this.tile_pos_hovered.y) * tile_size;

            this.contextd2D.fillStyle = "rgba(255,255,255,0.4)";
            this.drawSquare(x + 1, y + 1, tile_size - 2, tile_size - 2);

            const tile = game.map.tile(this.tile_pos_hovered.x, this.tile_pos_hovered.y, false);
            if (tile.tile_type === "teleporter") {
                this.contextd2D.fillStyle = "grey";
                const tp = tile as Teleporter;
                if (!tp.has_twin) return;
                const twin_coord = game.map.get_coords_of_tile(tp.twin(game.map));
                this.drawLine(
                  (this.tile_pos_hovered.x + .5) * tile_size,
                  (this.tile_pos_hovered.y + .5) * tile_size,
                  (twin_coord.x + .5) * tile_size,
                  (twin_coord.y + .5) * tile_size
                );
            }
        }

    }


}
