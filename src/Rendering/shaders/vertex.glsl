precision mediump float;

uniform int offset;
uniform int col_group;
uniform vec2 resolution;

attribute float vertexId;

void main() {
    float left = 2.0 * resolution.x / float(offset) - 1.0;
    float right = 2.0 * resolution.x / float(offset + col_group) - 1.0;

    if (vertexId == 0.0)
    gl_Position = vec4(right, 1, 0, 1);
    if (vertexId == 1.0)
    gl_Position = vec4(left, 1, 0, 1);
    if (vertexId == 2.0)
    gl_Position = vec4(left, -1, 0, 1);
    if (vertexId == 3.0)
    gl_Position = vec4(right, -1, 0, 1);
}
