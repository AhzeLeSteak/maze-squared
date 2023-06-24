precision mediump float;

#define MAX_PALETTE_COUNT 100
#define MAX_LINE_COUNT 420

uniform vec3 palette[MAX_PALETTE_COUNT];
uniform int palette_indexes[MAX_LINE_COUNT];
uniform int line_heights[MAX_LINE_COUNT];

uniform hihgp int offset;
uniform hihgp int col_group;
uniform vec2 resolution;

void main()
{
    vec2 pixel_pos = gl_FragCoord.xy - vec2(0.5, 0.5);
    pixel_pos.y = resolution.y - pixel_pos.y;
    float f_pixel_index = (pixel_pos.x - float(offset)) * resolution.y + pixel_pos.y;

    int pixel_index = int(f_pixel_index);
    if (pixel_index < 0 || pixel_index > (col_group * int(resolution.y))) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        return;
    }

    int acc = 0;
    int palette_index = 0;

    for (int i = 0; i < MAX_LINE_COUNT; i++) {
        if (pixel_index <= acc - 1) {
            palette_index = palette_indexes[i - 1];
            break;
        }
        acc += line_heights[i];
    }
    for (int i = 0; i < MAX_PALETTE_COUNT; i++) {
        if (i == palette_index) {
            gl_FragColor = vec4(palette[i].x, palette[i].y, palette[i].z, 1.0);
            return;
        }
    }
}



