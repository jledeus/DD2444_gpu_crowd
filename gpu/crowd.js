



// TODO: render to a texture
// https://webglfundamentals.org/webgl/lessons/webgl-render-to-texture.html



// Initial shader is called program


var crowds = new Float32Array(GROUPS * NUM_PARTICLES * (4+4+4));


for(var j = 0; j < GROUPS; j++) {
var crowd_color_r = Math.random();
var crowd_color_g = Math.random();
var crowd_color_b = Math.random();
for (var i = 0; i < NUM_PARTICLES; i++) {
  pos_x = Math.random();
  pos_y = Math.random();
  vel_x = Math.random() / 10.0;
  vel_y = Math.random() / 10.0;

  if(Math.random() > 0.5)
    pos_x *= -1;
  if(Math.random() > 0.5)
    pos_y *= -1;
  if(Math.random() > 0.5)
      vel_y *= -1;
  if(Math.random() > 0.5)
      vel_y *= -1;


  crowds[j*12*NUM_PARTICLES + i*12] = pos_x;
  crowds[j*12*NUM_PARTICLES + i*12 + 1] = pos_y;
  crowds[j*12*NUM_PARTICLES + i*12 + 2] = 0;
  crowds[j*12*NUM_PARTICLES + i*12 + 3] = 0;


  crowds[j*12*NUM_PARTICLES + i*12 + 4] = vel_x;
  crowds[j*12*NUM_PARTICLES + i*12 + 5] = vel_y;
  crowds[j*12*NUM_PARTICLES + i*12 + 6] = 0.0;
  crowds[j*12*NUM_PARTICLES + i*12 + 7] = 0;

  crowds[j*12*NUM_PARTICLES + i*12 + 8] = crowd_color_r;
  crowds[j*12*NUM_PARTICLES + i*12 + 9] = crowd_color_g;
  crowds[j*12*NUM_PARTICLES + i*12 + 10] = crowd_color_b;
}
}


// get uniform location in ComputeShader
timeUniformLocation = gl.getUniformLocation(computeProgram, 'time');

// create ShaderStorageBuffer
ssbo = gl.createBuffer();
gl.bindBuffer(gl.SHADER_STORAGE_BUFFER, ssbo);
gl.bufferData(gl.SHADER_STORAGE_BUFFER, crowds, gl.DYNAMIC_COPY);
gl.bindBufferBase(gl.SHADER_STORAGE_BUFFER, 0, ssbo);

/*
struct Boid
{
  vec4 pos;
  vec4 vel;
  vec4 col;
};
*/

// Set the ShaderStorageBuffer as ARRAY_BUFFER
gl.bindBuffer(gl.ARRAY_BUFFER, ssbo);
gl.enableVertexAttribArray(0);
gl.enableVertexAttribArray(1);
gl.enableVertexAttribArray(2);

// Size of float is 4 in webgl
gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 4 * (4+4+4), 0);



gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 4 * (4+4+4), 4*4);


gl.vertexAttribPointer(2, 3, gl.FLOAT, false, 4 * (4+4+4), 4 * (4 + 4));

// initialize states
gl.clearColor(1, 1, 1, 1.0);
time = 0.0;

// Load the location of the uniform
//var resolutionUniformLocation = gl.getUniformLocation(program, "u_position");

setInterval(function(){
  // Do the compute shaders calculations first
  time += 1.0;
  gl.useProgram(computeProgram);
  gl.uniform1f(timeUniformLocation, time);
  gl.dispatchCompute(GROUPS, 1, 1);
  gl.memoryBarrier(gl.VERTEX_ATTRIB_ARRAY_BARRIER_BIT);
  // Render crowds
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.useProgram(renderProgram);
  gl.drawArrays(gl.POINTS, 0, GROUPS*NUM_PARTICLES);



}, 10);
