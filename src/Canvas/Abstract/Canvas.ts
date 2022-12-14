import {Vector2} from '../../Vector2';
import {Game} from '../../Game';

export abstract class Canvas {

	private static id = 0;
	protected canvas: HTMLCanvasElement;

	protected constructor(public size: Vector2) {
		this.canvas = this.createCanvas();
		this.size.x = Math.floor(this.size.x);
		this.size.y = Math.floor(this.size.y);
	}

	public abstract drawContext(context: Game): void;
	protected abstract reset(): void;


	private createCanvas(): HTMLCanvasElement {
		const id = 'canvas_' + Canvas.id++;
		const canvasElement = document.createElement('canvas');
		canvasElement.setAttribute('id', id);
		canvasElement.setAttribute('width', this.size.x + '');
		canvasElement.setAttribute('height', this.size.y + '');
		canvasElement.setAttribute('style', 'border: 3px solid black');
		(document.getElementById('canvasContainer') as HTMLElement).appendChild(canvasElement);
		return canvasElement;
	}

}
