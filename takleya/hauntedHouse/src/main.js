import * as Three from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/Addons.js";

/*gui*/
const gui = new dat.GUI();
/*Scene*/
const scene = new Three.Scene();
// scene.background = new Three.Color("#262837");
scene.background = new Three.Color("#181818");

/*Texture Loader */
const textureLoader = new Three.TextureLoader();

/*Camera*/
const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 4;
camera.position.y = 5;
camera.position.x = -8;
// camera.position.set(-6, 1.5, 0);
/*Meshes*/
//house
const house = new Three.Group();
scene.add(house);

const pointLight = new Three.PointLight("white", 100);
pointLight.position.set(0, 8, 0)
// scene.add(new Three.PointLightHelper(pointLight));
// scene.add(pointLight);

//floor
//textures
const floorBaseMap = textureLoader.load('/floorTextures/coast_sand_rocks_02_diff_1k.jpg');
const floorHeightMap = textureLoader.load('/floorTextures/coast_sand_rocks_02_disp_1k.jpg');
const floorNormalMap = textureLoader.load('/floorTextures/coast_sand_rocks_02_nor_gl_1k.jpg');
const floorArmMap = textureLoader.load('/floorTextures/coast_sand_rocks_02_arm_1k.jpg');
const floorAOMap = textureLoader.load('/floorTextures/coast_sand_rocks_02_ao_1k.jpg');
const floorAlphaMap = textureLoader.load('/floorTextures/floorAlphaMap.jpg');

floorBaseMap.repeat.set(6, 6);
floorBaseMap.colorSpace = Three.SRGBColorSpace;
floorBaseMap.minFilter = Three.NearestFilter;

floorHeightMap.repeat.set(6, 6);
floorHeightMap.minFilter = Three.NearestFilter;

floorNormalMap.repeat.set(6, 6);
floorNormalMap.minFilter = Three.NearestFilter;

floorArmMap.repeat.set(6, 6);
floorArmMap.minFilter = Three.NearestFilter;

floorAOMap.repeat.set(6, 6);
floorAOMap.minFilter = Three.NeverDepth;

floorBaseMap.wrapS = Three.RepeatWrapping;
floorHeightMap.wrapS = Three.RepeatWrapping;
floorNormalMap.wrapS = Three.RepeatWrapping;
floorArmMap.wrapS = Three.RepeatWrapping;
floorAOMap.wrapS = Three.RepeatWrapping;

floorBaseMap.wrapT = Three.RepeatWrapping;
floorHeightMap.wrapT = Three.RepeatWrapping;
floorNormalMap.wrapT = Three.RepeatWrapping;
floorArmMap.wrapT = Three.RepeatWrapping;
floorAOMap.wrapT = Three.RepeatWrapping;

const floorHeight = 30;
const floorWidth = 30;
const floor = new Three.Mesh(
  new Three.PlaneGeometry(floorWidth, floorHeight, 100, 100),
  new Three.MeshStandardMaterial({
    map: floorBaseMap,
    normalMap: floorNormalMap,
    roughnessMap: floorArmMap,
    metalnessMap: floorArmMap,
    metalness: 100,
    aoMap: floorAOMap,
    displacementMap: floorHeightMap,
    displacementScale: 0.5,
    alphaMap: floorAlphaMap,
    transparent: true,
  })
);

floor.rotation.x = -Math.PI / 2;
scene.add(floor);

//walls
//wallTextures
const wallBaseMap = textureLoader.load('/wall2Textures/rock_wall_13_diff_1k.png');
const wallHeightMap = textureLoader.load('/wall2Textures/rock_wall_13_disp_1k.png');
const wallNormalMap = textureLoader.load('/wall2Textures/rock_wall_13_nor_gl_1k.png');
const wallArmMap = textureLoader.load('/wall2Textures/rock_wall_13_arm_1k.png');

wallBaseMap.colorSpace = Three.SRGBColorSpace;
const wallsW = 6;
const wallsH = 4;
const wallsD = 6;
const walls = new Three.Mesh(
  new Three.BoxGeometry(wallsW, wallsH, wallsD, 100, 100, 100),
  new Three.MeshStandardMaterial({
    // color: "#C4A484",
    map: wallBaseMap,
    normalMap: wallNormalMap,
    roughnessMap: wallArmMap,
    metalnessMap: wallArmMap,
    displacementMap: wallHeightMap,
    displacementScale: 0.183,
    displacementBias: -0.125,
    receiveShadow: true,
  })
)

// gui.add(walls.material, "displacementBias", -1, 0, -0.005);
// gui.add(walls.material, 'displacementScale', 0, 1, 0.001);
// console.log(walls);
walls.geometry.translate(0, wallsH / 2, 0);
house.add(walls);

//roof
const roofW = 5.6;
const roofH = 2.3;
const roofSegments = 4;

//roofTextures
const roofBaseMap = textureLoader.load('/roofTextures/roof_tiles_14_diff_1k.png');
const roofNormalMap = textureLoader.load('/roofTextures/roof_tiles_14_norm_gl_1k.png');
const roofHeightMap = textureLoader.load('/roofTextures/roof_tiles_14_disp_1k.png');
const roofArmMap = textureLoader.load('/roofTextures/roof_tiles_14_arm_1k.png');

roofBaseMap.repeat.set(4, 1);
roofNormalMap.repeat.set(4, 1);
roofHeightMap.repeat.set(4, 1);
roofArmMap.repeat.set(4, 1);

roofBaseMap.wrapS = Three.RepeatWrapping;
roofNormalMap.wrapS = Three.RepeatWrapping;
roofHeightMap.wrapS = Three.RepeatWrapping;
roofArmMap.wrapS = Three.RepeatWrapping;

roofBaseMap.colorSpace = Three.SRGBColorSpace;

const roof = new Three.Mesh(
  new Three.ConeGeometry(roofW, roofH, roofSegments, 100, 100),
  new Three.MeshStandardMaterial({
    map: roofBaseMap,
    normalMap: roofNormalMap,
    roughnessMap: roofArmMap,
    metalnessMap: roofArmMap,
    displacementMap: roofHeightMap,
    displacementScale: 0.55,
    displacementBias: -0.6,
    side: Three.DoubleSide,
  })
)
console.log(roof.geometry);
gui.add(roof.geometry.parameters, 'radius', 5, 10, 1);
roof.position.y = wallsH + (roofH / 2) - 0.1;
roof.rotation.y = Math.PI / 4;
house.add(roof);

//door
const doorBasicMap = textureLoader.load('/doorTexture/base.jpg');
doorBasicMap.magFilter = Three.NearestFilter;
const doorAOMap = textureLoader.load('/doorTexture/ao.jpg');
const doorAlphaMap = textureLoader.load('/doorTexture/alpha.jpg');
const doorHeightMap = textureLoader.load('/doorTexture/height.png');
const doorNormalMap = textureLoader.load('/doorTexture/normal.jpg');
const doorRoughnessMap = textureLoader.load('/doorTexture/roughness.jpg');
const doorMetalnessMap = textureLoader.load('/doorTexture/metalness.jpg');

const doorW = 2;
const doorH = 3;
const door = new Three.Mesh(
  new Three.PlaneGeometry(doorW, doorH, 100, 100),
  new Three.MeshStandardMaterial({
    color: "#b5532a",
    map: doorBasicMap,
    transparent: true,
    alphaMap: doorAlphaMap,
    aoMap: doorAOMap,
    normalMap: doorNormalMap,
    displacementMap: doorHeightMap,
    displacementScale: 0.2,
    roughnessMap: doorRoughnessMap,
    metalnessMap: doorMetalnessMap,
  })
)
door.geometry.translate(0, doorH / 2, 0);
door.position.x = -wallsW / 2 - 0.01;
door.rotation.y = -Math.PI / 2
house.add(door);

//bushes
// const bushBaseMap = textureLoader.load('/bushTextures/forest_leaves_02_diffuse_1k.png')
// const bushNormalMap = textureLoader.load('/bushTextures/forest_leaves_02_nor_gl_1k.png')
// const bushHeightMap = textureLoader.load('/bushTextures/forest_leaves_02_disp_1k.png')
// const bushArmMap = textureLoader.load('/bushTextures/forest_leaves_02_arm_1k.png')

const bushBaseMap = textureLoader.load('/bushTextures/forest_leaves_02_diffuse_1k.png')
const bushNormalMap = textureLoader.load('/bushTextures/forest_leaves_02_nor_gl_1k.png')
const bushHeightMap = textureLoader.load('/bushTextures/forest_leaves_02_disp_1k.png')
const bushArmMap = textureLoader.load('/bushTextures/forest_leaves_02_arm_1k.png')

bushBaseMap.colorSpace = Three.SRGBColorSpace;;

const bushGeometry = new Three.SphereGeometry(1, 32, 16);
const bushMaterial = new Three.MeshStandardMaterial({
  color: "#70ca82",
  map: bushBaseMap,
  normalMap: bushNormalMap,
  metalnessMap: bushArmMap,
  roughnessMap: bushArmMap,
  displacementMap: bushHeightMap,
  displacementScale: 0.05,
  castShadow: true,
  receiveShadow: true
})

const bush1 = new Three.Mesh(bushGeometry, bushMaterial);
bush1.position.set(-(wallsW / 2) - 1, 0.8, (wallsD / 2) - 0.8);
bush1.rotation.x = 2;
house.add(bush1);

const bush2 = new Three.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.5, 0.5, 0.5);
bush2.position.set(-(wallsW / 2) - 1, 0.4, (wallsD / 2) + 0.5);
bush2.rotation.x = 2;
house.add(bush2);

const bush3 = new Three.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.8, 0.8, 0.8);
bush3.position.set(-(wallsW / 2) - 1, 0.8, -(wallsD / 2) + 0.9);
bush3.rotateX(2);
house.add(bush3);

const bush4 = new Three.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.4, 0.4, 0.4);
bush4.position.set(-(wallsW / 2) - 1.8, 0.4, -(wallsD / 2) + 1.5);
bush4.rotateX(2);
house.add(bush4);

//Graves
const graves = new Three.Group();
scene.add(graves);

const graveBaseMap = textureLoader.load('/graveTextures/plastered_stone_wall_diff_1k.png');
const graveNormalMap = textureLoader.load('/graveTextures/plastered_stone_wall_nor_gl_1k.png');
const graveHeightMap = textureLoader.load('/graveTextures/plastered_stone_wall_disp_1k.png');
const graveArmMap = textureLoader.load('/graveTextures/plastered_stone_wall_arm_1k.png');
graveBaseMap.colorSpace = Three.SRGBColorSpace;

const graveGeometry = new Three.BoxGeometry(0.5, 1, 1, 50, 50);
const graveMaterial = new Three.MeshStandardMaterial({
  color: "lightgray",
  map: graveBaseMap,
  normalMap: graveNormalMap,
  roughnessMap: graveArmMap,
  metalnessMap: graveArmMap,
  displacementMap: graveHeightMap,
  displacementScale: 0.05,
  displacementBias: -0.035
});
gui.add(graveMaterial, 'displacementBias', -1, 0, -0.001);
gui.add(graveMaterial, 'displacementScale', 0, 2, 0.001);

for (let i = 0; i < 30; i++) {
  const angle = Math.random() * Math.PI * 2;
  // console.log(angle);

  // console.log("f - w", floorWidth - wallsW);
  let radius = ((wallsW + 6) / 2) + (Math.random() * ((floorHeight - wallsW - 7) / 2));

  const x = (Math.cos(angle) * radius);
  // console.log("sin:", Math.sin(angle));

  const z = (Math.sin(angle) * radius);
  // console.log("cos:", Math.sin(angle));

  const grave = new Three.Mesh(graveGeometry, graveMaterial);
  grave.position.set(x, 0.7, z);
  grave.rotation.y = (Math.random() - 0.5) / 2;
  grave.rotation.z = (Math.random() - 0.5) / 2;
  grave.castShadow = true;
  grave.receiveShadow = true;
  graves.add(grave);
}

/*Fog*/
const fog = new Three.Fog("#181818", 0, 25);
scene.fog = fog;

/*Ghosts*/
const ghostLight1 = new Three.PointLight('#7d12ff', 40, 5, 0.7);
ghostLight1.position.set(5, 5, 5);
scene.add(ghostLight1);

const ghostLight2 = new Three.PointLight('#FF10F0', 30, 5, 0.7);
ghostLight2.position.set(5, 1, 5);
scene.add(ghostLight2);

const ghostLight3 = new Three.PointLight('#FF3131', 30, 5, 0.7);
ghostLight3.position.set(-3, 1, 8);
scene.add(ghostLight3);


/*Lights*/
//dirLight
// const dirLight = new Three.DirectionalLight("#bbc1cc", 1);
const dirLight = new Three.DirectionalLight("#86cdff", 0.8);
const dirLightTarget = new Three.Object3D();
dirLightTarget.position.set(0, 0, 0);
dirLight.castShadow = true;
// dirLight.shadowMap.type = Three.PCFShadowMap;

dirLight.target = dirLightTarget;
const dirLightHelper = new Three.DirectionalLightHelper(dirLight);
// scene.add(dirLightHelper);
house.add(dirLight);
dirLight.position.set(10, 10, -5);

//ambientLight
const ambientLight = new Three.AmbientLight("#86cdff", 0.5);
scene.add(ambientLight);

//door light
// SpotLight doorlight
const doorLight = new Three.SpotLight("#FF5C00", 50, floorWidth / 3, 1.6);
doorLight.position.set(-(wallsW / 2) - 0.2, wallsH - 0.25, 0);
const doorLightTarget = new Three.Object3D();
doorLightTarget.position.set(-(floorWidth / 8) - 0.5, 0, 0);
house.add(doorLight);
doorLight.target = doorLightTarget;
doorLight.castShadow = true;
const doorLightHelper = new Three.SpotLightHelper(doorLight);
// house.add(doorLightHelper);
house.add(doorLight);
// gui.add(doorLight, 'intensity', 0.1, 10, 0.1);
// gui.add(doorLight, 'angle', 0, 2 * Math.PI, 0.1);

//pointLight
// const doorLight = new Three.PointLight("#ff8144", 7, 10);
// doorLight.castShadow = true
// doorLight.position.set(-(wallsW / 2) - 0.2, wallsH - 0.5, 0);
// const doorLightHelper = new Three.PointLightHelper(doorLight);
// scene.add(doorLightHelper);
// house.add(doorLight);

const doorLight1 = new Three.PointLight("#ff8144", 4, 10);
doorLight1.position.set((wallsW / 2) + 1, wallsH - 1, 0);
// house.add(doorLight1);

const doorLightL = new Three.PointLight("#ff8144", 7, 10);
doorLightL.position.set(0, wallsH - 0.2, (wallsW / 2) + 1);
// house.add(doorLightL);

const doorLightR = new Three.PointLight("#ff8144", 7, 10);
doorLightR.position.set(0, wallsH - 0.2, -(wallsW / 2) - 1);
// house.add(doorLightR);


/*Shadows*/
//shadoLights
dirLight.castShadow = true;
dirLight.shadow.camera.left = -20;
dirLight.shadow.camera.right = 20;
dirLight.shadow.camera.top = 20;
dirLight.shadow.camera.bottom = -20;

ghostLight1.castShadow = true;
ghostLight1.castShadow = true;
ghostLight1.castShadow = true;

doorLight.castShadow = true;

//shadowObjects
walls.castShadow = true;
floor.receiveShadow = true;
roof.castShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush4.castShadow = true;
doorLight.castShadow = true;

/*canvas*/
const canvas = document.getElementById("three");

/*Renderer*/
const renderer = new Three.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = Three.PCFShadowMap;
renderer.render(scene, camera);

/* Controls */
const controls = new OrbitControls(camera, renderer.domElement);

// const ghostAnimation = () => {
//   ghostRadius = wallsW + 5;
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   renderer.render(scene, camera);
//   window.requestAnimationFrame(ghostAnimation);
// }
const axesHelper = new Three.AxesHelper((wallsW / 2) + 5);
// scene.add(axesHelper);

const clock = new Three.Clock(true);

const rotation = () => {
  const timeElapsed = clock.getElapsedTime();

  const ghostMinRadius1 = wallsW + 0.5;
  const ghostVariableRadius1 = Math.abs(Math.sin(timeElapsed * 2) * Math.tanh(timeElapsed * 2)) * ghostMinRadius1 + (wallsW / 0.9);

  //ghostLight1
  const ghostLight1X = Math.sin((timeElapsed * 0.8) % (Math.PI * 2));
  const ghostLight1Z = Math.cos(timeElapsed * 0.8 % (Math.PI * 2));
  const ghostLight1Y = Math.abs(Math.sin(timeElapsed * 0.5));

  ghostLight1.position.x = ghostLight1X * ghostVariableRadius1;
  ghostLight1.position.z = ghostLight1Z * ghostVariableRadius1;
  ghostLight1.position.y = ghostLight1Y;
  // scene.add(new Three.PointLightHelper(ghostLight1));

  //ghotLight2
  const ghostMinRadius2 = wallsW + 0.2;
  const ghostVariableRadius2 = Math.abs(Math.sin(timeElapsed * 1.7) * Math.cos(timeElapsed * 2)) * ghostMinRadius2 + wallsW;

  const ghostLight2X = Math.sin((timeElapsed * 0.8) % (Math.PI * 2));
  const ghostLight2Z = Math.cos(timeElapsed * 0.8 % (Math.PI * 2));
  const ghostLight2Y = Math.abs(Math.sin(timeElapsed * 1.4));

  ghostLight2.position.x = ghostLight2X * ghostVariableRadius2;
  ghostLight2.position.z = ghostLight2Z * ghostVariableRadius2;
  ghostLight2.position.y = ghostLight2Y * (wallsW / 2);

  const ghostLightHelper2 = new Three.PointLightHelper(ghostLight2);
  // scene.add(ghostLightHelper2);

  //ghostLight3
  const ghostMinRadius3 = wallsW + 0.8;
  const ghostVariableRadius3 = Math.abs(Math.cos(timeElapsed * 3) * Math.sin(timeElapsed * 2)) * ghostMinRadius3 + wallsW;

  const ghostLight3X = Math.sin((timeElapsed * 0.1) % (Math.PI * 2));
  const ghostLight3Z = Math.cos(timeElapsed * 0.1 % (Math.PI * 2));
  const ghostLight3Y = Math.abs(Math.tan(timeElapsed * 1.3));

  ghostLight3.position.x = ghostLight3X * ghostVariableRadius3;
  ghostLight3.position.z = ghostLight3Z * ghostVariableRadius3;
  ghostLight3.position.y = ghostLight3Y * (wallsW / 2);
  const ghostLightHelper3 = new Three.PointLightHelper(ghostLight3);
  // scene.add(ghostLightHelper3);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
  window.requestAnimationFrame(rotation);
}
rotation();

