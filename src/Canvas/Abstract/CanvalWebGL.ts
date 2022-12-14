import {Vector2} from '../../Vector2';
import {Canvas} from "./Canvas";

type Color = {r: number, g: number, b: number};

export abstract class CanvasWebGL extends Canvas{

	protected gl: WebGL2RenderingContext;
	private shaderProgram !: WebGLProgram;
	private color : Color = {r: 0, g: 0, b: 0};

	private lines = [] as number[];

	protected constructor(size: Vector2) {
		super(size);
		this.gl = this.canvas.getContext('webgl2')!;
		this.setupWebGl();
	}

	private setupWebGl(){
		const gl = this.gl;
		const vertexShaderSource =
			`#version 300 es

    in vec2 a_Position;
    in vec3 a_Color;
    out vec3 v_Color;

    void main()
    {
        gl_Position = vec4(a_Position, 0.0, 1.0);
        v_Color = a_Color;
    }`;

		const fragmentShaderSource =
			`#version 300 es

    precision mediump float;
    in vec3 v_Color;
    out vec4 fragColor;

    void main()
    {
        fragColor = vec4(v_Color, 1.0);
    }`;

		const vShader = gl.createShader(gl.VERTEX_SHADER);
		if(!vShader)
			throw new Error("Imposibble de créer le vertex shader");
		gl.shaderSource(vShader, vertexShaderSource);
		gl.compileShader(vShader);

		const fShader = gl.createShader(gl.FRAGMENT_SHADER);
		if(!fShader)
			throw new Error("Imposibble de créer le fragment shader");
		gl.shaderSource(fShader, fragmentShaderSource);
		gl.compileShader(fShader);

		const program = gl.createProgram();
		if(!program)
			throw new Error("Impossible de créer le program");
		this.shaderProgram = program;
		gl.attachShader(program, vShader);
		gl.attachShader(program, fShader);
		gl.linkProgram(program);
		gl.useProgram(program);

		gl.clearColor(1, 0, 0, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT);
	}

	private deviceToNormalised(point: number, horizontal: boolean){
		return horizontal
			? 2*point/this.canvas.width - 1
			: -2*point/this.canvas.height + 1;
	}

	protected drawHorizontalLine(x: number, y1: number, y2: number): void {
		x = this.deviceToNormalised(x, true);
		y1 = this.deviceToNormalised(y1, false);
		y2 = this.deviceToNormalised(y2, false);
		this.lines.push(
			// First line
			x, y1,               // Coordinate
			this.color.r, this.color.g, this.color.b,    // Color
			// Second line
			x, y2,               // Coordinate
			this.color.r, this.color.g, this.color.b,    // Color
		);
	}


	protected setColor(red: number, green: number, blue: number) {
		this.color.r = red;
		this.color.g = green;
		this.color.b = blue;
	}

	protected reset(): void {
		this.gl.clearColor(1, 1, 1, 1);
		this.lines = [];
	}

	protected finishDrawing(){
		this.finishLines();
		//this.finishRect();

		//332486
		//125238
	}

	private finishLines(){
		const gl = this.gl;
		const verticesAndColors = new Float32Array(this.lines);

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


		gl.drawArrays(gl.LINES, 0, verticesAndColors.length/5);
	}


}
