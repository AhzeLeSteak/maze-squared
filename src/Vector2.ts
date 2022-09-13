type Vector2 = {
	x: number;
	y: number;
};

const infinite: Vector2 = {
	x: Infinity,
	y: Infinity
};

function distance(v1: Vector2, v2: Vector2): number {
	return Math.sqrt((v1.x - v2.x) * (v1.x - v2.x) + (v1.y - v2.y) * (v1.y - v2.y));
}

export {
	Vector2,
	infinite,
	distance
};
