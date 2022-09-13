import {Game} from '../Game';
import {Pixel, Texture} from '../Texture/Texture';
import {Canvas2D} from "./Abstract/Canvas2D";

export class CanvasImage extends Canvas2D {


	constructor(image: HTMLImageElement) {
		super({x: image.width, y: image.height});
		this.contextd2D.drawImage(image, 0, 0);
	}

	getTexture(): Texture {
		const rgbToHex = (rgb: number) => {
			let hex = Number(rgb).toString(16);
			if (hex.length < 2) {
				hex = '0' + hex;
			}
			return hex;
		};

		const array: Array<Pixel> = [];
		for (let y = 0; y < this.size.y; y++) {
			for (let x = 0; x < this.size.x; x++) {
				const data = this.contextd2D.getImageData(x, y, 1, 1).data;
				// array.push(`#${rgbToHex(data[0])}${rgbToHex(data[1])}${rgbToHex(data[2])} `);
				array.push({
					r: data[0],
					g: data[1],
					b: data[2],
				});
			}
		}
		return new Texture(array, {...this.size});
	}

	delete(): void {
		this.canvas.remove();
	}

	drawContext(context: Game): void {
	}

}
