import { Rapier, Collider, World } from "@types";
import {
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  ColorRepresentation,
} from "three";

interface Options {
  dimensions?: [number, number];
  color?: ColorRepresentation;
}

class Ground {
  readonly collider: Collider;
  readonly mesh: Mesh;
  static readonly defaultOptions = {
    dimensions: [10, 10],
    color: 0xaaaaaa,
  };

  constructor(rapier: Rapier, world: World, options: Options = {}) {
    const { color, dimensions } = { ...Ground.defaultOptions, ...options };

    const colliderDesc = rapier.ColliderDesc.cuboid(
      dimensions[0],
      0,
      dimensions[1]
    );
    this.collider = world.createCollider(colliderDesc);

    this.mesh = new Mesh(
      new PlaneGeometry(...dimensions),
      new MeshBasicMaterial({ color })
    );
    this.mesh.rotateX(Math.PI * -0.5);
  }
}

export default Ground;
