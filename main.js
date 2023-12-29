import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//import * as CANNON from "cannon";

function applyRotationToVector(offset, obj) {
    offset.applyEuler(obj.rotation);
    offset.add(obj.position);
    return offset;
}
function updateCamera(camera, obj) {
    /*const newCameraPos = applyRotationToVector(new THREE.Vector3(0, 5, -15), obj);
    const newCameraAngle = applyRotationToVector(new THREE.Vector3(0, 5, 0), obj);
    camera.position.copy(newCameraPos);
    camera.lookAt(newCameraAngle);*/

    
    camera.position.copy(obj.position);
    camera.position.z += 10;
    camera.position.y += 3;
    
}

function movePlayer(obj) {
    if (keyboard["w"]) {
        obj.translateZ(1);
    }
    if (keyboard["s"]) { 
        obj.translateZ(-1);
    }
    if (keyboard["a"]) {
        obj.rotateY(0.04);
    }
    if (keyboard["d"]) { 
        obj.rotateY(-0.04);
    }
}

function addKeysListener(){
    window.addEventListener('keydown', function(event){
      keyboard[event.key] = true;
    } , false);
    window.addEventListener('keyup', function(event){
      keyboard[event.key] = false;
    } , false);
  }

function animate() {
	requestAnimationFrame( animate );

	//cube.rotation.x += 0.01;
	//cube.rotation.y += 0.01;
    //updateCamera();
    //controls.update();
    //updateCamera();
	renderer.render( scene, camera );
    movePlayer(car);
    updateCamera(camera, car);
    //controls.update();
}

let keyboard = {};

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xFFFFFFFF );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//const controls = new OrbitControls(camera, renderer.domElement);

const geo = new THREE.PlaneGeometry(100, 100);
const mat = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
const plane = new THREE.Mesh(geo, mat);
plane.rotateX( - Math.PI / 2);

scene.add(plane);

var grid = new THREE.GridHelper(100, 10);
scene.add(grid);

camera.position.z = 10;
camera.position.y = 5;

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
let car = new THREE.Mesh( geometry, material );

const loader = new GLTFLoader();
//var car; 

loader.load( 'assets/accord.glb', function ( gltf ) {
    car = gltf.scene;
	scene.add( gltf.scene );
}, undefined, function ( error ) {
	console.error( error );
} );

//car.position.y = 1;
scene.add( car );

const ambient = new THREE.HemisphereLight(0xffffbb, 0x080820);
scene.add(ambient);

const light = new THREE.DirectionalLight(0xFFFFFF, 1);
light.position.set( 1, 10, 6);
scene.add(light);

/*window.addEventListener('keyup', (e) => {
    if (e.code === "ArrowUp")        
        cube.position.z += 1
    else if (e.code === "ArrowDown")
        cube.position.z -= 1
    else if (e.code == "ArrowLeft")
        cube.position.x += 1
    else if (e.code == "ArrowRight")
        cube.position.x -= 1
});*/
scene.background = new THREE.Color( 0xFF21351 );
addKeysListener();
animate();