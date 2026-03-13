import { Container } from "pixi.js";
import { BaseScene } from "./BaseScene";
import { PixiApp } from "../deps/PixiApp";
import { container } from "../deps/Container";
import { Tokens } from "../deps/Tokens";
import { Board } from "../components/Board";
import { BlockTray } from "../components/BlockTray";

export class PlayingScene extends BaseScene {
  private pixiApp: PixiApp = container.resolve(Tokens.PixiApp);

  getScene(): Container {
    const board = new Board({ row: 7, col: 8 })
    const boardContainer = board.render();

    const blockTray = new BlockTray(3);
    const blockTrayContainer = blockTray.render();

    this.container.addChild(boardContainer);
    this.container.addChild(blockTrayContainer);

    blockTrayContainer.position.set(0, boardContainer.y + boardContainer.height + 32);

    this.container.pivot.set(this.container.width / 2, this.container.height / 2);
    this.container.position.set(this.pixiApp.canvasWidth / 2, this.pixiApp.canvasHeight / 2);

    board.placeBlockListener((trayItemIdx) => {
      blockTray.regenerateTray(trayItemIdx);
    });

    return this.container;
  }
}
