import {AfterViewInit, Component} from '@angular/core';
import {Game} from '../../Game';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

	private game!: Game;

	ngAfterViewInit(): void {
		this.game = new Game();
		this.game.init()
			.then(() => this.game.loop());

	}

}
