export enum Direction { //dans l'ordre trigonométrique
  RIGHT,
  DOWN,
  LEFT,
  UP,
}

export const opposite = (d: Direction) => (d + 2) % 4 as Direction;
