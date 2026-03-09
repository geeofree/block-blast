import { Graphics } from "pixi.js";
import { container } from "../deps/Container";
import { GlobalConfig } from "../deps/GlobalConfig";
import { Tokens } from "../deps/Tokens";
import { DraggableComponent } from "./DraggableComponent";

type BlockData = number[]; // Must be 0 or 1

export class Block extends DraggableComponent {
  private data: BlockData;
  private globalConfig: GlobalConfig = container.resolve(Tokens.GlobalConfig);

  constructor(data: BlockData) {
    if (data.length < 9) {
      throw new Error('Block data is less than 9.');
    }

    super();
    this.data = data;
  }

  render() {
    this.data.forEach((bit, index) => {
      if (bit === 0) return;

      const rect = new Graphics();

      const x = (index % 3) * this.globalConfig.blockSize;
      const y = Math.ceil((index + 1) / 3) * this.globalConfig.blockSize;

      const width = this.globalConfig.blockSize - this.globalConfig.blockGap;
      const height = this.globalConfig.blockSize - this.globalConfig.blockGap;

      rect.roundRect(x, y, width, height, this.globalConfig.blockCornerRadius);
      rect.fill('blue');

      this.container.addChild(rect);
    });

    return this.container;
  }
}
