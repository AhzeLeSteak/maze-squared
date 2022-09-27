import { Vector2 } from "../../Engine/Geometry/Vector2";
import { Canvas } from "./Canvas";

type Color = { r: number; g: number; b: number };

export abstract class CanvasWebGL extends Canvas {
  protected gl: WebGL2RenderingContext;
  private shaderProgram!: WebGLProgram;
  private color: Color = { r: 0, g: 0, b: 0 };

  private lines_vertex = [] as number[];
  private triangle_vertex = [] as number[];

  protected constructor(size: Vector2, canvas: HTMLCanvasElement) {
    super(size, canvas);
    this.gl = this.canvas.getContext("webgl2")!;
    this.setupWebGl();
    this.reset();
  }

  private setupWebGl() {
    const gl = this.gl;
    const vertexShaderSource = `#version 300 es

    in vec2 a_Position;
    in vec3 a_Color;
    out vec3 v_Color;

    void main()
    {
        gl_Position = vec4(a_Position, 0.0, 1.0);
        v_Color = a_Color;
    }`;

    const fragmentShaderSource = `#version 300 es

    precision mediump float;
    in vec3 v_Color;
    out vec4 fragColor;

    void main()
    {
        fragColor = vec4(v_Color, 1.0);
    }`;

    const vShader = gl.createShader(gl.VERTEX_SHADER);
    if (!vShader) throw new Error("Imposibble de créer le vertex shader");
    gl.shaderSource(vShader, vertexShaderSource);
    gl.compileShader(vShader);

    const fShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fShader) throw new Error("Imposibble de créer le fragment shader");
    gl.shaderSource(fShader, fragmentShaderSource);
    gl.compileShader(fShader);

    const program = gl.createProgram();
    if (!program) throw new Error("Impossible de créer le program");
    this.shaderProgram = program;
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);
    gl.useProgram(program);
  }

  private deviceToNormalised(point: number, horizontal: boolean) {
    return horizontal
      ? (2 * point) / this.canvas.width - 1
      : (-2 * point) / this.canvas.height + 1;
  }

  protected setColor(red: number, green: number, blue: number) {
    this.color.r = red;
    this.color.g = green;
    this.color.b = blue;
  }

  protected drawHorizontalLine(x: number, y1: number, y2: number): void {
    x = this.deviceToNormalised(x, true);
    y1 = this.deviceToNormalised(y1, false);
    y2 = this.deviceToNormalised(y2, false);
    this.lines_vertex.push(
      // First line
      x,
      y1, // Coordinate
      this.color.r,
      this.color.g,
      this.color.b, // Color
      // Second line
      x,
      y2, // Coordinate
      this.color.r,
      this.color.g,
      this.color.b // Color
    );
  }

  protected drawRectangle(
    x: number,
    y: number,
    width: number,
    height: number
  ): void {
    const xLeft = this.deviceToNormalised(x, true);
    const xRight = this.deviceToNormalised(x + width, true);
    const yUp = this.deviceToNormalised(y, false);
    const yDown = this.deviceToNormalised(y + height, false);
    this.triangle_vertex.push(
      //triangle 1
      //vertex 1
      xLeft,
      yUp,
      this.color.r,
      this.color.g,
      this.color.b,
      //vertex 2
      xRight,
      yUp,
      this.color.r,
      this.color.g,
      this.color.b,
      //vertex 3
      xLeft,
      yDown,
      this.color.r,
      this.color.g,
      this.color.b,
      //triangle 2
      //vertex 1
      xRight,
      yUp,
      this.color.r,
      this.color.g,
      this.color.b,
      //vertex 2
      xLeft,
      yDown,
      this.color.r,
      this.color.g,
      this.color.b,
      //vertex 3
      xRight,
      yDown,
      this.color.r,
      this.color.g,
      this.color.b
    );
  }

  protected reset(): void {
    this.gl.clearColor(1, 1, 1, 1);
    this.lines_vertex = [];
    this.triangle_vertex = [];
  }

  protected finishDrawing() {
    this.finishLines();
    this.finishRect();

    //console.log(this.triangle_vertex.length)

    //332486
    //125238
  }

  private finishLines() {
    if (this.lines_vertex.length === 0) return;
    const gl = this.gl;
    const verticesAndColors = new Float32Array(this.lines_vertex);

    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, verticesAndColors, gl.STATIC_DRAW);

    const FSIZE = verticesAndColors.BYTES_PER_ELEMENT;

    const a_Position = gl.getAttribLocation(this.shaderProgram, "a_Position");
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 5 * FSIZE, 0);
    gl.enableVertexAttribArray(a_Position);

    const a_Color = gl.getAttribLocation(this.shaderProgram, "a_Color");
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 5 * FSIZE, 2 * FSIZE);
    gl.enableVertexAttribArray(a_Color);

    gl.drawArrays(gl.LINES, 0, verticesAndColors.length / 5);
  }

  private finishRect() {
    if (this.triangle_vertex.length === 0) return;
    const gl = this.gl;
    const verticesAndColors = new Float32Array(this.triangle_vertex);

    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, verticesAndColors, gl.STATIC_DRAW);

    const FSIZE = verticesAndColors.BYTES_PER_ELEMENT;

    const a_Position = gl.getAttribLocation(this.shaderProgram, "a_Position");
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 5 * FSIZE, 0);
    gl.enableVertexAttribArray(a_Position);

    const a_Color = gl.getAttribLocation(this.shaderProgram, "a_Color");
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 5 * FSIZE, 2 * FSIZE);
    gl.enableVertexAttribArray(a_Color);

    gl.drawArrays(gl.TRIANGLES, 0, verticesAndColors.length / 5);
  }
}
