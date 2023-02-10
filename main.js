import './style.css';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from  'three/examples/jsm/geometries/TextGeometry.js';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)

renderer.render(scene, camera)

// typeface.json font loader
const fontLoader = new FontLoader();
fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
  const textGeometry = new TextGeometry('Emerson Day', {
    font: font,
    size: 8.0,
    height: 2,
  })
const textMaterial = new THREE.MeshNormalMaterial()
const textMesh = new THREE.Mesh(textGeometry, textMaterial)
textMesh.position.x = -36;
textMesh.position.y = -1;
scene.add(textMesh)
})


// const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
// const material = new THREE.MeshStandardMaterial({color: 0xFF6347})
// const torus = new THREE.Mesh(geometry, material);

// scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20, 20, 20)
const ambientLight = new THREE.AmbientLight(0xffffff)

scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200,50);

scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

  star.position.set(x, y, z)
  scene.add(star)

}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('sbg2.jpg')
scene.background = spaceTexture;

const metalBoxTexture = new THREE.TextureLoader().load('metal.jpg')
// const metalBoxTextureNormal = new THREE.TextureLoader().load('metal-normal-map.jpg')

//metal box
const metalBox = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: metalBoxTexture})
)
scene.add(metalBox)
// jupiter
const jupiterTexture = new THREE.TextureLoader().load('jjpg.jpeg')
//const jupiterTextureNormal = new THREE.TextureLoader().load('jupiter-normal-map.jpg')
const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshBasicMaterial({map: jupiterTexture })
)
scene.add(jupiter)

jupiter.position.z = 30;
jupiter.position.setX(-10);

metalBox.position.z = -5;
metalBox.position.x = 2;


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  jupiter.rotation.x += 0.005;
  jupiter.rotation.y += 0.095;
  jupiter.rotation.z = 0.05;

  metalBox.rotation.y += 0.01;
  metalBox.rotation.z += 0.01;

  camera.position.z = t * -0.05;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera

function animate(){
  requestAnimationFrame(animate)
  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;
  //orbit controls
  controls.update();
  
  renderer.render(scene, camera)
}

animate()



 