import {Game} from "@/Engine/Game";
import {Vector2} from "@/Engine/Vector2";
import {degreToRadian} from "@/Engine/utils";
import {Canvas2D} from "./Abstract/Canvas2D";
import {Teleporter, TP_TYPE_NAMES} from "@/Engine/Tiles/Teleporter";

export class CanvasTopView extends Canvas2D {

    private last_player_pos: Vector2;
    public tile_pos_hovered ?: Vector2;
    public draw_player = true;

    constructor(game: Game, public readonly tile_size: number, canvas ?: HTMLCanvasElement) {
        super({
            x: game.map.size.y * tile_size,
            y: game.map.size.y * tile_size,
        }, canvas);
        this.last_player_pos = { x: Infinity, y: Infinity };
    }

    drawContext(game: Game): void {
        this.reset();
        const tile_size = this.tile_size;

        this.contextd2D.strokeStyle = "black";
        this.contextd2D.font = Math.floor(tile_size * 0.3) + "px Comic sans";

        // affichage de la map
        const map = game.map;
        for (let y = 0; y < map.size.y; y++) {
            for (let x = 0; x < map.size.x; x++) {
                const tile = map.tile(x, y, false);
                if (tile.tile_type === "base") {
                    this.contextd2D.fillStyle = ["grey", "black"][tile.solid] ?? "yellow";
                    this.drawSquare(
                        x * tile_size + 1,
                        y * tile_size + 1,
                        tile_size - 2,
                        tile_size - 2
                    );
                } else if (tile.tile_type === "teleporter") {
                    const tp = tile as Teleporter;
                    const img = document.getElementById(TP_TYPE_NAMES[tp.teleporter_type]) as CanvasImageSource;
                    if (!img) continue;
                    this.contextd2D.drawImage(img,
                        0, 0, 16, 16,
                        x * tile_size + 1,
                        y * tile_size + 1,
                        tile_size - 2,
                        tile_size - 2);
                    this.contextd2D.fillStyle = 'rgba(208,17,17,0.42)'
                    if(tp.rotation)
                    this.drawSquare(
                        x * tile_size + 1,
                        y * tile_size + 1,
                        tile_size - 2,
                        tile_size - 2)
                }
            }
        }

        if(this.draw_player) {
            const player_pos: Vector2 = { ...game.player.pos };


            //affichage du rayon face au joueur
            const { v, distance } = game.map.getNextWall(player_pos, game.player.angle);
            this.contextd2D.fillStyle = "red";
            this.drawLine(player_pos.x * tile_size, player_pos.y * tile_size, v.x * tile_size, v.y * tile_size);
            const tile = game.map.getTileFromSideCoords(v, game.player.angle);
            const tile_coords = game.map.getCoordsOfTile(tile);
            this.drawSquare(tile_coords.x * tile_size, tile_coords.y * tile_size, tile_size, tile_size);
            this.contextd2D.fillStyle = "darkblue";
            this.contextd2D.fillText(distance.toString().substring(0, 4), (player_pos.x + v.x)*tile_size/2, (player_pos.y + v.y)*tile_size/2)


            //affichage du champ de vision
            for (let i = -game.view_angle / 2; i < game.view_angle / 2; i++) {
                for (let j = 0; j < 1; j++) {
                    const angle = game.player.angle + (i + j / 2) * degreToRadian;
                    const nextWall = map.getNextWall(game.player.pos, angle);
                    nextWall.orientation === "horizontal"
                        ? this.setColor(55, 200, 40)
                        : this.setColor(50, 85, 255);
                    this.drawLine(
                        player_pos.x * tile_size,
                        player_pos.y * tile_size,
                        nextWall.v.x * tile_size,
                        nextWall.v.y * tile_size
                    );

                }
            }


            //surbrillance de la case où se situe le joueur
            let x = Math.floor(game.player.pos.x) * tile_size;
            let y = Math.floor(game.player.pos.y) * tile_size;

            this.contextd2D.fillStyle = "rgba(100, 250, 100, 0.4)";
            this.drawSquare(x + 1, y + 1, tile_size - 2, tile_size - 2);



            // affichage du joueur
            this.contextd2D.strokeStyle = "red";
            this.contextd2D.fillStyle = "red";
            const player_size = 8;
            this.drawSquare(
                player_pos.x*tile_size - player_size / 2,
                player_pos.y*tile_size - player_size / 2,
                player_size,
                player_size
            );


            // affichage de l'angle
            this.contextd2D.fillStyle = "black";
            this.contextd2D.font = "16px Comic sans";
            this.contextd2D.fillText(
                (game.player.angle / degreToRadian + "").substr(0, 5),
                player_pos.x + 10,
                player_pos.y + 10
            );
        }


        //surbrillance de la case où se situe le curseur
        if(this.tile_pos_hovered) {
            const x = Math.floor(this.tile_pos_hovered.x)*tile_size;
            const y = Math.floor(this.tile_pos_hovered.y)*tile_size;

            this.contextd2D.fillStyle = "rgba(100,192,250,0.4)";
            this.drawSquare(x + 1, y + 1, tile_size - 2, tile_size - 2);
        }

    }


}
