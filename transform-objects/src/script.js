import * as THREE from "three";

// canvas
const canvas = document.querySelector("canvas.webgl");

//scene
const scene = new THREE.Scene();

// Object

const group = new THREE.Group();
group.position.y = 1;
group.scale.y = 2;
group.rotation.y = 1;
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "red" })
);

group.add(cube1);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "green" })
);
cube2.position.x = 2;
group.add(cube2);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "orange" })
);
cube3.position.x = -2;

group.add(cube3);

//Axis helper
const axisHelper = new THREE.AxesHelper();
scene.add(axisHelper);

//sizes
const sizes = {
  width: 700,
  height: 600,
};

//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
// camera lookat is for loking of object
// camera.lookAt(mesh.position);

// console.log(mesh.position.distanceTo(camera.position));

scene.add(camera);

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
