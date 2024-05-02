import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

import getStarfield from "./src/getStarfield.js";
import { getFresnelMat } from "./src/getFresnelMat.js";

const w = 640;
const h = 480;
const roversSection = document.querySelector(".rovers");
let rover, roverGroup;


const roverScene = new THREE.Scene();
const roverCamera = new THREE.PerspectiveCamera(70, w / h, 0.1, 1000);
roverGroup = new THREE.Group();
const modelLoader = new GLTFLoader()
roverScene.add(roverGroup);

modelLoader.load("/textures/Perseverance.glb", function(gltf) {
    console.log(gltf);
    rover = gltf.scene.children[0];
    roverGroup.add(rover)
    roverScene.add(gltf.scene);
    animate();
});

roverGroup.position.y = -1;


const light = new THREE.DirectionalLight(0xFfffffff, 2)
light.position.set(2,2,5);
roverScene.add(light)


roverCamera.position.z = 6;
const roverRenderer = new THREE.WebGLRenderer({ antialias: true });
roverRenderer.setSize(w, h);
roversSection.appendChild(roverRenderer.domElement);
// const controls = new OrbitControls( roverCamera, roverRenderer.domElement);

roverRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
roverRenderer.shadowMap.enabled = true;
roverRenderer.gammaOutput = true;






const animate = () => {
    requestAnimationFrame(animate)
    roverGroup.rotation.y += 0.0002
    // controls.update();
    roverRenderer.render(roverScene, roverCamera)
    
}



function handleWindowResize () {
    roverCamera.aspect = window.innerWidth / window.innerHeight;
    roverCamera.fov = 20
    roverCamera.updateProjectionMatrix();
    roverRenderer.setSize(window.innerWidth, window.innerHeight);
  }
window.addEventListener('resize', handleWindowResize, false);


animate();