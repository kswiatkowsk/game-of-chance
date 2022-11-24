import {
  DirectionalLight,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { Cylinder, Box } from "../../primitives";
import { MeshMaterialType } from "@types";

async function coinflip() {
  const rapier = await import("@dimforge/rapier3d");
  const scene = new Scene();
  const light = new DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1);
  light.target.position.set(0, 0, 0);
  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 1, 1);
  const gravity = { x: 0.0, y: -9.81, z: 0.0 };
  const world = new rapier.World(gravity);
  const ground = new Box({
    rigidBodyType: rapier.RigidBodyType.Fixed,
    dimensions: [100, 1, 100],
    translation: [0, 0, 0],
  })
    .createBodyAndCollider(world)
    .addToScene(scene);
  const coin = new Cylinder({
    height: 2 / 1000,
    radius: 21.5 / 1000,
    translation: [0, 0.5, 0],
    color: 0xffd700,
    mass: 5.21 / 1000,
    material: MeshMaterialType.Phong,
  })
    .createBodyAndCollider(world)
    .addToScene(scene);

  window.onclick = () => {
    coin.rigidBody?.applyImpulse({ x: 0, y: 0.06, z: 0 }, true);
    setTimeout(() => {
      coin.rigidBody?.applyImpulseAtPoint(
        { x: 0.001, y: 0, z: 0.0 },
        {
          x: 0.1,
          y: 0,
          z: 0.2,
        },
        true
      );
    }, 1);
  };

  scene.add(ground.mesh, light);
  const renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  function animate() {
    renderer.render(scene, camera);
    world.step();
    coin
      .updateMeshPosition()
      .cameraFollow(camera, [1, 1, 1])
      .focus(camera)
      .illuminate(light);
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

export default coinflip;
