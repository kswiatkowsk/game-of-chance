import rapier from "@dimforge/rapier3d";
import * as three from "three";
import Primitive from "./primitive";
import { MeshMaterialType } from "@types";

interface Params {
  material?: MeshMaterialType;
  rigidBodyType?: rapier.RigidBodyType;
  height?: number;
  radius?: number;
  translation?: three.Vector3Tuple;
  color?: three.ColorRepresentation;
  mass?: number;
  radialSegments?: number;
}

class Cylinder extends Primitive {
  static defaultParams = {
    ...Primitive.defaultParams,
    height: 10,
    radius: 1,
    mass: 1,
    color: 0xdddddd,
    radialSegments: 32,
  };

  mesh: three.Mesh;

  constructor({ material, rigidBodyType, ...restParams }: Params = {}) {
    super();

    const { translation, height, radius, color, mass, radialSegments } = {
      ...Cylinder.defaultParams,
      ...restParams,
    };

    this.mesh = new three.Mesh(
      new three.CylinderGeometry(radius, radius, height, radialSegments),
      new (this.MeshMaterial(material))({ color })
    );
    this.rigidBodyDesc = this.RigidBodyDesc(rigidBodyType)();
    this.rigidBodyDesc.setTranslation(...translation);
    this.colliderDesc = rapier.ColliderDesc.cylinder(
      height / 2,
      radius
    ).setMass(mass);
  }
}

export default Cylinder;
