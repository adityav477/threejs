import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import * as dat from "dat.gui";
import sun from "./static/sun.jpg";

const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 20;

/*
 * Texture
 */
const texture = new Three.TextureLoader().load(sun);

/*
 * Dat gui
 */
const gui = new dat.GUI();
/* 
 * Materials
 * */
// const meshBasicMaterial = new Three.MeshLambertMaterial({ color: "red" });
// const meshBasicMaterial = new Three.MeshDepthMaterial({ color: "red" });
// const meshBasicMaterial = new Three.MeshLambertMaterial();
// const meshBasicMaterial = new Three.MeshPhongMaterial();
// const meshBasicMaterial = new Three.MeshToonMaterial();
const meshBasicMaterial = new Three.MeshStandardMaterial();
meshBasicMaterial.map = texture;
meshBasicMaterial.metalness = 0.45;
meshBasicMaterial.roughness = 0.6;
meshBasicMaterial.transparent = true;
meshBasicMaterial.opacity = 0.5
meshBasicMaterial.displacementScale = 0.04
gui.add(meshBasicMaterial, "metalness").min(0).max(1);
gui.add(meshBasicMaterial, 'roughness').min(0).max(1);
gui.add(meshBasicMaterial, 'displacementScale').min(0).max(100);

// meshBasicMaterial.wireframe = true;

/*
 * shapes
 */
const torusGeometry = new Three.TorusGeometry(2.5, 1, 10, 100);
const torus = new Three.Mesh(torusGeometry, meshBasicMaterial);
torus.position.set(-10, 0, 0);

const sphereGeometry = new Three.SphereGeometry(2.5)
const sphere = new Three.Mesh(sphereGeometry, meshBasicMaterial);

const planeGeometry = new Three.PlaneGeometry(5, 5);
const plane = new Three.Mesh(planeGeometry, meshBasicMaterial);
plane.position.set(10, 0, 0);
plane.material.side = Three.DoubleSide;

/* Lights 
 */

const ambientLight = new Three.AmbientLight("white", 10);
ambientLight.position.z = 10

const pointLight = new Three.PointLight("white", 100);
pointLight.position.set(5, 5, 5);

scene.add(plane, sphere, torus);
scene.add(ambientLight);
scene.add(pointLight);

/*
 * CAnvas
 */
const canvas = document.getElementById("canvas");
const renderer = new Three.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);

const animate = () => {

  plane.rotation.y += 0.01;
  plane.rotation.x += 0.01;
  plane.rotation.z += 0.01;

  torus.rotation.y += 0.01;
  torus.rotation.x += 0.01;
  torus.rotation.z += 0.01;


  controls.update();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}
console.log(controls);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
})
animate();
