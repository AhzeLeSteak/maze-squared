(self["webpackChunkmaze_squared"]=self["webpackChunkmaze_squared"]||[]).push([[241],{3013:function(t){t.exports="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof DataView},260:function(t,r,e){"use strict";var o,i,n,s=e(3013),a=e(9781),c=e(7854),h=e(614),l=e(111),d=e(2597),f=e(648),u=e(6330),y=e(8880),p=e(8052),g=e(3070).f,v=e(7976),A=e(9518),x=e(7674),_=e(5112),m=e(9711),T=e(9909),b=T.enforce,w=T.get,R=c.Int8Array,C=R&&R.prototype,E=c.Uint8ClampedArray,P=E&&E.prototype,F=R&&A(R),L=C&&A(C),z=Object.prototype,I=c.TypeError,D=_("toStringTag"),S=m("TYPED_ARRAY_TAG"),M="TypedArrayConstructor",B=s&&!!x&&"Opera"!==f(c.opera),N=!1,O={Int8Array:1,Uint8Array:1,Uint8ClampedArray:1,Int16Array:2,Uint16Array:2,Int32Array:4,Uint32Array:4,Float32Array:4,Float64Array:8},U={BigInt64Array:8,BigUint64Array:8},V=function(t){if(!l(t))return!1;var r=f(t);return"DataView"===r||d(O,r)||d(U,r)},Y=function(t){var r=A(t);if(l(r)){var e=w(r);return e&&d(e,M)?e[M]:Y(r)}},Z=function(t){if(!l(t))return!1;var r=f(t);return d(O,r)||d(U,r)},G=function(t){if(Z(t))return t;throw I("Target is not a typed array")},W=function(t){if(h(t)&&(!x||v(F,t)))return t;throw I(u(t)+" is not a typed array constructor")},k=function(t,r,e,o){if(a){if(e)for(var i in O){var n=c[i];if(n&&d(n.prototype,t))try{delete n.prototype[t]}catch(s){try{n.prototype[t]=r}catch(h){}}}L[t]&&!e||p(L,t,e?r:B&&C[t]||r,o)}},H=function(t,r,e){var o,i;if(a){if(x){if(e)for(o in O)if(i=c[o],i&&d(i,t))try{delete i[t]}catch(n){}if(F[t]&&!e)return;try{return p(F,t,e?r:B&&F[t]||r)}catch(n){}}for(o in O)i=c[o],!i||i[t]&&!e||p(i,t,r)}};for(o in O)i=c[o],n=i&&i.prototype,n?b(n)[M]=i:B=!1;for(o in U)i=c[o],n=i&&i.prototype,n&&(b(n)[M]=i);if((!B||!h(F)||F===Function.prototype)&&(F=function(){throw I("Incorrect invocation")},B))for(o in O)c[o]&&x(c[o],F);if((!B||!L||L===z)&&(L=F.prototype,B))for(o in O)c[o]&&x(c[o].prototype,L);if(B&&A(P)!==L&&x(P,L),a&&!d(L,D))for(o in N=!0,g(L,D,{get:function(){return l(this)?this[S]:void 0}}),O)c[o]&&y(c[o],S,o);t.exports={NATIVE_ARRAY_BUFFER_VIEWS:B,TYPED_ARRAY_TAG:N&&S,aTypedArray:G,aTypedArrayConstructor:W,exportTypedArrayMethod:k,exportTypedArrayStaticMethod:H,getTypedArrayConstructor:Y,isView:V,isTypedArray:Z,TypedArray:F,TypedArrayPrototype:L}},9671:function(t,r,e){var o=e(9974),i=e(8361),n=e(7908),s=e(6244),a=function(t){var r=1==t;return function(e,a,c){var h,l,d=n(e),f=i(d),u=o(a,c),y=s(f);while(y-- >0)if(h=f[y],l=u(h,y,d),l)switch(t){case 0:return h;case 1:return y}return r?-1:void 0}};t.exports={findLast:a(0),findLastIndex:a(1)}},8544:function(t,r,e){var o=e(7293);t.exports=!o((function(){function t(){}return t.prototype.constructor=null,Object.getPrototypeOf(new t)!==t.prototype}))},9974:function(t,r,e){var o=e(1702),i=e(9662),n=e(4374),s=o(o.bind);t.exports=function(t,r){return i(t),void 0===r?t:n?s(t,r):function(){return t.apply(r,arguments)}}},9518:function(t,r,e){var o=e(2597),i=e(614),n=e(7908),s=e(6200),a=e(8544),c=s("IE_PROTO"),h=Object,l=h.prototype;t.exports=a?h.getPrototypeOf:function(t){var r=n(t);if(o(r,c))return r[c];var e=r.constructor;return i(e)&&r instanceof e?e.prototype:r instanceof h?l:null}},8675:function(t,r,e){"use strict";var o=e(260),i=e(6244),n=e(9303),s=o.aTypedArray,a=o.exportTypedArrayMethod;a("at",(function(t){var r=s(this),e=i(r),o=n(t),a=o>=0?o:e+o;return a<0||a>=e?void 0:r[a]}))},4590:function(t,r,e){"use strict";var o=e(260),i=e(9671).findLastIndex,n=o.aTypedArray,s=o.exportTypedArrayMethod;s("findLastIndex",(function(t){return i(n(this),t,arguments.length>1?arguments[1]:void 0)}))},3408:function(t,r,e){"use strict";var o=e(260),i=e(9671).findLast,n=o.aTypedArray,s=o.exportTypedArrayMethod;s("findLast",(function(t){return i(n(this),t,arguments.length>1?arguments[1]:void 0)}))},7241:function(t,r,e){"use strict";e.r(r),e.d(r,{default:function(){return x}});var o=e(3396);const i={id:"canvas-container"};function n(t,r,e,n,s,a){return(0,o.wg)(),(0,o.iD)("div",i)}var s=e(2482),a=e(954),c=e(872),h=(e(1703),e(7658),e(8675),e(3408),e(4590),e(912));class l extends h.X{constructor(t){super(t),(0,s.Z)(this,"gl",void 0),(0,s.Z)(this,"shaderProgram",void 0),(0,s.Z)(this,"color",{r:0,g:0,b:0}),(0,s.Z)(this,"lines_vertex",[]),(0,s.Z)(this,"triangle_vertex",[]),this.gl=this.canvas.getContext("webgl2"),this.setupWebGl()}setupWebGl(){const t=this.gl,r="#version 300 es\n\n    in vec2 a_Position;\n    in vec3 a_Color;\n    out vec3 v_Color;\n\n    void main()\n    {\n        gl_Position = vec4(a_Position, 0.0, 1.0);\n        v_Color = a_Color;\n    }",e="#version 300 es\n\n    precision mediump float;\n    in vec3 v_Color;\n    out vec4 fragColor;\n\n    void main()\n    {\n        fragColor = vec4(v_Color, 1.0);\n    }",o=t.createShader(t.VERTEX_SHADER);if(!o)throw new Error("Imposibble de créer le vertex shader");t.shaderSource(o,r),t.compileShader(o);const i=t.createShader(t.FRAGMENT_SHADER);if(!i)throw new Error("Imposibble de créer le fragment shader");t.shaderSource(i,e),t.compileShader(i);const n=t.createProgram();if(!n)throw new Error("Impossible de créer le program");this.shaderProgram=n,t.attachShader(n,o),t.attachShader(n,i),t.linkProgram(n),t.useProgram(n),t.clearColor(1,0,0,1),t.clear(t.COLOR_BUFFER_BIT)}deviceToNormalised(t,r){return r?2*t/this.canvas.width-1:-2*t/this.canvas.height+1}setColor(t,r,e){this.color.r=t,this.color.g=r,this.color.b=e}drawHorizontalLine(t,r,e){t=this.deviceToNormalised(t,!0),r=this.deviceToNormalised(r,!1),e=this.deviceToNormalised(e,!1),this.lines_vertex.push(t,r,this.color.r,this.color.g,this.color.b,t,e,this.color.r,this.color.g,this.color.b)}drawRectangle(t,r,e,o){const i=this.deviceToNormalised(t,!0),n=this.deviceToNormalised(t+e,!0),s=this.deviceToNormalised(r,!1),a=this.deviceToNormalised(r+o,!1);this.triangle_vertex.push(i,s,this.color.r,this.color.g,this.color.b,n,s,this.color.r,this.color.g,this.color.b,i,a,this.color.r,this.color.g,this.color.b,n,s,this.color.r,this.color.g,this.color.b,i,a,this.color.r,this.color.g,this.color.b,n,a,this.color.r,this.color.g,this.color.b)}reset(){this.gl.clearColor(1,1,1,1),this.lines_vertex=[],this.triangle_vertex=[]}finishDrawing(){this.finishLines(),this.finishRect()}finishLines(){if(0===this.lines_vertex.length)return;const t=this.gl,r=new Float32Array(this.lines_vertex),e=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,e),t.bufferData(t.ARRAY_BUFFER,r,t.STATIC_DRAW);const o=r.BYTES_PER_ELEMENT,i=t.getAttribLocation(this.shaderProgram,"a_Position");t.vertexAttribPointer(i,2,t.FLOAT,!1,5*o,0),t.enableVertexAttribArray(i);const n=t.getAttribLocation(this.shaderProgram,"a_Color");t.vertexAttribPointer(n,3,t.FLOAT,!1,5*o,2*o),t.enableVertexAttribArray(n),t.drawArrays(t.LINES,0,r.length/5)}finishRect(){if(0===this.triangle_vertex.length)return;const t=this.gl,r=new Float32Array(this.triangle_vertex),e=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,e),t.bufferData(t.ARRAY_BUFFER,r,t.STATIC_DRAW);const o=r.BYTES_PER_ELEMENT,i=t.getAttribLocation(this.shaderProgram,"a_Position");t.vertexAttribPointer(i,2,t.FLOAT,!1,5*o,0),t.enableVertexAttribArray(i);const n=t.getAttribLocation(this.shaderProgram,"a_Color");t.vertexAttribPointer(n,3,t.FLOAT,!1,5*o,2*o),t.enableVertexAttribArray(n),t.drawArrays(t.TRIANGLES,0,r.length/5)}}const d=50;let f=0,u=0;const y=new Array(d).fill(0);class p extends l{constructor(t,r){super({x:t,y:r||9*t/16}),(0,s.Z)(this,"shadow_ratio",.2),(0,s.Z)(this,"context2D",void 0),this.context2D=this.createCanvas().getContext("2d"),this.resizeCanvasHtml(this.context2D.canvas,this.size),this.context2D.font="16px Comic sans",this.context2D.fillStyle="yellow"}drawContext(t,r){this.reset(),this.drawFps(r);const e=c.P.get("floor"),o=e.columns.length,i=t.map,n=t.player.pos,s=4;for(let h=0;h<this.size.x;h+=s){const r=(h-this.size.x/2)*t.view_angle/this.size.x*a.Ly,l=t.player.angle+r,d=i.getNextPoint(n,l),f=c.P.get("VERTICAL"===d.from?"wall":"wall_2"),u=f.columns.length,y=d.distance*u*Math.cos(r),p=d.distance===1/0?0:Math.floor(u*this.size.y/y),g=1/u,v=0,A=Math.floor(this.size.y/2-p/2),x=Math.floor(d.wallCol*f.columns.length),_=f.columns[x];let m=v*g;const T=Math.min(p,this.size.y)/this.size.y;for(let t=0;t<u&&A+t*p/u<this.size.y;t++){const r=_[Math.floor(m*u)],e=-255*this.shadow_ratio*(1-T);this.setColor((r.r+e)/255,(r.g+e)/255,(r.b+e)/255);const o=A+t*p/u,i=p/u+1;this.drawRectangle(h,o,s,i),m+=g}let b=e.columns[0][0],w=A+p-1;const R=Math.cos(r);for(let t=w;t<=this.size.y;t++){const r=t/this.size.y-.5,i=1/(2*r);let a=n.x+i*Math.cos(l)/R,c=n.y+i*Math.sin(l)/R;a=Math.floor(a*o),c=Math.floor(c*o);const d=e.columns[a&o-1][c&o-1];d===b&&t!==this.size.y||(this.setColor(b.r/255,b.g/255,b.b/255),b=d,this.drawRectangle(h,w,s,t-w),this.drawRectangle(h,this.size.y-w,s,this.size.y-t-w),w=t)}}this.finishDrawing()}drawFps(t){u-=y[f],u+=t,y[f]=t,f=++f%d;const r=d/u;this.context2D.clearRect(0,0,this.size.x,this.size.y),this.context2D.fillText(r.toFixed(2),this.size.x-40,15)}}var g=(0,o.aZ)({name:"Play",props:{game:{type:Object,required:!0}},mounted(){console.log("mounted");const t=new p(.8*window.innerWidth,.8*window.innerHeight);this.game.loop([t])},unmounted(){this.game.stop()}}),v=e(89);const A=(0,v.Z)(g,[["render",n]]);var x=A}}]);
//# sourceMappingURL=241.400c3dfa.js.map