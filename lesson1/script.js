import * as THREE from "three";

// canvas
const canvas = document.querySelector("canvas.webgl");

//scene
const scene = new THREE.Scene();

// object
const geomtry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });

// mesh
const mesh = new THREE.Mesh(geomtry, material);
scene.add(mesh);

//sizes
const sizes = {
  width: 500,
  height: 600,
};

//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
