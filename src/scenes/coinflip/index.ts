import { Ground, Coin } from "../../objects";
import { PerspectiveCamera, PointLight, Scene, WebGLRenderer } from "three";

async function coinflip() {
  const rapier = await import("@dimforge/rapier3d");
  const gravity = { x: 0.0, y: -9.81, z: 0.0 };
  const world = new rapier.World(gravity);
  const ground = new Ground(rapier, world, { dimensions: [100, 100] });
  const coin = new Coin(rapier, world, { translation: [0, 10, 0] });
  coin.body.applyImpulseAtPoint(
    { x: 0, y: 5 + Math.random() * 10, z: 0.0 },
    {
      x: 0.1,
      y: 0,
      z: 0.2,
    },
    true
  );
  const scene = new Scene();
  const light = new PointLight(0xffffff, 1, 1000);
  light.position.set(0, 50, 0);
  scene.add(coin.mesh, ground.mesh, light);
  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.set(0, 20, 20);

  const renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  function animate() {
    const { x, y, z } = coin.body.translation();
    camera.lookAt(x, y, z);
    renderer.render(scene, camera);
    world.step();
    coin.updateMeshPosition();
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

export default coinflip;
