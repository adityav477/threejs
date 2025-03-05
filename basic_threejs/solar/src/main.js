import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

//initialize the scene 
const scene = new Three.Scene();

//initialize camera 
const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;

//initialize the object 
const textureLoader = new Three.TextureLoader();
const sunTexture = textureLoader.load("../public/textures/2k_sun.jpg")
const material = new Three.MeshBasicMaterial({ map: sunTexture });

const sphereGeometry = new Three.SphereGeometry(1, 50, 50);

//backgroundTexture 
const cubeTextureLoader = new Three.CubeTextureLoader();
cubeTextureLoader.setPath("../public/textures/cubeMap/")
const backgroundTexture = cubeTextureLoader.load([
  'px.png',
  'nx.png',
  'py.png',
  'ny.png',
  'pz.png',
  'nz.png'
])

scene.background = backgroundTexture;

const sun = new Three.Mesh(sphereGeometry, material);
sun.scale.setScalar(7);
scene.add(sun);

//light 
const pointLight = new Three.PointLight("orange", 1000);
scene.add(pointLight);

const ambientLight = new Three.AmbientLight("white", 0.1);
scene.add(ambientLight);

const planets = [
  {
    name: "Mercury",
    radius: 0.7,
    distance: 10,
    speed: 0.01,
    material: "../public/textures/2k_mercury.jpg",
    moons: [],
  },
  {
    name: "Venus",
    radius: 0.8,
    distance: 20,
    speed: 0.007,
    material: "../public/textures/2k_venus_surface.jpg",
    moons: [],
  },
  {
    name: "Earth",
    radius: 1,
    distance: 30,
    speed: 0.005,
    material: "../public/textures/2k_earth_daymap.jpg",
    moons: [
      {
        name: "Moon",
        radius: 0.3,
        distance: 3,
        speed: 0.015,
      },
    ],
  },
  {
    name: "Mars",
    radius: 0.7,
    distance: 40,
    speed: 0.003,
    material: "../public/textures/2k_mars.jpg",
    moons: [
      {
        name: "Phobos",
        radius: 0.1,
        distance: 2,
        speed: 0.02,
      },
      {
        name: "Deimos",
        radius: 0.2,
        distance: 3,
        speed: 0.015,
        color: 0xffffff,
      },
    ],
  },
];

const planetsMesh = [];
const moonsMesh = [];

//for planet Mesh Creation
const createPlanet = (planet) => {
  let currentGeometry = new Three.SphereGeometry(planet.radius, 50, 50);

  let textureLoader = new Three.TextureLoader();
  const currentTexture = textureLoader.load(planet.material);

  let currentMaterial = new Three.MeshStandardMaterial({ map: currentTexture })
  let currentPlanet = new Three.Mesh(currentGeometry, currentMaterial);
  currentPlanet.position.x = planet.distance;

  planetsMesh.push(currentPlanet);

  return currentPlanet;
}

const createMoon = (moon) => {
  let currentMoonGeometry = new Three.SphereGeometry(moon.radius, 50, 50);
  const moonTexture = textureLoader.load('../public/textures/2k_moon.jpg')
  let currentMoonMaterial = new Three.MeshStandardMaterial({ map: moonTexture });

  let currentMoon = new Three.Mesh(currentMoonGeometry, currentMoonMaterial);
  currentMoon.position.x = moon.distance

  moonsMesh.push(currentMoon);
  return currentMoon;
}

planets.forEach(planet => {
  const currentPlanet = createPlanet(planet);

  planet.moons.map((moon) => {
    const currentMoon = createMoon(moon);
    currentPlanet.add(currentMoon);
  })

  scene.add(currentPlanet);
});


//axesHelper
// const axesHelper = new Three.AxesHelper(50);
// scene.add(axesHelper);

//initialize canvas 
const canvas = document.getElementById("canvas");

//initialize renderer
const renderer = new Three.WebGLRenderer({ canvas, antialises: true });

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

//OrbitControls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.update();

//loop
const loop = () => {
  sun.rotateY(0.001);
  planetsMesh.map((planetMesh, index) => {
    planetMesh.rotation.y += planets[index].speed;

    planetMesh.position.x = planets[index].distance * Math.sin(planetMesh.rotation.y);
    planetMesh.position.z = planets[index].distance * Math.cos(planetMesh.rotation.y);

    const moonsMesh = planetMesh.children;
    moonsMesh.map((moon, moonIndex) => {
      moon.rotation.y += planets[index].moons[moonIndex].speed;

      moon.position.x = Math.sin(moon.rotation.y) * planets[index].moons[moonIndex].distance;
      moon.position.z = Math.cos(moon.rotation.y) * planets[index].moons[moonIndex].distance;
    })
  })

  controls.update();
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

