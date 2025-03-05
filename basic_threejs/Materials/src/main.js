import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { Pane } from "tweakpane";

//scnee
const scene = new Three.Scene();

//pane  -> doesn't works
// const pane = new Pane();

//camera
const camera = new Three.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 8

scene.add(camera);

//Shape
const geometry = new Three.BoxGeometry(1, 1, 1);


/* Texture */
const textureLoader = new Three.TextureLoader();
const texture = textureLoader.load('../public/desert-rocks1-ue/desert-rocks1-Height.png');

//lambert requires light to be put on it 
// const material = new Three.MeshPhongMaterial({ color: "white" });
const material = new Three.MeshBasicMaterial({ map: texture });
material.shininess = 100;
material.metalness = 0.5;
material.shininess = 100
material.roughness = 0.01;
material.clearcoatRoughness = 1;
// material.color = new Three.Color("red");
// console.log(pane);

//pane innitialization
// pane.addInput(material, 'shininess', {
//   min: 0,
//   max: 1,
//   step: 0.01
// })
//
// pane.addInput(material, 'roughness', {
//   min: 0,
//   max: 1,
//   step: 0.01
// })

//initialize light 
//ambient Light
const ambientLight = new Three.AmbientLight("white", 0.5);
scene.add(ambientLight);

// //pointlight  
const pointLight = new Three.PointLight("white", 50);
pointLight.position.set(3, 1, 1);
// // pointLight.position.set(5, 5, 5);
const pointLight2 = new Three.PointLight("white", 50);
pointLight2.position.set(-3, 1, 1);

scene.add(pointLight);
// scene.add(pointLight2);

const cube = new Three.Mesh(geometry, material);
const cube1 = new Three.Mesh(geometry, material);
const plane = new Three.Mesh(new Three.TorusKnotGeometry(0.5, 0.15, 100, 16), material);
const sphere = new Three.Mesh(new Three.SphereGeometry(0.7, 43, 43), material);
const cylinder = new Three.Mesh(new Three.CylinderGeometry(0.7, 0.7, 1, 43), material)
cube1.position.x = -2;
plane.position.x = 2;
sphere.position.y = 2;
cylinder.position.y = -2;

/* Declaring Group*/
const group = new Three.Group();
group.add(cube, cube1, plane, sphere, cylinder);
scene.add(group);

// const material = new Three.MeshBasicMaterial({ color: "green" });
/*Fog */
material.side = Three.DoubleSide;
// material.background = new Three.Color("white");
// scene.fog = new Three.Fog(0xffffff, 0.1, 10);
// scene.background = new Three.Color("white");

//dom element
const canvas = document.getElementById("three");

const renderer = new Three.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);


//OrbitControls 
const controls = new OrbitControls(camera, canvas);
// controls.autoRotate = true;

const loop = () => {
  // controls.update();

  //rotation each individually
  group.children.map((child) => {
    if (child instanceof Three.Mesh) {
      child.rotation.y += 0.01;
    }
  })

  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
}
loop();


window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
})



