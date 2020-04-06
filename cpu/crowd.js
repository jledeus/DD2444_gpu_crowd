function new_person(pos_x, pos_y, vel_x, vel_y, col_r, col_g, col_b){
  return {
    pos_x: pos_x,
    pos_y : pos_y,
    vel_x : vel_x,
    vel_y : vel_y,
    color_r: col_r,
    color_g: col_g,
    color_b: col_b,
  }
}

// Center of mass function
// http://www.kfish.org/boids/pseudocode.html
function update_position(person, index, group) {

  pos_x = 0.0;
  pos_y = 0.0;

  factor = 1000.0;

  var i;
  for (i = 0; i < group.length; i++) {
    if(i == index)
      continue;
    pos_x += group[i].pos_x;
    pos_y += group[i].pos_y;
  }

  pos_x = pos_x/(group.length - 1.0);
  pos_y = pos_y/(group.length - 1.0);

  person.vel_x += (pos_x - person.pos_x) / factor;
  person.vel_y += (pos_y - person.pos_y) / factor;

}


// Keep a small distance from other boids
function update_position2(person, index, group) {

  pos_x = 0.0;
  pos_y = 0.0;

  var i;
  for (i = 0; i < group.length; i++) {
    if(i == index)
      continue;

      if(Math.abs(group[i].pos_x - person.pos_x) < 0.0005 || Math.abs(group[i].pos_y - person.pos_y) < 0.0005) {

        pos_x = pos_x - (group[i].pos_x - person.pos_x);
        pos_y = pos_y - (group[i].pos_y - person.pos_y);
      }

  }

  person.vel_x += pos_x;
  person.vel_y += pos_y;

}

// Awerage velocity of the boids
function update_position3(person, index, group) {

  vel_x = 0.0;
  vel_y = 0.0;

  factor = 200.0;

  var i;
  for (i = 0; i < group.length; i++) {
    if(i == index)
      continue;
    vel_x += group[i].vel_x;
    vel_y += group[i].vel_y;
  }

  vel_x = vel_x/(group.length - 1.0);
  vel_y = vel_y/(group.length - 1.0);

  person.vel_x += (vel_x - person.vel_x) / factor;
  person.vel_y += (vel_y - person.vel_y) / factor;

}

function limit_velocity(person) {
  var vlim = 0.001;
  if (Math.abs(person.vel_x) > vlim) {
    person.vel_x = (person.vel_x / Math.abs(person.vel_x))*vlim;

  }
  if (Math.abs(person.vel_y) > vlim) {
    person.vel_y = (person.vel_y / Math.abs(person.vel_y))*vlim;

  }
}

function control_boundaries(person) {
  if(person.pos_x < -1.1)
    person.pos_x = 1.1;
  if(person.pos_y < -1.1)
    person.pos_y = 1.1;
  if(person.pos_x > 1.1)
    person.pos_x = -1.1;
  if(person.pos_y > 1.1)
    person.pos_y = -1.1;

}


// Initial shader is called program

// list containing all the people in the simulation

var groups_crowd = [];

// Visible in range [-1,1]
var groups = 100;
var boids = 128;

for(var j = 0; j < groups; j++) {

var crowd = [];
var crowd_color_r = Math.random();
var crowd_color_g = Math.random();
var crowd_color_b = Math.random();
for (var i = 0; i < boids; i++) {
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



  crowd.push(new_person(pos_x,  pos_y,  vel_x,  vel_y,  crowd_color_r, crowd_color_g, crowd_color_b));
}
groups_crowd.push(crowd);
}



// Load the location of the uniform
var resolutionUniformLocation = gl.getUniformLocation(program, "u_position");
var color_uniform = gl.getUniformLocation(program, "u_color");

setInterval(function(){
  gl.clear(gl.COLOR_BUFFER_BIT); // Clear the screen for next simulation

  for(var j = 0; j < groups; j++) {
    crowd = groups_crowd[j];

  crowd.forEach((c, i) => {
    gl.uniform2f(resolutionUniformLocation, c.pos_x, c.pos_y);
    gl.uniform3f(color_uniform, c.color_r, c.color_g, c.color_b);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    update_position(c, i, crowd);
    update_position2(c, i, crowd);
    update_position3(c, i, crowd);
    limit_velocity(c);
    control_boundaries(c);

    // Update velocity
    c.pos_x += c.vel_x;
    c.pos_y += c.vel_y;

    control_boundaries(c);
  });

}


}, 10);
