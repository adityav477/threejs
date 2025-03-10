import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import * as dat from "dat.gui";

/* GUI */
const gui = new dat.GUI();
/* Camera */
const scene = new Three.Scene();

/* Camera */
const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
camera.position.set(0, 0, 20);

/* Object */
const meshMaterial = new Three.MeshStandardMaterial({});
meshMaterial.roughness = 0.5;

/* Light */
const ambientLight = new Three.AmbientLight("white");
// gui.add(ambientLight, 'intensity').min(0).max(100).step(0.01);
// scene.add(ambientLight);

const pointLight = new Three.PointLight("white", 1);
pointLight.position.y = 5;
// gui.add(pointLight, 'intensity').min(0).max(100).step(0.01);
// scene.add(pointLight);

const pointLight2 = new Three.PointLight("white", 1);
pointLight2.position.set(5, 0, 5);
// gui.add(pointLight2, 'intensity').min(0).max(100).step(0.01);
// scene.add(pointLight2);

// Directional Light 
const directionalLight = new Three.DirectionalLight("green", 1);
// gui.add(directionalLight, "intensity").min(0).max(100).step(0.01);
// scene.add(directionalLight);

const hemisphereLight = new Three.HemisphereLight("green", "yellow", 1);
// gui.add(hemisphereLight, 'intensity').min(1).max(2).step(0.01);
// scene.add(hemisphereLight);

const rectareaLight = new Three.RectAreaLight("white", 1, 10, 10);
// gui.add(rectareaLight, 'intensity').min(0).max(100);
// gui.add(rectareaLight.position, 'x').min(-100).max(100).name("x");
// gui.add(rectareaLight.position, 'y').min(-100).max(100).name("y");
// gui.add(rectareaLight.position, 'z').min(-100).max(100).name("z");
//
// gui.add(rectareaLight.rotation, 'x').min(0).max(Math.PI * 2).step(Math.PI / 4).name("rectLight x");
// gui.add(rectareaLight.rotation, 'y').min(0).max(Math.PI * 2).step(Math.PI / 4).name("rectLight y");
// gui.add(rectareaLight.rotation, 'z').min(0).max(Math.PI * 2).step(Math.PI / 4).name("rectLight z");
// // rectareaLight.rotation.x = Math.PI;
// rectareaLight.position.set(0, 0, 10);
// scene.add(rectareaLight);

//for spotlight we cannot use rotation to orient it we need to use target see documentation 
const spotLight = new Three.SpotLight("pink", 50, 20, 0, 0.5);
spotLight.position.set(0, 5, 5,);

gui.add(spotLight, 'intensity').min(0).max(100);
gui.add(spotLight.position, 'x').min(-100).max(100).name("x");
gui.add(spotLight.position, 'y').min(-100).max(100).name("y");
gui.add(spotLight.position, 'z').min(-100).max(100).name("z");

const spotLightHelper = new Three.SpotLightHelper(spotLight, "white");
// scene.add(spotLightHelper);

gui.add(spotLight, 'angle').min(0).max(Math.PI).name("angle");
scene.add(spotLight);

/* Object */
//cube
const cubeGeometry = new Three.BoxGeometry(5, 5, 5);
const cube = new Three.Mesh(cubeGeometry, meshMaterial);

//torus
const torusGeometry = new Three.TorusGeometry(2, 0.8, 16, 50);
const torus = new Three.Mesh(torusGeometry, meshMaterial);
torus.position.x = 10;

//shpere
const sphereGeometry = new Three.SphereGeometry(2.5);
const sphere = new Three.Mesh(sphereGeometry, meshMaterial);
sphere.position.x = -10;

//plate 
const planeGeometry = new Three.PlaneGeometry(50, 50);
const plane = new Three.Mesh(planeGeometry, meshMaterial);
plane.material.side = Three.DoubleSide;
plane.position.y = -5;
plane.rotation.x = Math.PI / 2;

scene.add(cube, torus, sphere, plane);

/* Canvas */
const canvas = document.getElementById("three");

/* Renderer */
const renderer = new Three.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

/* Controls */
const controls = new OrbitControls(camera, renderer.domElement);

/* animate */
const animateSpotLight = () => {
  const interval = setInterval(() => {
    // console.log("before", spotLight.angle);
    spotLight.angle += 0.005;
    spotLightHelper.update();
    // console.log("after", spotLight.angle);

    if (spotLight.angle >= Math.PI / 2) {
      clearInterval(interval);
    }
  }, 1);
}
animateSpotLight();

const animate = () => {
  // controls.update();
  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.01;
  torus.rotateX(0.01);
  torus.rotateY(0.01);

  cube.rotateY(0.01);
  cube.rotateZ(0.01);

  renderer.render(scene, camera);
  renderer.setSize(window.innerWidth, window.innerHeight);
  window.requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  renderer.render(scene, camera);
  renderer.setSize(window.innerWidth, window.innerHeight);
})
