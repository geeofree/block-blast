import { ContainerChild } from "pixi.js";
import { Tokens } from "./deps/Tokens";
import { GlobalConfig } from "./deps/GlobalConfig";
import { container } from "./deps/Container";
import { GameState } from "./stateMachines/GameState";
import { Scenes } from "./scenes/Scenes";
import { PixiApp } from "./deps/PixiApp";

export class Game {
  static dependencies = [Tokens.GlobalConfig, Tokens.GameState, Tokens.PixiApp];

  private globalConfig: GlobalConfig = container.resolve(Tokens.GlobalConfig);
  private gameState = container.resolve<GameState>(Tokens.GameState);
  private pixiApp = container.resolve<PixiApp>(Tokens.PixiApp);

  private async init() {
    await this.pixiApp.init({ resizeTo: window });
    this.pixiApp.attachToDOMParent(this.globalConfig.rootElement);
    this.start();
  }

  private start() {
    let root: ContainerChild | null = null;

    if (root === null) {
      root = Scenes.getSceneFromGameState(this.gameState.state);
      this.pixiApp.stage.addChild(root);
    }
  }

  static start() {
    const game = new this();
    game.init();
  }
}
