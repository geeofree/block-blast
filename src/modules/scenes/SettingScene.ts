import { Container, Graphics } from "pixi.js";
import { BaseScene } from "./BaseScene";
import { Tokens } from "../deps/Tokens";
import { container } from "../deps/Container";
import { GlobalConfig } from "../deps/GlobalConfig";

export class SettingScene extends BaseScene {
  private globalConfig: GlobalConfig = container.resolve(Tokens.GlobalConfig);

  getScene(): Container {
    const container = new Container();

    const rect = new Graphics();

    rect.rect(0, 0, this.globalConfig.blockSize, this.globalConfig.blockSize).fill('blue');

    container.addChild(rect);

    if (container.parent) {
      container.position.set(container.parent.width / 2, container.parent.height / 2);
      container.pivot.set(container.width / 2, container.height / 2);
    }

    return container;
  }
}
