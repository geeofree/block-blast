import { Bounds, Graphics, Color } from "pixi.js";
import { BaseComponent } from "./BaseComponent";
import { GlobalConfig } from "../deps/GlobalConfig";
import { container } from "../deps/Container";
import { Tokens } from "../deps/Tokens";
import { BlockPosition } from "../events/BlockPosition";
import { getRandomItem } from "../utils/random";
import { colorRegistry } from "../utils/color";

type GridParam = {
  row: number;
  col: number;
}

type Grid = number[];

export class Board extends BaseComponent {
  private grid: Grid;
  private maxCol: number;
  private globalConfig: GlobalConfig = container.resolve(Tokens.GlobalConfig);
  private blockPosition: BlockPosition = container.resolve(Tokens.BlockPosition);

  constructor(grid: GridParam) {
    super();
    this.maxCol = grid.col;
    this.grid = Array(grid.col * grid.row).fill(0);
  }

  render() {
    this.grid.forEach((colorIdx, index) => {
      const rect = new Graphics();

      const col = index % this.maxCol;
      const row = Math.ceil((index + 1) / this.maxCol);

      const x = col * this.globalConfig.blockSize;
      const y = row * this.globalConfig.blockSize;

      const width = this.globalConfig.blockSize - this.globalConfig.blockGap;
      const height = this.globalConfig.blockSize - this.globalConfig.blockGap;

      rect.roundRect(0, 0, width, height, this.globalConfig.blockCornerRadius);
      const color = colorIdx > 0 ? colorRegistry[colorIdx] : '#0f172a';
      rect.fill(color);
      rect.position.set(x, y);

      this.container.addChild(rect);
    });

    return this.container;
  }

  collision() {
    this.blockPosition.subscribe(data => {
      let placements = [];

      for (let boardRectIdx = 0; boardRectIdx < this.container.children.length; boardRectIdx++) {
        for (let blockRectIdx = 0; blockRectIdx < data.blockContainer.children.length; blockRectIdx++) {
          const blockRect = data.blockContainer.children[blockRectIdx];
          const boardRect = this.container.children[boardRectIdx];

          const blockRectBounds = blockRect.getBounds();
          const boardRectBounds = boardRect.getBounds();

          if (data.dragType === 'drag-up') {
            if (this.isColliding(blockRectBounds, boardRectBounds) && this.grid[boardRectIdx] < 1) {
              placements.push(boardRectIdx);
            }
          }
        }
      }

      if (placements.length < data.blockContainer.children.length) {
        placements = [];
      }

      placements.forEach(placementIdx => {
        this.grid[placementIdx] = data.colorIdx;
      });

      this.container.removeChildren();
      this.render();
    });
  }

  private isColliding(boundsA: Bounds, boundsB: Bounds) {
    return (
      boundsA.x >= boundsB.x - (boundsB.width * 0.5)  &&
        boundsA.x + boundsA.width <= boundsB.x + boundsB.width + (boundsB.width * 0.5) &&
      boundsA.y >= boundsB.y - (boundsB.height * 0.5)  &&
        boundsA.y + boundsA.height <= boundsB.y + boundsB.height + (boundsB.height * 0.5)
    )
  }
}
