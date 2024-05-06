import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

import getStarfield from "./src/getStarfield.js";
import { getFresnelMat } from "./src/getFresnelMat.js";

const w = 640;
const h = 480;
const roversSection = document.querySelector(".model_curiosity");
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

    roverScene.rotation.y += 0.008
    requestAnimationFrame(animate)
    // controls.update();
    roverRenderer.render(roverScene, roverCamera)
    
}



// function handleWindowResize () {
//     roverCamera.aspect = window.innerWidth / window.innerHeight;
//     roverCamera.fov = 20
//     roverCamera.updateProjectionMatrix();
//     roverRenderer.setSize(window.innerWidth, window.innerHeight);
//   }
window.addEventListener('resize', () => {
    if(window.innerWidth < 400){
        roverRenderer.setSize(400, 480)
    }
}, false);


animate();


const textAnimator = (textArr, typeSpeed, showCursor, startDelay) => {
    let typed = new Typed(".curiosity_description_text", {
        typeSpeed: typeSpeed,
        startDelay: startDelay,
        strings: textArr,
        showCursor: showCursor,
      })
    return;
}

window.addEventListener("scroll", function textDelay() {
    if(window.scrollY > 600){
    textAnimator(["Is a car-sized Mars rover exploring Gale crater and Mount Sharp on Mars as part of NASA's Mars Science Laboratory (MSL) mission. Curiosity was launched from Cape Canaveral (CCAFS) on November 26, 2011, at 15:02:00 UTC and landed on Aeolis Palus inside Gale crater on Mars on August 6, 2012, 05:17:57 UTC. The Bradbury Landing site was less than 2.4 km (1.5 mi) from the center of the rover's touchdown target after a 560 million km (350 million mi) journey."], 5, false, 20);
    removeEventListener("scroll", textDelay)
    }
})
