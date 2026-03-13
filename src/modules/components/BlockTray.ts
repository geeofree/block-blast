import { Container } from 'pixi.js';
import { BaseComponent } from './BaseComponent';
import { getRandomItem } from '../utils/random';
import { colorRegistry } from '../utils/color';
import { Block } from './Block';
import { GlobalConfig } from '../deps/GlobalConfig';
import { container } from '../deps/Container';
import { Tokens } from '../deps/Tokens';
import { PlaceBlock } from '../events/PlaceBlock';
import { BlockPlaced } from '../events/BlockPlaced';

const blockDataRegistry = [
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

type TrayItem = {
  block: Block;
  colorIdx: number;
}

export class BlockTray extends BaseComponent {
  private trayItems: TrayItem[];
  private globalConfig: GlobalConfig = container.resolve(Tokens.GlobalConfig);
  private placeBlock: PlaceBlock = container.resolve(Tokens.PlaceBlock);
  private blockPlaced: BlockPlaced = container.resolve(Tokens.BlockPlaced);

  constructor(maxTrayItems: number) {
    super();
    this.trayItems = Array(maxTrayItems).fill(0).map(() => this.getRandomBlock());
  }

  render(): Container {
    let prevX = 0;

    this.trayItems.forEach(({ block, colorIdx }, trayItemIdx) => {
      const blockContainer = block.render();

      blockContainer.x = prevX;
      prevX = blockContainer.x + blockContainer.width + this.globalConfig.blockGap + 64;

      block.drag(dragType => {
        switch (dragType) {
          case 'drag-down': {
            block.setInitialPosition();
            break;
          }
          case 'drag-up': {
            this.placeBlock.emit({ block, blockContainer, dragType, colorIdx, trayItemIdx });
            break;
          }
        }
      });

      this.container.addChild(blockContainer);
    });

    return this.container;
  }

  blockPlacedListener() {
    this.blockPlaced.subscribe(({ trayItemIdx }) => {
      this.trayItems = this.trayItems.map((trayItem, index) => index !== trayItemIdx ? trayItem : this.getRandomBlock());
      this.rerender();
    });
  }

  private getRandomBlock(): TrayItem {
    const randBlockIdx = getRandomItem(blockDataRegistry.length);
    const randColorIdx = getRandomItem(colorRegistry.length);

    const blockData = blockDataRegistry[randBlockIdx];
    const color = colorRegistry[randColorIdx];

    const block = new Block(color, blockData);

    return { block, colorIdx: randColorIdx };
  }
}
