import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

import image from './textures/color.jpg'
import rougness from './textures/paper_0025_roughness_1k.jpg';
import normal_texture from './textures/normal.png'
import ambientOcclusion from './textures/ambientOcclusion.jpg'
import * as dat from 'lil-gui'; 
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const gui = new dat.GUI();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


// const ambientlight = new THREE.AmbientLight( "white", 1);
// scene.add( ambientlight );

// const directionalLight = new THREE.DirectionalLight( 0xffffff, 3 );
// directionalLight.position.set(2,2,2);
// scene.add( directionalLight );

// const hightIntensityHelper = new THREE.DirectionalLightHelper( directionalLight, 5 );
// scene.add( hightIntensityHelper );

// const pointLight = new THREE.PointLight( 0xff0000, 1, 100 );
// pointLight.position.set( 0.1, -1.3, 1 );
// scene.add( pointLight );

// const pointLightHelper = new THREE.PointLightHelper( pointLight, 0.3 );
// scene.add( pointLightHelper );

// let loader = new THREE.TextureLoader();
// const colortexture = loader.load(image);
// const roughness =  loader.load(rougness);
// const normalTexture = loader.load(normal_texture);
// const ambientOcclusionTexture = loader.load(ambientOcclusion);

// const geometry = new THREE.BoxGeometry( 3, 1.8, 2 );
// const material = new THREE.MeshStandardMaterial({ map: colortexture, roughnessMap: roughness, normalMap: normalTexture, aoMap: ambientOcclusionTexture } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// const sphere_geometry = new THREE.SphereGeometry( 1, 10, 10); 
// const sphere_material = new THREE.MeshBasicMaterial( { color: "red" } ); 
// const sphere = new THREE.Mesh( sphere_geometry, sphere_material ); 
// sphere.position.x = 3;
// scene.add( sphere );

// const cylinder_geometry = new THREE.CylinderGeometry( 1, 1, 2.5, 12 ); 
// const  cylinder_material = new THREE.MeshBasicMaterial( {color: "white"} ); 
// const cylinder = new THREE.Mesh( cylinder_geometry, cylinder_material ); 
// cylinder.position.x = -3;
// scene.add( cylinder );

camera.position.z = 5;

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize( window.innerWidth, window.innerHeight );

const rgbeLoader = new RGBELoader();
rgbeLoader.load("https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/goegap_road_1k.hdr", function(texture) {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;
  scene.background = texture;
})

const loader = new GLTFLoader();
loader.load( "src/wooden_box.glb", function ( gltf ) {
	scene.add( gltf.scene );
});

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); // alwayd update camers position is changing
})

// const materialFolder = gui.addFolder('Material');
// materialFolder.add(material, 'roughness', 0, 1).name('Roughness');
// materialFolder.add(material, 'metalness', 0, 1).name('Metalness');
// materialFolder.addColor(material, 'color').name('Color');
// materialFolder.close();

// const meshFolder = gui.addFolder('Mesh');
// meshFolder.add(cube.scale, 'x', 0.1, 5).name('Scale X');
// meshFolder.add(cube.scale, 'y', 0.1, 5).name('Scale Y');
// meshFolder.add(cube.scale, 'z', 0.1, 5).name('Scale Z');
// meshFolder.add(cube.position, 'x', -10, 10).name('Position X');
// meshFolder.add(cube.position, 'y', -10, 10).name('Position Y');
// meshFolder.add(cube.position, 'z', -10, 10).name('Position Z');
// meshFolder.close();

// const lightFolder = gui.addFolder('Lights');

// const ambientFolder = lightFolder.addFolder('Ambient Light');
// ambientFolder.add(ambientlight, 'intensity', 0 , 2).name('Intensity')

// const directionalFolder = lightFolder.addFolder('Directional Light');
// directionalFolder.add(directionalLight, 'intensity', 0, 5).name('Intensity');
// directionalFolder.add(directionalLight.position, 'x', -10, 10).name('Position X');
// directionalFolder.add(directionalLight.position, 'y', -10, 10).name('Position Y');
// directionalFolder.add(directionalLight.position, 'z', -10, 10).name('Position Z');

// const pointFolder = lightFolder.addFolder('Points Light');
// pointFolder.add(pointLight, 'intensity', 0, 5).name('Intensity');
// pointFolder.add(pointLight.position, 'x', -10, 10).name('Position X');
// pointFolder.add(pointLight.position, 'y', -10, 10).name('Position Y');
// pointFolder.add(pointLight.position, 'z', -10, 10).name('Position Z');


const controls = new OrbitControls( camera, renderer.domElement );
// controls.enableDamping = true;
// controls.autoRotate = true; // we can auto rotate using controls
// controls.autoRotateSpeed = 10;
// controls.enableZoom = true;

function animate() {
  window.requestAnimationFrame(animate)
  controls.update();
	renderer.render( scene, camera );
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  // sphere.rotation.x += 0.01;
  // sphere.rotation.y += 0.01;
  // cylinder.rotation.x += 0.01;
  // cylinder.rotation.y += 0.01;
}
animate();