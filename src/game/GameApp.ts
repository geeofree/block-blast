import { Application } from 'pixi.js';
import { Block } from '../entities/Block';
import { Flex } from '../entities/Flex';

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
    ];

    const centerContainer = new Flex(3, blocks);
    centerContainer.setPosition(this.app.canvas.width / 2, this.app.canvas.height / 2);
    centerContainer.attachTo(this.app.stage);
  }
}
