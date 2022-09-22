const pi = Math.PI;
const degreToRadian = pi / 180;
const two_pi = 2 * pi;
const pi_over_2 = pi / 2;
const pi_over_4 = pi / 4;
const correct_angle = (angle: number) => (angle + two_pi)%two_pi
export { correct_angle, degreToRadian, pi, two_pi, pi_over_2, pi_over_4 };
