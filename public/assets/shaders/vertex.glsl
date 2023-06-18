#version 300 es

in vec2 a_Position;
in vec3 a_Color;
out vec3 v_Color;

void main()
{
    gl_Position = vec4(a_Position, 0.0, 1.0);
    v_Color = a_Color;
}