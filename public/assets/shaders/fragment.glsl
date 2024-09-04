#version 300 es

precision mediump float;

#define MAX_PALETTE_COUNT 20
#define MAX_LINE_COUNT 50u

uniform uint palette[MAX_PALETTE_COUNT];
uniform uint palette_indexes[MAX_LINE_COUNT];

uniform vec2 resolution;

uniform sampler2D uSampler;

out vec4 out_color;


void main()
{
    out_color = vec4(1., 0., 1., 1.);
}