import { Container, Graphics } from "pixi.js";
import { BaseScene } from "./BaseScene";
import { GlobalConfig } from "../deps/GlobalConfig";
import { container } from "../deps/Container";
import { Tokens } from "../deps/Tokens";
import { PixiApp } from "../deps/PixiApp";

export class MenuScene extends BaseScene {
  private globalConfig: GlobalConfig = container.resolve(Tokens.GlobalConfig);
  private pixiApp: PixiApp = container.resolve(Tokens.PixiApp);

  getScene(): Container {
    const container = new Container();

    const rect = new Graphics();

    rect.rect(0, 0, this.globalConfig.blockSize, this.globalConfig.blockSize).fill('red');

    container.addChild(rect);

    container.position.set(this.pixiApp.canvasWidth / 2, this.pixiApp.canvasHeight / 2);
    container.pivot.set(container.width / 2, container.height / 2);

    return container;
  }
}
