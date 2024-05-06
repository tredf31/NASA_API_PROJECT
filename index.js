import * as THREE from "three";
// import { OrbitControls } from 'jsm/controls/OrbitControls.js';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

import getStarfield from "./src/getStarfield.js";
import { getFresnelMat } from "./src/getFresnelMat.js";

const containerStartPage = document.querySelector(".container")

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, w / h, 0.1, 1000);
camera.position.z = 6;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
containerStartPage.appendChild(renderer.domElement);

const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(earthGroup);





const detail = 12;
const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, detail);
const material = new THREE.MeshPhongMaterial({
  map: loader.load("./textures/mars_1k_color.jpg"),
  specularMap: loader.load("./textures/mars_1k_normal.jpg"),
  bumpMap: loader.load("./textures/mars_1k_topo.jpg"),
  bumpScale: 0.04,
});
const earthMesh = new THREE.Mesh(geometry, material);
earthGroup.add(earthMesh);



camera.fov = 20
camera.updateProjectionMatrix();

const stars = getStarfield({numStars: 2000});
scene.add(stars);

const sunLight = new THREE.DirectionalLight(0xffffff);
sunLight.position.set(-2, 0.5, 1.5);
scene.add(sunLight);
earthMesh.position.x = 1;
earthMesh.position.y = 0.7;
earthMesh.position.z = -2;
function animate() {
  requestAnimationFrame(animate);
  earthMesh.rotation.y += 0.002;
  stars.rotation.y -= 0.0002;
  renderer.render(scene, camera);
}

window.addEventListener("scroll", (e) => {
  console.log(window.scrollY);
  
})

animate();

function handleWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  if(window.innerWidth < 1040) {

    earthGroup.position.x = -1;
    camera.fov = 30
  }
}
window.addEventListener('resize', handleWindowResize, false);

// async function fetchMarsWeather(apiKey) {
//   const baseUrl = 'http://marsweather.ingenology.com/v1/latest/';
//   try {
//       const response = await fetch(`${baseUrl}`);
//       if (!response.ok) {
//           throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       console.log(data);
//   } catch (error) {
//       console.error('Failed to fetch Mars weather data:', error);
//       return null;
//   }
// }

// // Example usage

// const apiKey = 'M8Fy06vCGeWw8hQMXllRWaerM5n0aJvyGakzy5NN'; // Replace with your actual API key
// fetchMarsWeather(apiKey).then(marsWeather => {
//   console.log(marsWeather);
// });

const roverScene = new THREE.Scene();
const roverCamera = new THREE.PerspectiveCamera(70, w / h, 0.1, 1000);
roverCamera.position.z = 6;
const roverRenderer = new THREE.WebGLRenderer({ antialias: true });
roverRenderer.setSize(w, h);
containerStartPage.appendChild(renderer.domElement);


// const textSpan = document.querySelector(".text");
// const copyText = textSpan.textContent;
// textSpan.textContent = '';

// for(let i = 0; i < copyText.length; i++) {

// }

let typed = new Typed(".text_span", {
  typeSpeed: 20,
  backSpeed: 20,
  startDelay: 100,
  strings: ["Embark on an extraordinary journey to Mars and unlock the secrets <br> of the Red Planet's captivating landscapes and ancient mysteries"],
  showCursor: false,
})