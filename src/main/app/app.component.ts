import {AfterViewInit, Component} from '@angular/core';
import {environment} from '../environments/environment';
import {getAllTexture, textures} from '../../Texture/load_textures';
import {Game} from '../../Game';
// @ts-ignore
import Timeout = NodeJS.Timeout;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

	private interval!: Timeout;
	private fps = environment.fps;
	private game !: Game;
	public prod = environment.production

	ngAfterViewInit(): void {
		console.log('Waiting for textures to load');
		getAllTexture().then(() => {
			console.log('Textures loaded', textures);
			this.game = new Game();
			this.loop();
		});
	}

	loop(): void {
		this.interval = setTimeout(() => this.loop(), 1000 / this.fps)
		this.game.update();
		this.game.render();
	}

	stop(): void {
		clearTimeout(this.interval);
	}

}
