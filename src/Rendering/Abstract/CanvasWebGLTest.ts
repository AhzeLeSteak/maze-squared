import { Vector2 } from "@/Engine/Geometry/Vector2";
import { Canvas } from "./Canvas";
import { vertexShader } from "@/Rendering/shaders/vertex";
import { fragmentShader } from "@/Rendering/shaders/fragment";
import { Color, distance } from "@/Engine/Texture/Texture";


export abstract class CanvasWebGLTest extends Canvas {

  protected gl: WebGL2RenderingContext;
  private shaderProgram!: WebGLProgram;

  private palette: Color[] = [];
  private palette_indexes: number[] = [];
  private line_heights: number[] = [];
  private offset = 0;
  private col_group = 6;
  private total_height = 0;

  private uniform_locations = {
    palette: 0,
    palette_indexes: 4,
    line_heights: 0,
    resolution: 0,
    offset: 0,
    col_group: 0
  };

  private attrib_locations = {
    vertexId: 0
  };

  private color: Color = { r: 0, g: 0, b: 0 };


  protected constructor(size: Vector2, canvas: HTMLCanvasElement) {
    super(size, canvas);
    this.gl = this.canvas.getContext("webgl2")!;
    this.reset();
    this.create_program();
  }

  public newColumn() {
    const height_of_col = this.total_height % this.size.y;
    if (height_of_col > 0) {
      const to_add = this.size.y - height_of_col;
      this.total_height += to_add;
      this.line_heights[this.line_heights.length - 1] += to_add;
      this.checkForEndOfColgroup();
    }
  }

  protected setColor(red: number, green: number, blue: number) {
    this.color.r = red;
    this.color.g = green;
    this.color.b = blue;
  }


  protected drawHorizontalLine(length: number): void {
    this.total_height += length;
    let palette_id = this.palette.findIndex(c => distance(c, this.color) < 10);

    //if last draw was same color, juste add length to last length
    if (this.palette_indexes.length && this.palette_indexes[this.palette_indexes.length - 1] === palette_id) {
      this.line_heights[this.line_heights.length - 1] += length;
      return this.checkForEndOfColgroup();
    }
    this.line_heights.push(length);
    if (palette_id < 0) {
      palette_id = this.palette.length;
      this.palette.push({ r: this.color.r, g: this.color.g, b: this.color.b });
    }
    this.palette_indexes.push(palette_id);

    this.checkForEndOfColgroup();
  }

  protected reset(mid_drawing = false): void {
    this.line_heights = [];
    this.palette_indexes = [];
    this.total_height = 0;
    if (!mid_drawing) {
      this.palette = [];
      this.offset = 0;
    }
  }

  protected finishDrawing() {
    if (this.line_heights.length === 0) return;
    const gl = this.gl;

    gl.uniform3fv(this.uniform_locations.palette, this.palette.flatMap(c => [c.r, c.g, c.b]));
    gl.uniform1iv(this.uniform_locations.palette_indexes, this.palette_indexes);
    gl.uniform1iv(this.uniform_locations.line_heights, this.line_heights);
    gl.uniform1i(this.uniform_locations.offset, this.offset);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    //gl.drawArrays(gl.LINES, 0, verticesAndColors.length / 5);
  }

  private create_program() {
    const gl = this.gl;
    if (!this.gl)
      throw new Error("WebGL environment could not be created");
    const vShader = gl.createShader(gl.VERTEX_SHADER);
    if (!vShader) throw new Error("Imposibble de créer le vertex shader");
    gl.shaderSource(vShader, vertexShader);
    gl.compileShader(vShader);

    const fShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fShader) throw new Error("Imposibble de créer le fragment shader");
    gl.shaderSource(fShader, fragmentShader);
    gl.compileShader(fShader);

    const program = gl.createProgram();
    if (!program) throw new Error("Impossible de créer le programe");
    this.shaderProgram = program;
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    console.log(gl.getProgramInfoLog(this.shaderProgram));
    [vShader, fShader]
      .map(s => gl.getShaderInfoLog(s))
      .filter(str => str)
      .forEach(console.log);

    for (const index_name in this.uniform_locations) {
      // @ts-ignore
      this.uniform_locations[index_name] = gl.getUniformLocation(this.shaderProgram, index_name) as number;
    }
    for (const index_name in this.attrib_locations) {
      // @ts-ignore
      this.attrib_locations[index_name] = gl.getAttribLocation(this.shaderProgram, index_name) as number;
    }
    console.log(this.uniform_locations);
    console.log(this.attrib_locations);

    //passing resolution data
    gl.uniform2f(this.uniform_locations.resolution, this.size.x, this.size.y);
    gl.uniform1i(this.uniform_locations.col_group, this.col_group);

    const numVerts = 4;
    const vertexIds = new Float32Array(numVerts);
    vertexIds.forEach((v, i) => {
      vertexIds[i] = i;
    });

    const idBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, idBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexIds, gl.STATIC_DRAW);

    // Turn on the attribute
    gl.enableVertexAttribArray(this.attrib_locations.vertexId);

    // Bind the id buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, idBuffer);

    gl.vertexAttribPointer(this.attrib_locations.vertexId, 1, gl.FLOAT, false, 0, 0);
  }

  private checkForEndOfColgroup() {
    if (this.total_height >= this.size.y * this.col_group) {
      this.finishDrawing();
      this.offset += this.col_group;
      this.reset(true);
    }
  }

  private checkIntegrity() {
    let acc = 0;
    let column_index = 0;
    let index_start_of_col = 0;
    for (let i = 0; i < this.line_heights.length; i++) {
      acc += this.line_heights[i];
      if (acc === this.size.y) {
        acc = 0;
        column_index++;
        index_start_of_col = i + 1;
      } else if (acc > this.size.y) {
        console.log(this.line_heights.slice(index_start_of_col, i));
        throw new Error(`Column ${column_index} not cool`);
      }
    }
  }

}
