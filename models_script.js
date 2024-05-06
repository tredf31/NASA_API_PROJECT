import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { HemisphereLight } from 'three';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

import getStarfield from "./src/getStarfield.js";
import { getFresnelMat } from "./src/getFresnelMat.js";


const selectModel = document.querySelector(".model_dropdown")


const setModelOpportunity = () => {
    const modelCanvas = document.querySelector(".model_canvas")
    modelCanvas.innerHTML = ''
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
    modelCanvas.appendChild(roverRenderer.domElement);
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

        roverScene
        roverRenderer.render(roverScene, roverCamera)
        
    }






    animate();

}

const setModelCuriosity = () => {
    const modelCanvas = document.querySelector(".model_canvas")
    modelCanvas.innerHTML = ''
    const w = window.innerWidth;
    const h = window.innerHeight;

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
    roverScene.add(light);

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


    roverCamera.position.z = 6;
    const roverRenderer = new THREE.WebGLRenderer({ antialias: true });
    roverRenderer.setSize(w, h);
    roverRenderer.setClearColor(0xcccccc)
    modelCanvas.appendChild(roverRenderer.domElement);

    const controls = new OrbitControls( roverCamera, roverRenderer.domElement);

    roverRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    roverRenderer.shadowMap.enabled = true;
    roverRenderer.gammaOutput = true;



    roverGroup.scale.set(2,2,2)
    roverCamera.fov = 20;

    const animate = () => {
        requestAnimationFrame(animate)
        controls.update();
        roverRenderer.render(roverScene, roverCamera)
        
    }

    const canvas = document.querySelector("canvas");

    function getWidth() {
        return parseInt(window.getComputedStyle(canvas).width);
      }
      
      function getHeight() {
        return parseInt(window.getComputedStyle(canvas).height);
      }



    function handleWindowResize () {
        roverCamera.aspect = getWidth() / getHeight();
        roverCamera.updateProjectionMatrix();
        console.log(window.innerWidth);
        roverRenderer.setSize(window.innerWidth, window.innerHeight);
    }
    addEventListener('resize', handleWindowResize, false);


    animate();
}

const setModelMars = () => {
    const modelCanvas = document.querySelector(".model_canvas");
    modelCanvas.innerHTML = ''

    const w = window.innerWidth;
    const h = window.innerHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, w / h, 0.1, 1000);
    camera.position.z = 6;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    modelCanvas.appendChild(renderer.domElement);

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

    camera.fov = 30;
    camera.updateProjectionMatrix();

    const stars = getStarfield({numStars: 2000});
    scene.add(stars);

    const sunLight = new THREE.DirectionalLight(0xffffff);
    sunLight.position.set(-2, 0.5, 1.5);
    scene.add(sunLight);
    earthMesh.position.x = 0;
    earthMesh.position.y = 0;
    earthMesh.position.z = 0;
    const controls = new OrbitControls( camera, renderer.domElement);

    function animate() {
        requestAnimationFrame(animate);
        earthMesh.rotation.y += 0.002;
        stars.rotation.y -= 0.0002;
        renderer.render(scene, camera);
        controls.update()
        }

    window.addEventListener("scroll", (e) => {
        console.log(window.scrollY);

    })

    animate();


    function handleWindowResize () {
        
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.fov = 30;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    window.addEventListener('resize', handleWindowResize, false);
}


const updateModel = () => {
    if (selectModel.value === "curiosity") {
        setModelCuriosity();
    } else if (selectModel.value === "opportunity") {
        setModelOpportunity();
    } else if (selectModel.value === "mars") {
        setModelMars();
    }
}

window.addEventListener("DOMContentLoaded", setModelCuriosity)

selectModel.addEventListener("change" , updateModel);