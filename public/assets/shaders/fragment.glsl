#version 300 es

precision mediump float;

#define MAX_PALETTE_COUNT 20
#define MAX_LINE_COUNT 500u

uniform uint palette[MAX_PALETTE_COUNT];
uniform uint palette_indexes[MAX_LINE_COUNT];
uniform uint line_heights[MAX_LINE_COUNT];

uniform highp uint offset;
uniform highp uint col_group;
uniform vec2 resolution;

out vec4 out_color;

uint mask(uint value, uint pos){
    return (value >> (pos * 8u)) & 255u;
}

void main()
{

    vec2 pixel_pos = gl_FragCoord.xy - vec2(0.5, 0.5);
    pixel_pos.y = resolution.y - pixel_pos.y;
    float f_pixel_index = (pixel_pos.x - float(offset)) * resolution.y + pixel_pos.y;

    uint pixel_index = uint(f_pixel_index);
    if(pixel_index < 0u || pixel_index + 1u > (col_group * uint(resolution.y)) ){
        out_color = vec4(0.0, 0.0, 0.0, 0.0);
        return;
    }

    uint acc = 0u;
    uint palette_index = 0u;
    int exit = 0;

    for(uint i = 0u; i < MAX_LINE_COUNT && exit == 0; i++){
        for(uint j = 0u; j < 4u && exit == 0; j++){
            if(acc >= pixel_index + 1u){
                palette_index = palette_indexes[i*4u + j - 1u];
                exit = 1;
            }
            else
                acc += mask(line_heights[i], 3u-j);
        }
    }
    
    uint color = palette[palette_index];
    float red = float(color >> 24u & 15u) / 15.;
    float green = float(color >> 16u & 15u) / 15.;
    float blue = float(color >> 8u & 15u) / 15.;
    float alpha = float(color >> 0u & 15u) / 15.;
    if(alpha < 0.1)
        out_color = vec4(0., 1., 1., 1.);
    else
        out_color = vec4(red, green, blue, alpha);
}