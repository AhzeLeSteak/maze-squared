import { Game } from "@/Engine/Game";
import { Vector2 } from "@/Engine/Vector2";
import { degreToRadian } from "@/Engine/utils";
import { Canvas2D } from "./Abstract/Canvas2D";
import { Teleporter } from "@/Engine/Tiles/Teleporter";

export class CanvasTopView extends Canvas2D {
    private last_player_pos: Vector2;


    constructor(game: Game, public readonly tile_size: number, canvas ?: HTMLCanvasElement) {
        super({
            x: game.map.size.y * tile_size,
            y: game.map.size.y * tile_size,
        }, canvas);
        this.last_player_pos = { x: Infinity, y: Infinity };
    }

    drawContext(game: Game): void {
        this.reset();

        this.contextd2D.strokeStyle = "black";
        this.contextd2D.font = Math.floor(this.tile_size * 0.3) + "px Comic sans";

        // affichage de la map
        const map = game.map;
        for (let y = 0; y < map.size.y; y++) {
            for (let x = 0; x < map.size.x; x++) {
                const tile = map.tile(x, y);
                if (tile.tile_type === "base") {
                    this.contextd2D.fillStyle = ["grey", "black"][tile.solid] ?? "yellow";
                    this.drawSquare(
                      x * this.tile_size + 1,
                      y * this.tile_size + 1,
                      this.tile_size - 2,
                      this.tile_size - 2
                    );
                } else if (tile.tile_type === "teleporter") {
                    const tp = tile as Teleporter;
                    const img = document.getElementById(tp.teleporter_type) as CanvasImageSource;
                    if (img)
                        this.contextd2D.drawImage(img,
                          0, 0, 16, 16,
                          x * this.tile_size + 1,
                          y * this.tile_size + 1,
                          this.tile_size - 2,
                          this.tile_size - 2);
                }
            }
        }

        const player_pos: Vector2 = { ...game.player.pos };

        this.contextd2D.fillStyle = "red";

        for (let i = 0; i < 1; i++) {
            const angle = (Math.PI * i / 6 + game.player.angle) % (Math.PI * 2);
            const { v } = game.map.getNextWall(player_pos, angle);
            this.drawLine(player_pos.x * this.tile_size, player_pos.y * this.tile_size, v.x * this.tile_size, v.y * this.tile_size);
            const tile = game.map.getTileFromSideCoords(v, angle);
            const tile_coords = game.map.getCoordsOfTile(tile);
            this.drawSquare(tile_coords.x * this.tile_size, tile_coords.y * this.tile_size, this.tile_size, this.tile_size);
        }

        for (let i = -game.view_angle / 2; i < game.view_angle / 2; i++) {
            for (let j = 0; j < 1; j++) {
                const angle = game.player.angle + (i + j / 2) * degreToRadian;
                const nextWall = map.getNextWall(game.player.pos, angle);
                nextWall.orientation === "horizontal"
                  ? this.setColor(55, 200, 40)
                  : this.setColor(50, 85, 255);
                this.drawLine(
                  player_pos.x * this.tile_size,
                  player_pos.y * this.tile_size,
                  nextWall.v.x * this.tile_size,
                  nextWall.v.y * this.tile_size
                );

            }
        }


        player_pos.x *= this.tile_size;
        player_pos.y *= this.tile_size;

        const x = Math.floor(game.player.pos.x) * this.tile_size;
        const y = Math.floor(game.player.pos.y) * this.tile_size;

        this.contextd2D.fillStyle = "rgba(100, 250, 100, 0.4)";
        this.drawSquare(x + 1, y + 1, this.tile_size - 2, this.tile_size - 2);

        // affichage des rayons


        // affichage du joueur
        this.contextd2D.strokeStyle = "red";
        this.contextd2D.fillStyle = "red";
        const player_size = 8;
        this.drawSquare(
          player_pos.x - player_size / 2,
          player_pos.y - player_size / 2,
          player_size,
          player_size
        );

        // affichage de la direction du joueur
        const x_dir =
          player_pos.x + (Math.cos(game.player.angle) * this.tile_size) / 2;
        const y_dir =
          player_pos.y + (Math.sin(game.player.angle) * this.tile_size) / 2;
        this.drawLine(player_pos.x, player_pos.y, x_dir, y_dir);

        // affichage de l'angle
        this.contextd2D.fillStyle = "black";
        this.contextd2D.font = "16px Comic sans";
        this.contextd2D.fillText(
          (game.player.angle / degreToRadian + "").substr(0, 5),
          player_pos.x + 10,
          player_pos.y + 10
        );
    }


}
