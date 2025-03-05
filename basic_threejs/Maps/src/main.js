import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { materialRefractionRatio } from "three/webgpu";

//creating scene 
const scene = new Three.Scene();

//creating Camera
const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 15;

//texture loader
const textureLoader = new Three.TextureLoader();
const slipperTexture = textureLoader.load("../public/slipperystonework-UE4/slipperystonework-albedo.png");
const slipperRoughness = textureLoader.load("../public/slipperystonework-UE4/slipperystonework-rough.png");
const slipperMetallic = textureLoader.load("../public/slipperystonework-UE4/slipperystonework-metalness.png");
const slipperNormal = textureLoader.load("../public/slipperystonework-UE4/slipperystonework-normal.png");
const slipperHeight = textureLoader.load("../public/slipperystonework-UE4/slipperystonework-height.png");

//light 
const pointLight = new Three.PointLight("white", 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const ambientLight = new Three.AmbientLight("white", 10);
scene.add(ambientLight);

//initialize figures
const material = new Three.MeshStandardMaterial();
material.map = slipperTexture;
material.roughnessMap = slipperRoughness;
material.roughness = 1;
//
material.metalnessMap = slipperMetallic;
material.metalness = 1;

material.normalMap = slipperNormal;

material.displacementMap = slipperHeight;
material.displacementScale = 0.0001;


const cubeGeometry = new Three.BoxGeometry(5, 5, 5);

//initialize the Mesh
const cube = new Three.Mesh(cubeGeometry, material);

scene.add(cube);

//initialize the canvas
const canvas = document.getElementById("canvas");

//axexHelper
const axexHelper = new Three.AxesHelper(5);
scene.add(axexHelper);

//initialize the renderer 
const renderer = new Three.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

//rotation 
const controls = new OrbitControls(camera, canvas);

const loop = () => {
  controls.update()
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
}

loop();

//resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
})


