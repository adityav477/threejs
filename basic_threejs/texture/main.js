import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { degToRad } from "three/src/math/MathUtils.js";

//initialize scene
const scene = new Three.Scene();

//initialize camera 
const camera = new Three.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);;
console.log(camera);
camera.position.z = 15;
// camera.position.y = 5;

//initialize axexHelper
// const axexHelper = new Three.AxesHelper(1);
// scene.add(axexHelper);

//initialize the canvase body 
const canvas = document.getElementById("threejs");

//initialize texture
const textureLoader = new Three.TextureLoader();
const texture = textureLoader.load("./public/slipperystonework-UE4/slipperystonework-albedo.png")
texture.repeat.set(1, 1);
texture.wrapS = Three.RepeatWrapping;
texture.wrapT = Three.RepeatWrapping;

//initialize stuff
// const cubeGeometry = new Three.BoxGeometry(1, 1, 1);
const planeGeometery = new Three.PlaneGeometry(10, 10);

const material = new Three.MeshBasicMaterial({ map: texture });
material.side = Three.DoubleSide;

// const cube = new Three.Mesh(cubeGeometry, material);
const plane = new Three.Mesh(planeGeometery, material);
plane.scale.set(10, 10);
plane.rotation.x = -(Math.PI * 0.49);

// scene.add(cube);
scene.add(plane);

//initialize renderer
const renderer = new Three.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
console.log("hello")
renderer.render(scene, camera);


//initialize OrbitControls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.update();

const loop = () => {
  // console.log("loop")
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
}
loop();

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);

})
