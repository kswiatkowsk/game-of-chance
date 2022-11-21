async function setupPhysics() {
  const RAPIER = await import("@dimforge/rapier3d");
  // Use the RAPIER module here.
  let gravity = { x: 0.0, y: -9.81, z: 0.0 };
  let world = new RAPIER.World(gravity);

  // Create the ground
  let groundColliderDesc = RAPIER.ColliderDesc.cuboid(10.0, 0.0, 10.0);
  world.createCollider(groundColliderDesc);

  // Create a dynamic rigid-body.
  let rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic().setTranslation(
    0.0,
    5.0,
    0.0
  );
  let rigidBody = world.createRigidBody(rigidBodyDesc);

  // Create a cuboid collider attached to the dynamic rigidBody.
  let colliderDesc = RAPIER.ColliderDesc.ball(0.5)
    .setRestitution(0.7)
    .setRestitutionCombineRule(RAPIER.CoefficientCombineRule.Max);
  let collider = world.createCollider(colliderDesc, rigidBody);

  const makeStep = () => world.step();
  const getBallPosition = () => rigidBody.translation();

  return { makeStep, getBallPosition };
}

export { setupPhysics };
