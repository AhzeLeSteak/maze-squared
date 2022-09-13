import {degreToRadian} from './utils';
import {Game} from './Game';
import {environment} from './main/environments/environment';

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

	update(): void {
		const speed = this.game.player.speed;
		if (this.RIGHT) {
			this.game.player.addAngle(degreToRadian * speed * 64);
		} else if (this.LEFT) {
			this.game.player.addAngle(-degreToRadian * speed * 64);
		}

		if (this.UP) {
			this.game.player.walk(this.game.map, true);
		} else if (this.DOWN) {
			this.game.player.walk(this.game.map, false);
		}
	}

	bindEvents(): void {
		const listener = (event: KeyboardEvent) => {
			const val = event.type === 'keydown';
			switch (event.code) {
				case 'KeyW':
					this.UP = val;
					break;
				case 'KeyS':
					this.DOWN = val;
					break;
				case 'KeyA':
					this.LEFT = val;
					break;
				case 'KeyD':
					this.RIGHT = val;
					break;
				case 'KeyA':
					this.STRAFE_LEFT = val;
					break;
				case 'KeyE':
					this.STRAFE_RIGHT = val;
					break;
			}
		};

		document.addEventListener('keydown', listener);
		document.addEventListener('keyup', listener);

		document.addEventListener('keypress', (event: KeyboardEvent) => {
			switch (event.key.toUpperCase()) {
				case 'W': // register player pos into local storage
					localStorage.setItem('player_pos', JSON.stringify(this.game.player.pos));
					localStorage.setItem('player_angle', JSON.stringify(this.game.player.angle));
					break;
				case 'X': // set player pos from local storage
					const player_pos = localStorage.getItem('player_pos');
					const player_angle = localStorage.getItem('player_angle');
					if (player_angle != null) {
						this.game.player.angle = JSON.parse(player_angle);
					}
					if (player_pos != null) {
						this.game.player.pos.x = JSON.parse(player_pos).x;
						this.game.player.pos.y = JSON.parse(player_pos).y;
					}
					break;
				case 'C':
					environment.draw3d = !environment.draw3d;
			}
		});
	}


}
