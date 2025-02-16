import * as THREE from "three";
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js';
import gsap from 'gsap';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 3.5;


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('canvas'),
  antialias: true,
  alpha: true
})
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;

const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const rgbShiftPass = new ShaderPass(RGBShiftShader);
rgbShiftPass.uniforms['amount'].value = 0.0030;
composer.addPass(rgbShiftPass);

const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();

let model;

new RGBELoader().load("https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/autumn_field_puresky_1k.hdr", function(texture) {
  const envMap = pmremGenerator.fromEquirectangular(texture).texture;
  // scene.background = envMap;
  scene.environment =  envMap;
  texture.dispose();
  pmremGenerator.dispose();

  const loader = new GLTFLoader();
  loader.load('public/DamagedHelmet.gltf', (gltf) => {
    model = gltf.scene;
    scene.add(gltf.scene);
  }, undefined, (error) => {
    console.log('error', error)
  })
})

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); // always update cameras position is changing
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight)
});

window.addEventListener('mousemove', (e) => {
    if(model) {
      const rotationX = (e.clientX/window.innerWidth - 0.5) * (Math.PI * 0.12);
      const rotationY = (e.clientY/window.innerHeight - 0.5) * (Math.PI * 0.12);
      gsap.to(model.rotation, {
        x: rotationY,
        y: rotationX,
        duration: 0.5,
        ease: "power2.out"
      })
    }
})

// const controls = new OrbitControls( camera, renderer.domElement );
// controls.enableDamping = true;

function animate() {
  window.requestAnimationFrame(animate);
  // controls.update();
  // mesh.rotation.x +=0.01;
  // renderer.render(scene, camera);
  composer.render();
}

animate();

