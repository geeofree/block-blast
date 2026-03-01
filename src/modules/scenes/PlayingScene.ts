import { Container } from "pixi.js";
import { BaseScene } from "./BaseScene";
import { Block } from "../components/Block";
import { PixiApp } from "../deps/PixiApp";
import { container } from "../deps/Container";
import { Tokens } from "../deps/Tokens";

export class PlayingScene extends BaseScene {
  private pixiApp: PixiApp = container.resolve(Tokens.PixiApp);

  getScene(): Container {
    const container = new Container();

    const block = new Block([
      0, 0, 1,
      0, 0, 1,
      1, 1, 1,
    ]);

    container.addChild(block.render());
    container.position.set(this.pixiApp.canvasWidth / 2, this.pixiApp.canvasHeight / 2);

    return container;
  }
}
