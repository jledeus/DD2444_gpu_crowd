# Abstract
This repo contains the content for the project course DD2444
* Boid simulation on CPU and GPU
* WebGL 2.0 Compute

# Introduction

Modern browsers such as Google Chrome are getting more sophisticated as time passes and gets introduced with more functionality. One benefit of using a modern browser is that you can run the same application on different platforms. With HTML 5 we have access to [Web Graphics Library (WebGL)](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) in the browser with the help of JavaScript. WebGL is a hardware-based rendering that utilizes the GPU on the clients' machine. One drawback with WebGL is that it doesn't support General Purpose GPU (GPGPU) applications. Fortunately, we have access to [WebGL 2.0 Compute](https://www.khronos.org/registry/webgl/specs/latest/2.0-compute/). It can be accessed in developer mode in Google Chrome or Windows Microsoft Edge. With WebGL 2.0 Compute we have access to compute shaders. They are used for arbitrary computations, which means that they don't have to be connected to the graphics pipeline directly. This research compares performance on similar implementations of Reynold Boids [1,2] on the CPU and GPU during real-time simulations.

## Research Questions
* How suited are global and local tasks for agents in parallel computations?
* How well does it scale in terms of the number of groups and group size?
* How large can the groups be for real-time simulations in the browser?

# Background

Reynold Boids [1,2] is an early attempt to model flocks of birds, known as boids, with some simple rules. The boids should be separated and thus not collide; They should be aligned and stay within the flock; They should follow a global objective. The idea of model flocks of birds could be applied to other applications such as simulating crowds.

Simulating virtual crowds with multiple agents is of interest in many applications since it could help us with urban planning, social science and so forth [4]. A single agent has the possibility to be aware of its local surroundings while it follows some global goals [5]. The local goals could be connected to follow a specific group or adjusting velocity and speed depending on one's surroundings. Simulating virtual crowds is not that far away from Reynold Boids. This project will look at the possibility to outsource computations to the graphics card in a modern browser when simulating behaviors of crowds.




## Algorithm
The algorithmic aspects of the boid simulation follows three rules which are inspired from [1,2,3].

##### Rule 1 - Cohesion
The first rule makes the boids to fly to the center of mass of the group they belong to. This could be interpreted as Cohesion

![Cohesion](gifs/Cohesion.gif)

This animation only has Rule 1


##### Rule 2 - Separation

![Separation](gifs/Separation.gif)

This animation contains Rule 1,2.

##### Rule 3 - Alignment

![Alignment](gifs/Alignment.gif)

This animation only has Rule 3.

## Compute Shaders
Shader storage buffer object
# Method
Before Rule 1,2,3 is calculated on respective unit the boids are initialized.
## Initialization
Before entering the computations the the initialization for the crowds is done on the CPU.

## Sequential - CPU


## Parallel - GPU
 Efficient utilization of the memory in the GPU, SIMD units, L1, L2 cache, Global memory

 Workload on GPU, Work Groups, Work items, branching


2D grid
## Performance
The performance is measured when it comes to updatng velicity and position, but also the time it takes to present the data on the screen as colored pixels.

## Algorithmic considerations
The purpose of this implementation is not to capture any realistic motion or decision making of the boids. Its intention is to compare similar workload of a sequential compared to a parallel implementation on the GPU. when it comes to
stateless,

## Software
Google Chrome x.x.x
## Hardware
GPU: Geforce x.x

CPU: AMD x.x.x


# Results




# Discussion



# Conclusion
This research will investigate how to parallelize global and local objectives for agents in crowd simulations.

single stage program.

Compute shaders use GLSL language

They use the some context

Simpler to use,

light weight example.

particle system or crowd simulations.

Compute shaders can access uniform variables and buffer objects.


Shader storage buffer object, arbitrary data, arrays of structures.

Can be bound to inedex binding points.

Work groups, work items.

* Work groups = GlobalInvocationSize / WorkGroupSize

This is used in the glDispatchCompute().

Work items is the number of crowds.


* Use the LocalInvocationIndex for the shared array .

* Shared memory inside the work group.

* https://stackoverflow.com/questions/50778260/optimizing-a-raytracing-shader-in-glsl
## GPU
Single input multiple data.


 Shader storage buffer object

 Compute shaders work by dispatch work groups

work groups works independently

atomic operations for shared memory in a work group

Compute dispatch

```
// execute ComputeShader
  context.useProgram(bitonicSortProgram1);
  context.dispatchCompute(threadgroupsPerGrid, 1, 1);
  context.memoryBarrier(context.SHADER_STORAGE_BARRIER_BIT);


  // execute ComputeShader
       context.useProgram(bitonicSortProgram2);
       context.uniform4uiv(bitonicSortProgram2UniformLocation, new Uint32Array([k, j, 0, 0]));
       context.dispatchCompute(threadgroupsPerGrid, 1, 1);
       context.memoryBarrier(context.SHADER_STORAGE_BARRIER_BIT);


       // get result
  const result = new Float32Array(length);
  context.getBufferSubData(context.SHADER_STORAGE_BUFFER, 0, result);
  log(`GPU sort time: ${Math.round(performance.now() - now)} ms`);
```

Compute shaders are not part of the rendering pipeleine, they are executed before. After the dispatch function the memory barrier function is called to ensure that the calculations are complete.

After that the vertex shader can read from the SSBO.



#### Parallelization

* updated position for the crowd
*


Compute shaders are efficient for parallel tasks. They are computationally efficient and well suited for crowd simulations with individual behaviours.

### References
[1] Craig W. Reynold's home page, http://www.red3d.com/cwr/

[2] Craig  W  Reynolds.   Flocks,  herds  and  schools:   A  distributed  behavioralmodel.  InProceedings of the 14th annual conference on Computer graphicsand interactive techniques, pages 25–34, 1987

[3] Conrad Parker's boid page, http://www.kfish.org/boids/

[4] Avneesh Sud, Russell Gayle, Erik Andersen, Stephen Guy, Ming Lin, andDinesh Manocha. Real-time navigation of independent agents using adaptiveroadmaps.  InACM SIGGRAPH 2008 classes, pages 1–10. 2008.

[5] Rahul Narain, Abhinav Golas, Sean Curtis, and Ming C Lin. Aggregate dynamics for dense crowd simulation. InACM SIGGRAPH Asia 2009 papers,pages 1–8. 2009.
