import { Graphics } from "pixi.js";
import { BaseComponent } from "./BaseComponent";
import { GlobalConfig } from "../deps/GlobalConfig";
import { container } from "../deps/Container";
import { Tokens } from "../deps/Tokens";

type BoardGrid = {
  row: number;
  col: number;
}

export class Board extends BaseComponent {
  private grid: BoardGrid;
  private globalConfig: GlobalConfig = container.resolve(Tokens.GlobalConfig);

  constructor(grid: BoardGrid) {
    super();
    this.grid = grid;
  }

  render() {
    for (let col = 0; col < this.grid.col; col++) {
      for (let row = 0; row < this.grid.row; row++) {
        const rect = new Graphics();

        const x = col * this.globalConfig.blockSize;
        const y = row * this.globalConfig.blockSize;

        const width = this.globalConfig.blockSize - this.globalConfig.blockGap;
        const height = this.globalConfig.blockSize - this.globalConfig.blockGap;

        rect.roundRect(0, 0, width, height, this.globalConfig.blockCornerRadius);
        rect.fill('red');
        rect.position.set(x, y);

        this.container.addChild(rect);
      }
    }

    return this.container;
  }
}
