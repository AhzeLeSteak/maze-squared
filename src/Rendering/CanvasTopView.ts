import { Game } from "@/Engine/Game";
import { Vector2 } from "@/Engine/Vector2";
import { degreToRadian } from "@/Engine/utils";
import { LevelEditor } from "./LevelEditor";
import { Canvas2D } from "./Abstract/Canvas2D";

export class CanvasTopView extends Canvas2D {
    private lvl_editor: LevelEditor;
    private last_player_pos: Vector2;


    constructor(game: Game, public readonly tile_size: number, canvas ?: HTMLCanvasElement) {
        super({
            x: game.map.size.y * tile_size,
            y: game.map.size.y * tile_size,
        }, canvas);
        this.lvl_editor = new LevelEditor(this.canvas, this.tile_size, game);
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
                const box_type = map.box(x, y);
                switch (box_type) {
                    case 0:
                        this.contextd2D.fillStyle = "grey";
                        break;
                    case 1:
                        this.contextd2D.fillStyle = "black";
                        break;
                    default:
                        this.contextd2D.fillStyle = "yellow";
                }
                this.drawSquare(
                    x * this.tile_size + 1,
                    y * this.tile_size + 1,
                    this.tile_size - 2,
                    this.tile_size - 2
                );
                if (box_type > 1) {
                    this.contextd2D.strokeText(
                        "" + (box_type - 1),
                        (x + 0.45) * this.tile_size,
                        (y + 0.6) * this.tile_size
                    );
                }
            }
        }

        const player_pos: Vector2 = { ...game.player.pos };

        const trunced_pos = {
            x: Math.floor(player_pos.x),
            y: Math.floor(player_pos.y),
        };

        if (
            trunced_pos.x !== this.last_player_pos.x &&
            trunced_pos.y !== this.last_player_pos.y &&
            game.map.box(trunced_pos.x, trunced_pos.y) > 1
        ) {
            this.last_player_pos = trunced_pos;
            console.warn("Player standing on teleporter ", player_pos);
        }

        player_pos.x *= this.tile_size;
        player_pos.y *= this.tile_size;

        const x = Math.floor(game.player.pos.x) * this.tile_size;
        const y = Math.floor(game.player.pos.y) * this.tile_size;

        this.contextd2D.fillStyle = "rgba(100, 250, 100, 0.4)";
        this.drawSquare(x + 1, y + 1, this.tile_size - 2, this.tile_size - 2);

        // affichage des rayons
        for (let i = -game.view_angle / 2; i < game.view_angle / 2; i++) {
            for (let j = 0; j < 1; j++) {
                const angle = game.player.angle + (i + j / 2) * degreToRadian;
                const nextWall = map.getNextPoint(game.player.pos, angle);
                nextWall.from === "HORIZONTAL"
                    ? this.setColor(55, 200, 40)
                    : this.setColor(50, 85, 255);
                /*this.drawLine(player_pos.x, player_pos.y,
                  nextWall.point.x * this.tile_size, nextWall.point.y * this.tile_size);*/
                this.setColor(255, 250, 500);
                for (const v of nextWall.pointsToDraw) {
                    this.drawSquare(
                        v.x * this.tile_size - 2,
                        v.y * this.tile_size - 2,
                        4,
                        4
                    );
                }
                for (let s_i = 1; s_i < nextWall.pointsToDraw.length; s_i++) {
                    const p0 = nextWall.pointsToDraw[s_i - 1];
                    const p1 = nextWall.pointsToDraw[s_i];
                    if (nextWall.pointBreak.includes(s_i)) {
                        continue;
                    }
                    for (let a = 0; a < 4; a++) {
                        this.drawLine(
                            p0.x * this.tile_size,
                            p0.y * this.tile_size,
                            p1.x * this.tile_size,
                            p1.y * this.tile_size
                        );
                        this.drawLine(
                            p0.x * this.tile_size + a,
                            p0.y * this.tile_size + a,
                            p1.x * this.tile_size + a,
                            p1.y * this.tile_size + a
                        );
                    }
                }
            }
        }

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
