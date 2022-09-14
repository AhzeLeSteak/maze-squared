import {CanvasImage} from '../Canvas/CanvasImage';
import {Texture} from './Texture';


const textures = new Map<string, Texture>();

function getAllTexture() {

	const textures_path = [
		'wall.png',
		'wall_2.png',
		'floor.png',
	];

	const texture_name = (texture_path: string) => {
		const s1 = texture_path.split('/');
		return s1[s1.length - 1].split('.')[0];
	}


	const promises: Array<Promise<void>> = [];

	textures_path.forEach((path) => {
		const image = new Image();
		image.src = `assets/${path}`;

		promises.push(new Promise(resolve => {
			image.addEventListener('load', () => {
				const canvas = new CanvasImage(image);
				textures.set(texture_name(path), canvas.getTexture());
				canvas.delete();
				resolve();
			});
		}));

	});

	return Promise.all(promises);
}

export {
	textures,
	getAllTexture
};
