import * as Three from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js';

//scene
const scene = new Three.Scene();
scene.background = new Three.Color("white");

//camera
const camera = new Three.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 20

//geometry and object
//cube
const cubeGeometry = new Three.BoxGeometry(5, 0.5, 5);
const cubeMaterial = new Three.MeshStandardMaterial({
  color: "#B4B4B3",
  emissive: "#B4B4B3"
});
const cube = new Three.Mesh(cubeGeometry, cubeMaterial);
cube.position.y = -7;

//octahedron
const dodecahedronGeometry = new Three.DodecahedronGeometry(3);
const dodecahedronMaterial = new Three.MeshLambertMaterial({ color: "#468585", emissive: '#468585' })
const dodecahedron = new Three.Mesh(dodecahedronGeometry, dodecahedronMaterial);



//light for lambertMaterial
const light = new Three.SpotLight("0x006769", 1000);
light.position.set(7, 7, 7)

//axes Helper
const axexHelper = new Three.AxesHelper(10)

//adding object to scene
scene.add(cube);
scene.add(dodecahedron);
scene.add(light)
scene.add(axexHelper);


//renderer
const canvas = document.getElementById('canvas');

const renderer = new Three.WebGLRenderer({ canvas, antialiases: true })
renderer.setSize(window.innerWidth, window.innerHeight)

renderer.render(scene, camera);

const controls = new OrbitControls(camera, canvas);
// controls.autoRotate = true;

const loop = () => {
  // console.log("hello")
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
}
loop();

//window resizing problem 
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
})


