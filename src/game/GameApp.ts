import { Application } from 'pixi.js';
import { Block } from '../entities/Block';
import { Flex } from '../entities/Flex';
import { GameConfig } from './GameConfig';
import { Board } from '../entities/Board';

export class GameApp {
  private app: Application;

  constructor() {
    this.app = new Application();
  }

  public async init() {
    if (process.env.NODE_ENV === 'development') {
      (window as any).__PIXI_APP__ = this.app;
    }

    await this.app.init({ resizeTo: window, backgroundColor: 'white' });

    this.app.canvas.id = 'game-canvas';

    document.body.appendChild(this.app.canvas);

    this.app.stage.sortableChildren = true;

    GameConfig.setBlockTileSize((this.app.canvas.width / 3) / GameConfig.getBlockTileSize());

    const blocks: Block[] = [
      new Block([
        1, 0, 0,
        1, 0, 0,
        1, 1, 1,
      ]),
      new Block([
        1, 0, 0,
        1, 0, 0,
        1, 1, 0,
      ]),
      new Block([
        0, 0, 0,
        0, 1, 0,
        1, 1, 1,
      ]),
      new Block([
        0, 0, 0,
        0, 1, 0,
        1, 1, 1,
      ]),
      new Block([
        0, 0, 0,
        1, 1, 0,
        1, 1, 0,
      ]),
    ];

    let originalPosition = { x: 0, y: 0 };

    blocks.forEach((block) => {
      block.render();

      block.onDrag((dragType, event) => {
        switch (dragType) {
          case 'drag-start': {
            originalPosition = { x: event.currentTarget.x, y: event.currentTarget.y };
            event.currentTarget.zIndex = 999;
            event.currentTarget.parent!.toLocal(event.global, undefined, event.currentTarget.position);
            break;
          }

          case 'dragging': {
            event.currentTarget.parent!.toLocal(event.global, undefined, event.currentTarget.position);
            break;
          }

          case 'drag-end': {
            event.currentTarget.parent!.toLocal(originalPosition, event.currentTarget.parent!, event.currentTarget.position);
            break;
          }
        }
      });
    });

    const board = new Board(GameConfig.getBoardLayout());
    board.render();
    const boardSize = board.getSize()
    board.container.pivot.set(boardSize.width / 2, boardSize.height / 2);
    board.setPosition((this.app.canvas.width / 2), boardSize.height + 50);
    board.attachTo(this.app.stage);

    const centerContainer = new Flex({
      maxItemsPerRow: 2,
      entities: blocks,
      width: GameConfig.getBlockLayout().col * GameConfig.getBlockTileSize(),
      height: GameConfig.getBlockLayout().row * GameConfig.getBlockTileSize(),
    });

    centerContainer.render();
    const centerContainerSize = centerContainer.getSize()
    centerContainer.container.pivot.set(centerContainerSize.width / 2, centerContainerSize.height / 2);
    centerContainer.setPosition((this.app.canvas.width / 2), this.app.canvas.height - centerContainerSize.height - 50);
    centerContainer.attachTo(this.app.stage);
  }
}
