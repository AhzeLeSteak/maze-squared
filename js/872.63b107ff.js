(self["webpackChunkmaze_squared"]=self["webpackChunkmaze_squared"]||[]).push([[872],{3013:function(t){t.exports="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof DataView},260:function(t,e,i){"use strict";var o,r,n,s=i(3013),a=i(9781),h=i(7854),l=i(614),c=i(111),f=i(2597),u=i(648),p=i(6330),d=i(8880),g=i(8052),_=i(3070).f,y=i(7976),x=i(9518),m=i(7674),v=i(5112),A=i(9711),w=i(9909),T=w.enforce,b=w.get,C=h.Int8Array,E=C&&C.prototype,I=h.Uint8ClampedArray,z=I&&I.prototype,M=C&&x(C),F=E&&x(E),P=Object.prototype,L=h.TypeError,R=v("toStringTag"),O=A("TYPED_ARRAY_TAG"),D="TypedArrayConstructor",U=s&&!!m&&"Opera"!==u(h.opera),S=!1,N={Int8Array:1,Uint8Array:1,Uint8ClampedArray:1,Int16Array:2,Uint16Array:2,Int32Array:4,Uint32Array:4,Float32Array:4,Float64Array:8},Z={BigInt64Array:8,BigUint64Array:8},k=function(t){if(!c(t))return!1;var e=u(t);return"DataView"===e||f(N,e)||f(Z,e)},B=function(t){var e=x(t);if(c(e)){var i=b(e);return i&&f(i,D)?i[D]:B(e)}},X=function(t){if(!c(t))return!1;var e=u(t);return f(N,e)||f(Z,e)},V=function(t){if(X(t))return t;throw L("Target is not a typed array")},Y=function(t){if(l(t)&&(!m||y(M,t)))return t;throw L(p(t)+" is not a typed array constructor")},H=function(t,e,i,o){if(a){if(i)for(var r in N){var n=h[r];if(n&&f(n.prototype,t))try{delete n.prototype[t]}catch(s){try{n.prototype[t]=e}catch(l){}}}F[t]&&!i||g(F,t,i?e:U&&E[t]||e,o)}},G=function(t,e,i){var o,r;if(a){if(m){if(i)for(o in N)if(r=h[o],r&&f(r,t))try{delete r[t]}catch(n){}if(M[t]&&!i)return;try{return g(M,t,i?e:U&&M[t]||e)}catch(n){}}for(o in N)r=h[o],!r||r[t]&&!i||g(r,t,e)}};for(o in N)r=h[o],n=r&&r.prototype,n?T(n)[D]=r:U=!1;for(o in Z)r=h[o],n=r&&r.prototype,n&&(T(n)[D]=r);if((!U||!l(M)||M===Function.prototype)&&(M=function(){throw L("Incorrect invocation")},U))for(o in N)h[o]&&m(h[o],M);if((!U||!F||F===P)&&(F=M.prototype,U))for(o in N)h[o]&&m(h[o].prototype,F);if(U&&x(z)!==F&&m(z,F),a&&!f(F,R))for(o in S=!0,_(F,R,{get:function(){return c(this)?this[O]:void 0}}),N)h[o]&&d(h[o],O,o);t.exports={NATIVE_ARRAY_BUFFER_VIEWS:U,TYPED_ARRAY_TAG:S&&O,aTypedArray:V,aTypedArrayConstructor:Y,exportTypedArrayMethod:H,exportTypedArrayStaticMethod:G,getTypedArrayConstructor:B,isView:k,isTypedArray:X,TypedArray:M,TypedArrayPrototype:F}},9671:function(t,e,i){var o=i(9974),r=i(8361),n=i(7908),s=i(6244),a=function(t){var e=1==t;return function(i,a,h){var l,c,f=n(i),u=r(f),p=o(a,h),d=s(u);while(d-- >0)if(l=u[d],c=p(l,d,f),c)switch(t){case 0:return l;case 1:return d}return e?-1:void 0}};t.exports={findLast:a(0),findLastIndex:a(1)}},8544:function(t,e,i){var o=i(7293);t.exports=!o((function(){function t(){}return t.prototype.constructor=null,Object.getPrototypeOf(new t)!==t.prototype}))},9974:function(t,e,i){var o=i(1702),r=i(9662),n=i(4374),s=o(o.bind);t.exports=function(t,e){return r(t),void 0===e?t:n?s(t,e):function(){return t.apply(e,arguments)}}},9518:function(t,e,i){var o=i(2597),r=i(614),n=i(7908),s=i(6200),a=i(8544),h=s("IE_PROTO"),l=Object,c=l.prototype;t.exports=a?l.getPrototypeOf:function(t){var e=n(t);if(o(e,h))return e[h];var i=e.constructor;return r(i)&&e instanceof i?i.prototype:e instanceof l?c:null}},8675:function(t,e,i){"use strict";var o=i(260),r=i(6244),n=i(9303),s=o.aTypedArray,a=o.exportTypedArrayMethod;a("at",(function(t){var e=s(this),i=r(e),o=n(t),a=o>=0?o:i+o;return a<0||a>=i?void 0:e[a]}))},4590:function(t,e,i){"use strict";var o=i(260),r=i(9671).findLastIndex,n=o.aTypedArray,s=o.exportTypedArrayMethod;s("findLastIndex",(function(t){return r(n(this),t,arguments.length>1?arguments[1]:void 0)}))},3408:function(t,e,i){"use strict";var o=i(260),r=i(9671).findLast,n=o.aTypedArray,s=o.exportTypedArrayMethod;s("findLast",(function(t){return r(n(this),t,arguments.length>1?arguments[1]:void 0)}))},872:function(t,e,i){"use strict";i.r(e),i.d(e,{default:function(){return E}});var o=i(3396);const r={id:"canvas-container"},n=(0,o._)("canvas",{id:"play-canvas",class:"centered"},null,-1),s=[n];function a(t,e,i,n,a,h){return(0,o.wg)(),(0,o.iD)("div",r,s)}var h=i(2482),l=i(7248),c=i(3127),f=i(1310),u=i(6909);const p=(t,e)=>Math.sqrt((t.x-e.x)*(t.x-e.x)+(t.y-e.y)*(t.y-e.y));i(7658),i(1703),i(8675),i(3408),i(4590);var d=i(912);const g="\n\nprecision mediump float;\n\nuniform int offset;\nuniform int col_group;\nuniform vec2 resolution;\n\nattribute float vertexId;\n\nvoid main() {\n    float left  = 2.0 * float(offset) / resolution.x - 1.0;\n    float right = 2.0 * float(offset + col_group) / resolution.x - 1.0;\n\n    if(vertexId == 0.0)\n        gl_Position = vec4(right, 1, 0, 1);\n    if(vertexId == 1.0)\n        gl_Position = vec4(left, 1, 0, 1);\n    if(vertexId == 2.0)\n        gl_Position = vec4(left, -1, 0, 1);\n    if(vertexId == 3.0)\n        gl_Position = vec4(right, -1, 0, 1);\n}\n\n",_="\n\nprecision mediump float;\n\n#define MAX_PALETTE_COUNT 20\n#define MAX_LINE_COUNT 300\n\nuniform vec3 palette[MAX_PALETTE_COUNT];\nuniform int palette_indexes[MAX_LINE_COUNT];\nuniform int line_heights[MAX_LINE_COUNT];\n\nuniform highp int offset;\nuniform highp int col_group;\nuniform vec2 resolution;\n\nvoid main()\n{\n    vec2 pixel_pos = gl_FragCoord.xy - vec2(0.5, 0.5);\n    pixel_pos.y = resolution.y - pixel_pos.y;\n    float f_pixel_index = (pixel_pos.x - float(offset)) * resolution.y + pixel_pos.y;\n\n    int pixel_index = int(f_pixel_index);\n    if(pixel_index < 0 || pixel_index > (col_group * int(resolution.y)) ){\n        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);\n        return;\n    }\n\n    int acc = 0;\n    int palette_index = 0;\n\n    for(int i = 0; i < MAX_LINE_COUNT; i++){\n        if(pixel_index <= acc-1){\n            palette_index = palette_indexes[i-1];\n            break;\n        }\n        acc += line_heights[i];\n    }\n    for(int i = 0; i < MAX_PALETTE_COUNT; i++){\n        if(i == palette_index){\n            gl_FragColor = vec4(palette[i].x, palette[i].y, palette[i].z, 1.0);\n            return;\n        }\n    }\n}\n\n\n\n";class y extends d.X{constructor(t,e){super(t,e),(0,h.Z)(this,"gl",void 0),(0,h.Z)(this,"shaderProgram",void 0),(0,h.Z)(this,"palette",[]),(0,h.Z)(this,"palette_indexes",[]),(0,h.Z)(this,"line_heights",[]),(0,h.Z)(this,"offset",0),(0,h.Z)(this,"col_group",6),(0,h.Z)(this,"total_height",0),(0,h.Z)(this,"uniform_locations",{palette:0,palette_indexes:4,line_heights:0,resolution:0,offset:0,col_group:0}),(0,h.Z)(this,"attrib_locations",{vertexId:0}),(0,h.Z)(this,"color",{r:0,g:0,b:0}),this.gl=this.canvas.getContext("webgl2"),this.reset(),this.create_program()}newColumn(){const t=this.total_height%this.size.y;if(t>0){const e=this.size.y-t;this.total_height+=e,this.line_heights[this.line_heights.length-1]+=e,this.checkForEndOfColgroup()}}setColor(t,e,i){this.color.r=t,this.color.g=e,this.color.b=i}drawHorizontalLine(t){this.total_height+=t;let e=this.palette.findIndex((t=>(0,f.T)(t,this.color)<10));if(this.palette_indexes.length&&this.palette_indexes[this.palette_indexes.length-1]===e)return this.line_heights[this.line_heights.length-1]+=t,this.checkForEndOfColgroup();this.line_heights.push(t),e<0&&(e=this.palette.length,this.palette.push({r:this.color.r,g:this.color.g,b:this.color.b})),this.palette_indexes.push(e),this.checkForEndOfColgroup()}reset(t=!1){this.line_heights=[],this.palette_indexes=[],this.total_height=0,t||(this.palette=[],this.offset=0)}finishDrawing(){if(0===this.line_heights.length)return;const t=this.gl;t.uniform3fv(this.uniform_locations.palette,this.palette.flatMap((t=>[t.r,t.g,t.b]))),t.uniform1iv(this.uniform_locations.palette_indexes,this.palette_indexes),t.uniform1iv(this.uniform_locations.line_heights,this.line_heights),t.uniform1i(this.uniform_locations.offset,this.offset),t.drawArrays(t.TRIANGLE_FAN,0,4)}create_program(){const t=this.gl;if(!this.gl)throw new Error("WebGL environment could not be created");const e=t.createShader(t.VERTEX_SHADER);if(!e)throw new Error("Imposibble de créer le vertex shader");t.shaderSource(e,g),t.compileShader(e);const i=t.createShader(t.FRAGMENT_SHADER);if(!i)throw new Error("Imposibble de créer le fragment shader");t.shaderSource(i,_),t.compileShader(i);const o=t.createProgram();if(!o)throw new Error("Impossible de créer le programe");this.shaderProgram=o,t.attachShader(o,e),t.attachShader(o,i),t.linkProgram(o),t.useProgram(o),console.log(t.getProgramInfoLog(this.shaderProgram)),[e,i].map((e=>t.getShaderInfoLog(e))).filter((t=>t)).forEach(console.log);for(const a in this.uniform_locations)this.uniform_locations[a]=t.getUniformLocation(this.shaderProgram,a);for(const a in this.attrib_locations)this.attrib_locations[a]=t.getAttribLocation(this.shaderProgram,a);console.log(this.uniform_locations),console.log(this.attrib_locations),t.uniform2f(this.uniform_locations.resolution,this.size.x,this.size.y),t.uniform1i(this.uniform_locations.col_group,this.col_group);const r=4,n=new Float32Array(r);n.forEach(((t,e)=>{n[e]=e}));const s=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,s),t.bufferData(t.ARRAY_BUFFER,n,t.STATIC_DRAW),t.enableVertexAttribArray(this.attrib_locations.vertexId),t.bindBuffer(t.ARRAY_BUFFER,s),t.vertexAttribPointer(this.attrib_locations.vertexId,1,t.FLOAT,!1,0,0)}checkForEndOfColgroup(){this.total_height>=this.size.y*this.col_group&&(this.finishDrawing(),this.offset+=this.col_group,this.reset(!0))}checkIntegrity(){let t=0,e=0,i=0;for(let o=0;o<this.line_heights.length;o++)if(t+=this.line_heights[o],t===this.size.y)t=0,e++,i=o+1;else if(t>this.size.y)throw console.log(this.line_heights.slice(i,o)),new Error(`Column ${e} not cool`)}}const x=10;let m=0,v=0;const A=new Array(x).fill(0);class w extends y{constructor(t,e,i){super({x:t,y:e},i),(0,h.Z)(this,"shadow_ratio",.2),(0,h.Z)(this,"context2D",void 0),this.context2D=this.createCanvas().getContext("2d"),this.resizeCanvasHtml(this.context2D.canvas,{x:3*this.canvas.width,y:3*this.canvas.height}),this.context2D.font="24px Comic sans",this.context2D.fillStyle="red"}drawContext(t,e){this.reset();const i=t.map,o=t.player.pos;for(let r=0;r<this.size.x;r+=1){const e=(r-this.size.x/2)*t.view_angle/this.size.x*l.Ly,n=t.player.angle+e,s=i.get_next_wall(o,n),a=c.P.get(s.orientation===u.i.VERTICAL?"wall":"wall_2"),h=a.columns.length,f=s.distance*h*Math.cos(e),p=s.distance===1/0?0:Math.floor(h*this.size.y/f),d=Math.floor(this.size.y/2-p/2);this.drawCeiling(d,p,e,r,s),this.drawWalls(p,s,a),this.drawFloor(d,p,e,r,s),this.newColumn()}this.drawFps(e),this.finishDrawing()}drawWalls(t,e,i){const o=Math.floor(e.wallCol*i.columns.length),r=i.columns[o],n=Math.abs(Math.floor((this.size.y-t)/2));let s=n,a=r[0];const h=t>this.size.y?.5*(t-this.size.y)/t:0,l=t>this.size.y?1-h:1;t=Math.min(t,this.size.y);for(let c=0;c<=t;c++){const e=h+(l-h)*c/t,i=Math.min(r.length-1,Math.floor(r.length*e)),o=r[i];if((0,f.T)(o,a)>5||c===t){this.setColor(a.r/255,a.g/255,a.b/255),a=o;const t=n+c;this.drawHorizontalLine(t-s),s=t}}}drawCeiling(t,e,i,o,r){if(e>=this.size.y)return;let n={r:0,g:0,b:0},s=0;const a=Math.cos(i);for(let h=0;h<=t;h++){const e=(this.size.y-h)/this.size.y-.5,i=1/(2*e);let{x:o,y:l}=this.get_coords_from_lines(i/a,r.points);const u=c.P.get(Math.floor(o)%2===0?"floor":"floor_2"),p=u.columns[0].length;o=Math.floor(o*p),l=Math.floor(l*p);const d=u.columns[o&p-1][l&p-1];((0,f.T)(d,n)>20||h===t)&&(this.setColor(n.r/255,n.g/255,n.b/255),n=d,this.drawHorizontalLine(h-s),s=h)}}drawFloor(t,e,i,o,r){if(e>=this.size.y)return;let n={r:0,g:0,b:0},s=t+e;const a=Math.cos(i);for(let h=t+e;h<=this.size.y;h++){const t=h/this.size.y-.5,e=1/(2*t);let{x:i,y:o}=this.get_coords_from_lines(e/a,r.points);const l=c.P.get(Math.floor(i)%2===0?"floor":"floor_2"),u=l.columns[0].length;i=Math.floor(i*u),o=Math.floor(o*u);const p=l.columns[i&u-1][o&u-1];((0,f.T)(p,n)>20||h===this.size.y)&&(this.setColor(n.r/255,n.g/255,n.b/255),n=p,this.drawHorizontalLine(h-s),s=h)}}get_coords_from_lines(t,e){let i=0;for(let o=0;o<e.length-1;o++){const r=e[o],n=e[o+1];if(n.new_line)continue;const s=p(r,n);if(i+s>=t){const e=t-i,o=e/s;return{x:r.x+(n.x-r.x)*o,y:r.y+(n.y-r.y)*o}}i+=s}return e[e.length-1]}drawFps(t){v-=A[m],v+=t,A[m]=t,m=++m%x;const e=x/v;this.context2D.clearRect(0,0,this.size.x,this.size.y),this.context2D.fillText(e.toFixed(2),10,20)}}var T=(0,o.aZ)({name:"Play",props:{game:{type:Object,required:!0}},mounted(){const t=.5;this.game.start_loop(new w(720*t,480*t,document.getElementById("play-canvas")))},unmounted(){this.game.stop()}}),b=i(89);const C=(0,b.Z)(T,[["render",a]]);var E=C}}]);
//# sourceMappingURL=872.63b107ff.js.map