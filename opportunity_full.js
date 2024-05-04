import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { HemisphereLight } from 'three';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

import getStarfield from "./src/getStarfield.js";
import { getFresnelMat } from "./src/getFresnelMat.js";

const modelCanvas = document.querySelector(".model_canvas")


const roversSection = document.querySelector(".model_canvas");
let rover, roverGroup;


const roverScene = new THREE.Scene();
const roverCamera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
roverGroup = new THREE.Group();
const modelLoader = new GLTFLoader()
roverScene.add(roverGroup);

modelLoader.load("/textures/opportunity.glb", function(gltf) {
    console.log(gltf);
    rover = gltf.scene.children[0];
    roverGroup.add(rover)
    roverScene.add(gltf.scene);
    animate();
})


// Ambient light to softly illuminate the model from all angles
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
roverScene.add(ambientLight);

// Directional light to simulate sunlight
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.75);
directionalLight.position.set(50, 50, 100);
roverScene.add(directionalLight);

// Additional point lights
const pointLightFront = new THREE.PointLight(0xffffff, 0.6, 1000);
pointLightFront.position.set(0, 0, 100);
roverScene.add(pointLightFront);

const pointLightBack = new THREE.PointLight(0xffffff, 0.6, 1000);
pointLightBack.position.set(0, 0, -100);
roverScene.add(pointLightBack);

const pointLightLeft = new THREE.PointLight(0xffffff, 0.6, 1000);
pointLightLeft.position.set(-100, 0, 0);
roverScene.add(pointLightLeft);

const pointLightRight = new THREE.PointLight(0xffffff, 0.6, 1000);
pointLightRight.position.set(100, 0, 0);
roverScene.add(pointLightRight);

// Point light from top
const pointLightTop = new THREE.PointLight(0xffffff, 0.8, 1000);
pointLightTop.position.set(0, 100, 0);
roverScene.add(pointLightTop);

// Point light from bottom
const pointLightBottom = new THREE.PointLight(0xffffff, 0.8, 1000);
pointLightBottom.position.set(0, -100, 0);
roverScene.add(pointLightBottom);

roverCamera.position.z = 3.5;
const roverRenderer = new THREE.WebGLRenderer({ antialias: true });
roverRenderer.shadowMapEnabled = true
roverRenderer.setSize(window.innerWidth, window.innerHeight);
roversSection.appendChild(roverRenderer.domElement);
roverGroup.position.y = -1
const controls = new OrbitControls( roverCamera, roverRenderer.domElement);

roverRenderer.setClearColor(0xcccccc)
roverRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
roverRenderer.shadowMap.enabled = true;
roverRenderer.gammaOutput = true;






const animate = () => {
    requestAnimationFrame(animate)
    // roverGroup.rotation.y += 0.008
    controls.update();
    const time = Date.now() * 0.0005;
    const color5 = new THREE.Color( 'skyblue' );
    roverScene
    roverRenderer.render(roverScene, roverCamera)
    
}






animate();

