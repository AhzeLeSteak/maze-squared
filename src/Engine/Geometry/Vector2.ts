export type Vector2 = {
  x: number;
  y: number;
};

export type Lines = Array<Vector2 & { new_line?: boolean }>

export const infinite: Vector2 = {
  x: Infinity,
  y: Infinity
};

export const distance_vectors = (v1: Vector2, v2: Vector2): number => Math.sqrt(
  (v1.x - v2.x) * (v1.x - v2.x) + (v1.y - v2.y) * (v1.y - v2.y)
);

