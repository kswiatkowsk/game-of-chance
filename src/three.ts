import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  MeshBasicMaterial,
  Mesh,
  PlaneGeometry,
  SphereGeometry,
} from "three";

const scene = new Scene();
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 5, 10);
camera.lookAt(0, 5, 0);

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new SphereGeometry(0.5, 32, 16);
const material = new MeshBasicMaterial({ color: 0x00ff00 });
const ball = new Mesh(geometry, material);
scene.add(ball);

function ground() {
  const geometry = new PlaneGeometry(10, 10);
  const material = new MeshBasicMaterial({ color: 0xdddddd });
  const mesh = new Mesh(geometry, material);
  mesh.rotateX(Math.PI * -0.5);
  return mesh;
}
scene.add(ground());

const render = () => renderer.render(scene, camera);
export { ball, render };
