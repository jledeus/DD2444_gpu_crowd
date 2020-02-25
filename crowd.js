function new_person(pos_x, pos_y, col){
  return {
    pos_x: pos_x,
    pos_y : pos_y,
    color: col,
  }
}

function update_position(person) {

  person.pos_x += 0.001;
  person.pos_y += 0.001;

}


// TODO: render to a texture
// https://webglfundamentals.org/webgl/lessons/webgl-render-to-texture.html



// Initial shader is called program

// list containing all the people in the simulation
var crowd = [];

// Visible in range [-1,1]
crowd.push(new_person(0.1,0.2,2));
crowd.push(new_person(-0.8,-0.8,2));
crowd.push(new_person(0.7,-0.5,2));
crowd.push(new_person(-2,-2,2));

// Load the location of the uniform
var resolutionUniformLocation = gl.getUniformLocation(program, "u_position");

setInterval(function(){
  gl.clear(gl.COLOR_BUFFER_BIT); // Clear the screen for next simulation
  crowd.forEach((c, i) => {
    gl.uniform2f(resolutionUniformLocation, c.pos_x, c.pos_y);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    update_position(c);
  });

}, 10);
