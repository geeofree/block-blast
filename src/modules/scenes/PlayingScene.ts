import { Container } from "pixi.js";
import { BaseScene } from "./BaseScene";
import { Block } from "../components/Block";
import { PixiApp } from "../deps/PixiApp";
import { container } from "../deps/Container";
import { Tokens } from "../deps/Tokens";
import { GlobalConfig } from "../deps/GlobalConfig";
import { Board } from "../components/Board";
import { BlockPosition } from "../events/BlockPosition";
import { getRandomItem } from "../utils/random";
import { colorRegistry } from "../utils/color";

const blockRegistry = [
  [
    0, 0, 0,
    0, 1, 1,
    0, 1, 1,
  ],
  [
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
  ],
  [
    1, 0, 0,
    1, 0, 0,
    1, 1, 0,
  ],
  [
    1, 0, 0,
    1, 0, 0,
    1, 1, 1,
  ],
  [
    0, 0, 1,
    0, 0, 1,
    0, 1, 1,
  ],
  [
    0, 0, 1,
    0, 0, 1,
    1, 1, 1,
  ],
  [
    1, 1, 1,
    0, 0, 1,
    0, 0, 1,
  ],
  [
    1, 1, 1,
    1, 0, 0,
    1, 0, 0,
  ],
  [
    1, 1, 1,
    0, 1, 0,
    0, 0, 0,
  ],
  [
    0, 0, 0,
    0, 1, 0,
    1, 1, 1,
  ],
  [
    1, 0, 0,
    1, 1, 0,
    1, 0, 0,
  ],
  [
    0, 0, 1,
    0, 1, 1,
    0, 0, 1,
  ],
];

export class PlayingScene extends BaseScene {
  private container: Container;

  private pixiApp: PixiApp = container.resolve(Tokens.PixiApp);
  private globalConfig: GlobalConfig = container.resolve(Tokens.GlobalConfig);
  private blockPosition: BlockPosition = container.resolve(Tokens.BlockPosition);
  private maxSelectionNum: number;

  constructor() {
    super();
    this.container = new Container();
    this.maxSelectionNum = 3;
  }

  getScene(): Container {
    const board = this.buildBoard();
    this.buildBlockSelection();

    this.container.pivot.set(this.container.width / 2, this.container.height / 2);
    this.container.position.set(this.pixiApp.canvasWidth / 2, this.pixiApp.canvasHeight / 2);

    board.collision();

    return this.container;
  }

  buildBlockSelection() {
    const blockSelectionContainer = new Container();

    let prevX = 0;

    for (let i = 0; i < this.maxSelectionNum; i++) {
      const randBlockIdx = getRandomItem(blockRegistry.length);
      const randColorIdx = getRandomItem(colorRegistry.length);

      const blockData = blockRegistry[randBlockIdx];
      const color = colorRegistry[randColorIdx];

      const block = new Block(color, blockData);
      const blockContainer = block.render();

      blockSelectionContainer.addChild(blockContainer);

      blockContainer.x = prevX;

      prevX = blockContainer.x + (this.globalConfig.blockSize * 3) + 8;

      block.drag((dragType) => {
        switch (dragType) {
          case 'drag-down': {
            block.setInitialPosition();
            break;
          }
          case 'drag-move': {
            this.blockPosition.emit({ colorIdx: randColorIdx, blockContainer, dragType });
            break;
          }
          case 'drag-up': {
            this.blockPosition.emit({ colorIdx: randColorIdx, blockContainer, dragType });
            block.returnToInitialPosition();
            break;
          }
        }
      });
    }

    blockSelectionContainer.position.set(0, this.container.height + 16);
    this.container.addChild(blockSelectionContainer);
  }

  buildBoard() {
    const board = new Board({ row: 7, col: 8 })
    const boardContainer = board.render();

    this.container.addChild(boardContainer);

    return board;
  }
}
