import { setupPhysics } from "./rapier";
import { ball, render } from "./three";
import "./style.css";

async function main() {
  const { getBallPosition, makeStep } = await setupPhysics();

  function animate() {
    makeStep();
    ball.position.setY(getBallPosition().y);
    render();

    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

main();
