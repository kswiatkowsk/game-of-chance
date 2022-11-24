import rapier from "@dimforge/rapier3d";
import * as three from "three";
import Primitive from "./primitive";
import { MeshMaterialType } from "@types";

interface Params {
  material?: MeshMaterialType;
  rigidBodyType?: rapier.RigidBodyType;
  translation?: three.Vector3Tuple;
  dimensions?: three.Vector3Tuple;
  color?: three.ColorRepresentation;
}

class Box extends Primitive {
  static defaultParams = {
    ...Primitive.defaultParams,
    dimensions: [1, 1, 1] as three.Vector3Tuple,
    color: 0xdddddd,
  };

  mesh: three.Mesh;

  constructor({ material, rigidBodyType, ...restParams }: Params = {}) {
    super();

    const { translation, dimensions, color } = {
      ...Box.defaultParams,
      ...restParams,
    };

    this.mesh = new three.Mesh(
      new three.BoxGeometry(...dimensions),
      new (this.MeshMaterial(material))({ color })
    );
    this.mesh.position.set(...translation);
    this.rigidBodyDesc = this.RigidBodyDesc(rigidBodyType)();
    this.rigidBodyDesc.setTranslation(...translation);
    this.colliderDesc = rapier.ColliderDesc.cuboid(
      ...new three.Vector3().fromArray(dimensions).divideScalar(2).toArray()
    );
  }
}

export default Box;
