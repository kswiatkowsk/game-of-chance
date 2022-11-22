import {
  CylinderGeometry,
  Mesh,
  ColorRepresentation,
  Vector3Tuple,
  Quaternion,
  MeshPhongMaterial,
} from "three";
import { Rapier, Collider, RigidBody, World } from "@types";

interface Options {
  radius?: number;
  height?: number;
  color?: ColorRepresentation;
  radialSegments?: number;
  heightSegments?: number;
  translation?: Vector3Tuple;
  rotation?: Quaternion;
}

class Coin {
  readonly collider: Collider;
  readonly mesh: Mesh;
  readonly body: RigidBody;
  static readonly defaultOptions = {
    radius: 1,
    height: 0.3,
    color: 0xffd700,
    radialSegments: 32,
    heightSegments: 1,
    translation: [0, 0, 0] as Vector3Tuple,
    rotation: new Quaternion(0, 0, 0, 0),
  };

  constructor(rapier: Rapier, world: World, options: Options = {}) {
    const {
      height,
      radius,
      color,
      heightSegments,
      radialSegments,
      translation,
    } = {
      ...Coin.defaultOptions,
      ...options,
    };

    this.mesh = new Mesh(
      new CylinderGeometry(
        radius,
        radius,
        height,
        radialSegments,
        heightSegments
      ),
      new MeshPhongMaterial({ color })
    );
    const rigidBodyDesc = rapier.RigidBodyDesc.dynamic().setTranslation(
      ...translation
    );
    const colliderDesc = rapier.ColliderDesc.cylinder(height / 2, radius)
      .setRestitution(0.2)
      .setRestitutionCombineRule(rapier.CoefficientCombineRule.Max);
    this.body = world.createRigidBody(rigidBodyDesc);
    this.collider = world.createCollider(colliderDesc, this.body);
  }

  updateMeshPosition() {
    this.updateMeshTranslation();
    this.updateMeshRotation();
  }
  updateMeshTranslation() {
    const { x, y, z } = this.body.translation();
    this.mesh.position.set(x, y, z);
  }
  updateMeshRotation() {
    const { w, x, y, z } = this.body.rotation();
    this.mesh.setRotationFromQuaternion(new Quaternion(x, y, z, w));
  }
}

export default Coin;
