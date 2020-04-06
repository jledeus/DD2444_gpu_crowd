// Constants
var GROUPS = 1000;
var NUM_PARTICLES = 128;
// The initialization is partly taken from a webgl2 tutorial, http://webglworkshop.com/28/01-triangle-webgl2.html

var canvas = document.getElementById("webgl-canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create a wegbl2-compute context
var gl = canvas.getContext("webgl2-compute");
if (!gl) {
    console.error("WebGL 2 Compute is not available");
    document.body.innerHTML = "This example requires WebGL 2 Compute, which is unavailable on this system. Activate with chrome.exe --use-gl=angle --enable-webgl2-compute-context --use-angle=gl --use-cmd-decoder=passthrough"
}

// White background
gl.clearColor(1, 1, 1, 1);

// Load shaders from src in index.html
var csSource = document.getElementById("cs").text.trim();
var vsSource = document.getElementById("vs").text.trim();
var fsSource = document.getElementById("fs").text.trim();

// ######## Create a compute shader program #########

var computeShader = gl.createShader(gl.COMPUTE_SHADER);
csSource = csSource.replace("##GROUPS##", NUM_PARTICLES);
gl.shaderSource(computeShader, csSource);
gl.compileShader(computeShader);
if (!gl.getShaderParameter(computeShader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(computeShader));
}

computeProgram = gl.createProgram();
gl.attachShader(computeProgram, computeShader);
gl.linkProgram(computeProgram);
if (!gl.getProgramParameter(computeProgram, gl.LINK_STATUS)) {
  console.error(gl.getProgramInfoLog(computeProgram));
}


var vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vsSource);
gl.compileShader(vertexShader);

if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(vertexShader));
}

var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fsSource);
gl.compileShader(fragmentShader);

if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(fragmentShader));
}

var renderProgram = gl.createProgram();
gl.attachShader(renderProgram, vertexShader);
gl.attachShader(renderProgram, fragmentShader);
gl.linkProgram(renderProgram);

if (!gl.getProgramParameter(renderProgram, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(renderProgram));
}



/////////////////////
// Placeholder geometry for one person
/////////////////////

//gl.useProgram(renderProgram);

//var triangleArray = gl.createVertexArray();
//gl.bindVertexArray(triangleArray);

//var positions = new Float32Array([
//    -0.05, -0.05, 0.0,
//    -0.05, 0.05, 0.0,
//    0.05, -0.05, 0.0,
//    0.05, 0.05, 0.0,
//]);

//var positionBuffer = gl.createBuffer();
//gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
//gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
//gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
//gl.enableVertexAttribArray(0);

//var colors = new Float32Array([
//    0.0, 0.0, 0.0,
//    0.0, 0.0, 0.0,
//    0.0, 0.0, 0.0,
//    0.0, 0.0, 0.0,

//]);

//var colorBuffer = gl.createBuffer();
//gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
//gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
//gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 0, 0);
//gl.enableVertexAttribArray(1);
