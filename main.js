import './style.css';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)

renderer.render(scene, camera)

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({color: 0xFF6347})
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)

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
const metalBoxTextureNormal = new THREE.TextureLoader().load('metal-normal-map.jpg')

//metal box
const metalBox = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: metalBoxTexture})
)
scene.add(metalBox)
// jupiter
const jupiterTexture = new THREE.TextureLoader().load('jjpg.jpeg')
const jupiterTextureNormal = new THREE.TextureLoader().load('jupiter-normal-map.jpg')
const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshBasicMaterial({map: jupiterTexture })
)
scene.add(jupiter)

jupiter.position.z = 30;


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  jupiter.rotation.x += 0.05;
  jupiter.rotation.y += 0.075;

  metalBox.rotation.y += 0.01;
  metalBox.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera
function animate(){
  requestAnimationFrame(animate)
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  //orbit controls
  controls.update();
  
  renderer.render(scene, camera)
}

animate()



 