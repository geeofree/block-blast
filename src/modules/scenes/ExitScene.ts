import { Container, Graphics } from "pixi.js";
import { BaseScene } from "./BaseScene";

export class ExitScene extends BaseScene {
  getScene(): Container {
    const container = new Container();

    const rect = new Graphics();

    rect.fill('red').rect(0, 0, 64, 64);

    container.addChild(rect);

    if (container.parent) {
      container.position.set(container.parent.width / 2, container.parent.height / 2);
      container.pivot.set(container.width / 2, container.height / 2);
    }

    return container;
  }
}
