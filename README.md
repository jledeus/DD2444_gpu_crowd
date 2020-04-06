# DD2444_gpu_crowd

stateless,

single stage program.

Compute shaders use GLSL language

They use the some context

Simpler to use,

light weight example.

particle system or crowd simulations.

Compute shaders can access uniform variables and buffer objects.

## CPU

### Passing data

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

## Space partitioning

kd-tree data structure,

threshold for how deep the datastructure goes.

Generate a KD-tree for each frame.

Dynamic scenes hard for kd-trees.

The problem has to do with construction and optimization on the structure.

### Simulation

#### initialization
Before entering the computations the the initialization for the crowds is done on the CPU.

#### Parallelization

* updated position for the crowd
*
