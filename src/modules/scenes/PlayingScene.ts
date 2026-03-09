import { Container } from "pixi.js";
import { BaseScene } from "./BaseScene";
import { Block } from "../components/Block";
import { PixiApp } from "../deps/PixiApp";
import { container } from "../deps/Container";
import { Tokens } from "../deps/Tokens";
import { GlobalConfig } from "../deps/GlobalConfig";
import { Board } from "../components/Board";

type BlockTypes = 
  'O' | 'BIG_O' |
  'L' | 'BIG_L' |
  'J' | 'BIG_J' |
  '7' | 'REVERSE_7' | 
  'T' | 'REVERSE_T' |
  'LEFT_T' | 'RIGHT_T';

type BlockRegistry = Record<BlockTypes, number[]>;

export class PlayingScene extends BaseScene {
  private pixiApp: PixiApp = container.resolve(Tokens.PixiApp);
  private globalConfig: GlobalConfig = container.resolve(Tokens.GlobalConfig);
  private container: Container;

  private static blockRegistry: BlockRegistry = {
    'O': [
      0, 0, 0,
      0, 1, 1,
      0, 1, 1,
    ],
    'BIG_O': [
      1, 1, 1,
      1, 1, 1,
      1, 1, 1,
    ],
    'L': [
      1, 0, 0,
      1, 0, 0,
      1, 1, 0,
    ],
    'BIG_L': [
      1, 0, 0,
      1, 0, 0,
      1, 1, 1,
    ],
    'J': [
      0, 0, 1,
      0, 0, 1,
      0, 1, 1,
    ],
    'BIG_J': [
      0, 0, 1,
      0, 0, 1,
      1, 1, 1,
    ],
    '7': [
      1, 1, 1,
      0, 0, 1,
      0, 0, 1,
    ],
    'REVERSE_7': [
      1, 1, 1,
      1, 0, 0,
      1, 0, 0,
    ],
    'T': [
      1, 1, 1,
      0, 1, 0,
      0, 0, 0,
    ],
    'REVERSE_T': [
      0, 0, 0,
      0, 1, 0,
      1, 1, 1,
    ],
    'LEFT_T': [
      1, 0, 0,
      1, 1, 0,
      1, 0, 0,
    ],
    'RIGHT_T': [
      0, 0, 1,
      0, 1, 1,
      0, 0, 1,
    ],
  }

  constructor() {
    super();
    this.container = new Container();
  }

  getScene(): Container {
    this.buildBoard();
    this.buildBlockSelection();

    this.container.position.set(this.pixiApp.canvasWidth / 2, this.pixiApp.canvasHeight / 2);
    this.container.pivot.set(this.container.width / 2, this.container.height / 2);

    return this.container;
  }

  buildBlockSelection() {
    const blockSelectionContainer = new Container();
    const keys = Object.keys(PlayingScene.blockRegistry) as BlockTypes[];

    let prevX = 0;

    for (let i = 0; i < 3; i++) {
      const randIdx = Math.floor(Math.random() * keys.length);
      const block = new Block(PlayingScene.blockRegistry[keys[randIdx]]);
      const blockContainer = block.render();

      block.drag();

      blockSelectionContainer.addChild(blockContainer);

      blockContainer.x = prevX;

      prevX = blockContainer.x + (this.globalConfig.blockSize * 3) + 8;
    }

    blockSelectionContainer.position.set(0, this.container.height);
    this.container.addChild(blockSelectionContainer);
  }

  buildBoard() {
    const boardContainer = new Container();
    const board = new Board({ row: 7, col: 8 })

    boardContainer.addChild(board.render());

    this.container.addChild(boardContainer);

    boardContainer.position.set(this.container.width / 2, this.container.height / 2);
    boardContainer.pivot.set(boardContainer.width / 2, boardContainer.height / 2);
  }
}
