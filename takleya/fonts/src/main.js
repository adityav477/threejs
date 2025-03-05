import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { FontLoader } from "three/examples/jsm/Addons.js";
import { TextGeometry } from "three/examples/jsm/Addons.js";
import * as dat from "dat.gui";

let gui = new dat.GUI();

const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 20;
//Geometry
const cubeGeometry = new Three.BoxGeometry(5, 5, 5);

//material
const meshMaterial = new Three.MeshMatcapMaterial({ color: "white" });
// meshMaterial.wireframe = true;
const textureLoader = new Three.TextureLoader();
const texture = textureLoader.load('/textures/matcap3.png');
meshMaterial.matcap = texture;

const cube = new Three.Mesh(cubeGeometry, meshMaterial);

// scene.add(cube);

//Axes helper 
const axesHelper = new Three.AxesHelper(5);
// scene.add(axesHelper);

/**
  * Font Loader
  */
const fontLoader = new FontLoader();
let textL;
let textW;
let textH;
fontLoader.load('/fonts/helvetiker_regular.typeface.json',
  (font) => {
    const textGeometry = new TextGeometry("Hello Threejs", {
      font: font,
      size: 2,
      depth: 1,
      curveSegments: 5,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5
    })

    textGeometry.computeBoundingBox();
    // console.log(textGeometry.boundingBox);
    // textGeometry.translate(
    //   - textGeometry.boundingBox.max.x * 0.5, 0, 0);
    textGeometry.center();
    textGeometry.computeBoundingBox();
    console.log("box bounding is ", textGeometry.boundingBox);
    textL = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
    textH = textGeometry.boundingBox.max.y - textGeometry.boundingBox.min.y;
    textW = textGeometry.boundingBox.max.z - textGeometry.boundingBox.min.z;

    console.log("w:", textW, "l:", textL, "h:", textH);
    const text = new Three.Mesh(textGeometry, meshMaterial);
    console.log(text);
    scene.add(text);


  }
)

//loading torus
const torus_geometry = new Three.TorusGeometry(0.7, 0.4, 100, 50);

console.log("w:", textW, "l:", textL, "h:", textH);
for (let i = 0; i < 150; i++) {
  const torus = new Three.Mesh(torus_geometry, meshMaterial);
  torus.position.x = ((Math.random() - 0.5) * 30) * 2;
  torus.position.y = ((Math.random() - 0.6) * 30) * 2;
  torus.position.z = ((Math.random() - 0.5) * 30) * 2;
  //angle
  torus.rotation.y = (Math.random() - 0.7) * 30;
  torus.rotation.x = (Math.random() - 0.7) * 30;
  torus.rotation.z = (Math.random() - 0.7) * 30;

  scene.add(torus);
}

//canvas 
const canvas = document.getElementById("canvas");

const renderer = new Three.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

const controls = new OrbitControls(camera, canvas);

const animate = () => {
  controls.update();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
})
