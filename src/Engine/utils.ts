const pi = Math.PI;
const degreToRadian = pi / 180;
const two_pi = 2 * pi;
const pi_over_2 = pi / 2;
const pi_over_4 = pi / 4;
const correct_angle = (angle: number) => (angle + two_pi)%two_pi
const angle_faces_left = (angle: number) => angle >= pi_over_2 && angle <= pi + pi_over_2;
const angle_faces_down = (angle: number) => angle <= pi;
export { correct_angle, angle_faces_down, angle_faces_left, degreToRadian, pi, two_pi, pi_over_2, pi_over_4 };
