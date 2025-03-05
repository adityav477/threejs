import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import sun from "./static/sun.jpg";

const scene = new Three.Scene();

const camera = new Three.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
camera.position.z = 10


//material
// const cubeGeometry = new Three.BoxGeometry(5, 5, 5);
const cubeGeometry = new Three.BoxGeometry(5, 5, 5);

//Texture 
const sunImage = new Image();
const texture = new Three.Texture(sunImage);

sunImage.onload = () => {
  console.log("image loaded habibi");
  texture.needsUpdate = true;
}

sunImage.onerror = (error) => {
  console.log(error);
}

const texture2 = new Three.TextureLoader().load(sun);
// texture2.repeat.x = 1;
// texture2.magFilter = Three.NearestFilter;
texture2.minFilter = Three.NearestFilter;
// texture2.repeat.y = 1;

//don't to direct './static/sun.jpg becasue the relative file path works only for html'
sunImage.src = sun;

const cubeMaterial = new Three.MeshBasicMaterial({ map: texture2 });

const cube = new Three.Mesh(cubeGeometry, cubeMaterial);

scene.add(cube);

const canvas = document.getElementById("canvas");
const renderer = new Three.WebGLRenderer({ canvas });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, canvas);
controls.update();

const animate = () => {
  controls.update();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}
animate();

window.addEventListener(("resize"), () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
})

