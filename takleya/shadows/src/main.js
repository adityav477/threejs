import * as Three from "three"
import { OrbitControls } from "three/examples/jsm/Addons.js"
import * as dat from "dat.gui";


/* gui */
const gui = new dat.GUI();

/* Scene */
const scene = new Three.Scene();

/*Camera*/
const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
camera.position.z = 50;
camera.position.y = 10;

/* Objects */
//material 
const meshMaterial = new Three.MeshStandardMaterial({ color: "white" });

//geometries
const sphereGeometry = new Three.SphereGeometry(5);
const sphere = new Three.Mesh(sphereGeometry, meshMaterial);
sphere.castShadow = true;

const planeGeometry = new Three.PlaneGeometry(50, 50);
const plane = new Three.Mesh(planeGeometry, meshMaterial);
plane.receiveShadow = true;
plane.material.side = Three.DoubleSide;
plane.position.y = -5;
plane.rotation.x = Math.PI / 2;

scene.add(sphere, plane);

/* Light */
//pointLight
const pointLight = new Three.PointLight("white", 100);
pointLight.position.set(0, 7, -7);
// pointLight.castShadow = true;
// scene.add(pointLight);

//spotlight
const spotLight = new Three.SpotLight("white", 1000, 100, Math.PI * 0.3);
spotLight.castShadow = true;
const spotlightHelper = new Three.SpotLightHelper(spotLight);
// scene.add(spotlightHelper);
spotLight.position.set(-10, 20, 10);
spotlightHelper.update();
scene.add(spotLight);

//directional light
const directionalLight = new Three.DirectionalLight("white", 1);
scene.add(directionalLight);
directionalLight.position.z = 10;
directionalLight.position.y = 10;
directionalLight.position.x = 10;

/* Shadow */
directionalLight.castShadow = true;
console.log(directionalLight.shadow);
directionalLight.shadow.mapSize = new Three.Vector2(1024, 1024);
directionalLight.shadow.camera.left = -10;
directionalLight.shadow.camera.right = 10;
directionalLight.shadow.camera.top = 10;
directionalLight.shadow.camera.bottom = -10;
directionalLight.shadow.camera.far = 40;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.radius = 15;
const dirLightHelper = new Three.DirectionalLightHelper(directionalLight);
// scene.add(dirLightHelper);
const dirLightCameraHelper = new Three.CameraHelper(directionalLight.shadow.camera);
// gui.add(directionalLight.shadow.camera, 'far').min(10).max(50).step(1).onChange(() => {
//   directionalLight.shadow.camera.updateProjectionMatrix();
//   dirLightCameraHelper.update();
// });
// gui.add(directionalLight.shadow, 'radius').min(1).max(100).step(1);
// scene.add(dirLightCameraHelper);

//spotlight shadow
const spotLightCameraHelper = new Three.CameraHelper(spotLight.shadow.camera);
spotLight.shadow.camera.far = 30;
spotLight.shadow.camera.left = -20;
spotLight.shadow.camera.right = 20;
spotLight.shadow.camera.top = 20;
spotLight.shadow.camera.bottom = -20;
spotLight.shadow.camera.fov = 20;
spotLight.shadow.camera.near = 1;

// gui.add(spotLight.shadow.camera, 'fov', 10, 100, 1).onChange(() => {
//   spotLight.shadow.camera.updateProjectionMatrix();
//   spotLightCameraHelper.update();
// });
// gui.add(spotLight.shadow.camera, 'far', 10, 100, 1).onChange(() => {
//   spotLight.shadow.camera.updateProjectionMatrix();
//   spotLightCameraHelper.update();
// });
spotLight.shadow.camera.updateProjectionMatrix();
spotLightCameraHelper.update();
// scene.add(spotLightCameraHelper);


// scene.add(directionalLight);
const directionalLightHelper = new Three.DirectionalLightHelper(directionalLight);
// scene.add(directionalLightHelper);

//ambientLight
const ambientLight = new Three.AmbientLight("", 0.1);
directionalLight.position.x = 10;
scene.add(ambientLight);

/*Canvas */
const canvas = document.getElementById("canvas");
/* Renderer */
const renderer = new Three.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.render(scene, camera);

/* Controls */
const controls = new OrbitControls(camera, renderer.domElement);

const animate = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}
animate();

