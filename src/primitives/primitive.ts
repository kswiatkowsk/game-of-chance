import rapier from "@dimforge/rapier3d";
import * as three from "three";
import { Vector3Tuple } from "three";
import { MeshMaterialType } from "@types";

class Primitive {
  mesh?: three.Mesh;
  rigidBody?: rapier.RigidBody;
  rigidBodyDesc?: rapier.RigidBodyDesc;
  colliderDesc?: rapier.ColliderDesc;
  static defaultParams = {
    translation: [0, 10, 0] as Vector3Tuple,
  };

  MeshMaterial(m?: MeshMaterialType) {
    switch (m) {
      case MeshMaterialType.Basic:
        return three.MeshBasicMaterial;
      case MeshMaterialType.Lambert:
        return three.MeshLambertMaterial;
      case MeshMaterialType.Phong:
        return three.MeshPhongMaterial;
      default:
        return three.MeshBasicMaterial;
    }
  }

  RigidBodyDesc(t?: rapier.RigidBodyType) {
    switch (t) {
      case rapier.RigidBodyType.Dynamic:
        return rapier.RigidBodyDesc.dynamic;
      case rapier.RigidBodyType.Fixed:
        return rapier.RigidBodyDesc.fixed;
      case rapier.RigidBodyType.KinematicPositionBased:
        return rapier.RigidBodyDesc.kinematicPositionBased;
      case rapier.RigidBodyType.KinematicVelocityBased:
        return rapier.RigidBodyDesc.kinematicVelocityBased;
      default:
        return rapier.RigidBodyDesc.dynamic;
    }
  }

  createBody(world: rapier.World) {
    if (!this.rigidBodyDesc) {
      console.error(`rigidBodyDesc is ${this.rigidBodyDesc}`);
      return this;
    }
    this.rigidBody = world.createRigidBody(this.rigidBodyDesc);
    return this;
  }

  createCollider(world: rapier.World) {
    if (!this.colliderDesc) {
      console.error(`colliderDesc is ${this.colliderDesc}`);
      return this;
    }
    world.createCollider(this.colliderDesc, this.rigidBody);
    return this;
  }

  createBodyAndCollider(world: rapier.World) {
    return this.createBody(world).createCollider(world);
  }

  addToScene(scene: three.Scene) {
    if (!this.mesh) {
      console.error(`mesh is ${this.mesh}`);
      return this;
    }
    scene.add(this.mesh);
    return this;
  }

  updateMeshPosition() {
    return this.updateMeshTranslation().updateMeshRotation();
  }

  updateMeshTranslation() {
    if (!this.rigidBody) {
      console.error(`rigidBody is ${this.rigidBody}`);
      return this;
    }
    const { x, y, z } = this.rigidBody.translation();
    this.mesh?.position.set(x, y, z);
    return this;
  }

  updateMeshRotation() {
    if (!this.rigidBody) {
      console.error(`rigidBody is ${this.rigidBody}`);
      return this;
    }
    const { w, x, y, z } = this.rigidBody.rotation();
    this.mesh?.setRotationFromQuaternion(new three.Quaternion(x, y, z, w));
    return this;
  }

  focus(camera: three.Camera) {
    if (!this.rigidBody) {
      console.error(`rigidBody is ${this.rigidBody}`);
      return this;
    }
    const { x, y, z } = this.rigidBody.translation();
    camera.lookAt(x, y, z);
    return this;
  }
}

export default Primitive;
