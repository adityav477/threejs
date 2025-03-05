import * as Three from "three";
import { OrbitControls, Wireframe } from "three/examples/jsm/Addons.js";

const scene = new Three.Scene();

const w = window.innerWidth;
const h = window.innerHeight;

// initializing the Perspecrtve camera
const camera = new Three.PerspectiveCamera(50, w / h, 0.1, 30);

//initializing the Orthographic camera
// const aspectRatio = window.innerWidth / window.innerHeight;
//
// const camera = new Three.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1
// )

camera.position.z = 10;


//Mesh (geometry,material);
const geometry = new Three.BoxGeometry(1, 1, 1);
const material = new Three.MeshBasicMaterial({ color: "red", wireframe: true });

/* Custom Geometry */
// const vertices = new Float32Array([
//   -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1,
//   -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1
// ])
// const indices = new Uint16Array([
//   0, 1, 2, 0, 2, 3, // Front face
//   4, 5, 6, 4, 6, 7, // Back face
//   0, 3, 7, 0, 7, 4, // Left face
//   1, 2, 6, 1, 6, 5, // Right face
//   0, 1, 5, 0, 5, 4, // Bottom face
//   2, 3, 7, 2, 7, 6  // Top face
// ]);
//
// const bufferAttribute = new Three.BufferAttribute(vertices, 3);
// const geometry = new Three.BufferGeometry();
//
// geometry.setAttribute("position", bufferAttribute);
// geometry.setIndex(new Three.BufferAttribute(indices, 1));

const cube = new Three.Mesh(geometry, material);
// cube.position.set(0.5, 0.5, 0.5)

const radians = Three.MathUtils.degToRad(45);
// cube.rotateX(45)
scene.add(cube);
// cube.rotation.set(radians, radians, radians);

//PROPTERTIES
//properties are local to their parent  that is they will do so with respect to the scale of their parents

//position
// cube.position.y = 0.5;
// cube.position.x = 1;
// cube.position.z = 0.5

//Scale 
// cube.scale.y = 2;
// cube.scale.x = 2;
// cube.scale.z = 2;

//partent inheritcance example
// const cube1 = new Three.Mesh(geometry, material);
// cube1.position.x = 2;
// const cube2 = new Three.Mesh(geometry, material);
// cube2.position.x = -2;
//
// const group = new Three.Group();
// group.add(cube1, cube2, cube);
// scene.add(group);
//
// group.scale.setScalar(2);
// cube.position.set(0, -1, 1);// this will be relative to the scale of the group and not the axis
// cube.scale.setScalar(0.75); // this will be come half of the 2 that is 1 cause the group is sacled to 2 thus relatively 
//it will reduce the scale to the half of it's local scale

// const axexHelper = new Three.AxesHelper(2);
// scene.add(axexHelper);
// cube.add(axexHelper);
// cube2.add(axexHelper);
// scene.add(cube);


//canvas
const canvas = document.getElementById("threejs");

//orbitcontrols 
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;
// controls.update();

//renderer
const renderer = new Three.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
const clock = new Three.Clock();
renderer.render(scene, camera);
let previousTime = 0;


// renderer.setPixelRatio(window.devicePixelRatio);// did this to avoid pixel crach for slant lines which can be done by antialiasing out of the box 
// console.log("pixelratio is", window.devicePixelRatio);

// renderer loop that renders again and again for every change in the screen frame
const loop = () => {
  // we did this for every frame even though we need to change the size of the caera aspect and renderer when only
  // there is change in the windows size thus we shift it to eventListener avoiding the change in camera aspect for every frame change 
  // camera.aspect = window.innerWidth / window.innerHeight;   /
  // camera.updateProjectionMatrix();
  //
  // renderer.setSize(window.innerWidth, window.innerHeight);

  // cube.rotateX(0.1);

  /* this is frame deptendent and when the frame rate of someone is more the speed of rotation will also increase */
  // cube.rotation.y += Three.MathUtils.degToRad(1);
  // console.log(cube.rotation.y);

  /* this way won't make the rotation of the mesh depend on the framerate of the scree */
  const currentTime = clock.getElapsedTime(); // elapsed time is the differencebetween the time when the clock wsa initialised 
  //and the time between the getElapsedtime was called

  const delta = currentTime - previousTime;
  previousTime = currentTime;

  // cube.rotation.y += Three.MathUtils.degToRad(1) * delta;
  // cube.position.x = Math.sin(currentTime);
  // cube.position.y = Math.sin(currentTime);
  // cube.position.z = Math.cos(currentTime);
  // console.log(cube.position.x);

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
}
loop();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
})

// function hello() {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   controls.update();
//   window.requestAnimationFrame(hello);
//   renderer.render(scene, camera);
// }
//
// window.addEventListener("resize", hello())
