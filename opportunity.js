import * as THREE from "three";
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

import getStarfield from "./src/getStarfield.js";
import { getFresnelMat } from "./src/getFresnelMat.js";

const w = 640;
const h = 480;
const roversSection = document.querySelector(".opportunity_rover_container");
let rover, roverGroup;


const roverScene = new THREE.Scene();
const roverCamera = new THREE.PerspectiveCamera(70, w / h, 0.1, 1000);
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


const light = new THREE.DirectionalLight(0xFfffffff, 2)
light.position.set(2,2,5);
roverScene.add(light)


roverCamera.position.z = 3.5;
const roverRenderer = new THREE.WebGLRenderer({ antialias: true });
roverRenderer.setSize(w, h);
roversSection.appendChild(roverRenderer.domElement);
roverGroup.position.y = -1
// const controls = new OrbitControls( roverCamera, roverRenderer.domElement);

roverRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
roverRenderer.shadowMap.enabled = true;
roverRenderer.gammaOutput = true;






const animate = () => {
    requestAnimationFrame(animate)
    roverGroup.rotation.y += 0.0002
    // controls.update();
    const time = Date.now() * 0.0005;
    const color5 = new THREE.Color( 'skyblue' );
    roverScene
    roverRenderer.render(roverScene, roverCamera)
    
}






animate();


let counter = 0;
window.addEventListener("scroll", () => {

    if(window.scrollY > 670 && counter === 0) {
        counter + 1;
        let typed = new Typed(".opportunity_description_text", {
            typeSpeed: 1,
            startDelay: 500,
            strings: ["Opportunity, also known as MER-B (Mars Exploration Rover – B) or MER-1, is a robotic rover that was active on Mars from 2004 until 2018. Opportunity was operational on Mars for 5111 sols (14 years, 138 days on Earth). Launched on July 7, 2003, as part of NASA's Mars Exploration Rover program, it landed in Meridiani Planum on January 25, 2004, three weeks after its twin, Spirit (MER-A), touched down on the other side of the planet. With a planned 90-sol duration of activity (slightly less than 92.5 Earth days), Spirit functioned until it got stuck in 2009 and ceased communications in 2010, while Opportunity was able to stay operational for 5111 sols after landing, maintaining its power and key systems through continual recharging of its batteries using solar power, and hibernating during events such as dust storms to save power. This careful operation allowed Opportunity to operate for 57 times its designed lifespan, exceeding the initial plan by 14 years, 47 days (in Earth time). By June 10, 2018, when it last contacted NASA, the rover had traveled a distance of 45.16 kilometers (28.06 miles)."],
            showCursor: false,
          })
    } else return;
})