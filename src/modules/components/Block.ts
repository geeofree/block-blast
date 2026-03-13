import { Color, Graphics } from "pixi.js";
import { container } from "../deps/Container";
import { GlobalConfig } from "../deps/GlobalConfig";
import { Tokens } from "../deps/Tokens";
import { DraggableComponent } from "./DraggableComponent";

type BlockData = number[]; // Must be 0 or 1

export class Block extends DraggableComponent {
  private data: BlockData;
  private globalConfig: GlobalConfig = container.resolve(Tokens.GlobalConfig);
  private initialX: number | null = null;
  private initialY: number | null = null;
  public color: Color;

  constructor(color: Color, data: BlockData) {
    if (data.length < 9) {
      throw new Error('Block data is less than 9.');
    }

    super();
    this.color = color;
    this.data = data;
  }

  setInitialPosition() {
    this.initialX = this.container.x;
    this.initialY = this.container.y;
  }

  returnToInitialPosition() {
    if (this.initialX !== null && this.initialY !== null) {
      this.container.x = this.initialX;
      this.container.y = this.initialY;
    }
  }

  render() {
    this.data.forEach((bit, index) => {
      if (bit === 0) return;

      const rect = new Graphics();

      const x = (index % 3) * this.globalConfig.blockSize;
      const y = Math.ceil((index + 1) / 3) * this.globalConfig.blockSize;

      const width = this.globalConfig.blockSize - this.globalConfig.blockGap;
      const height = this.globalConfig.blockSize - this.globalConfig.blockGap;

      rect.roundRect(0, 0, width, height, this.globalConfig.blockCornerRadius);
      rect.fill(this.color);
      rect.position.set(x, y);

      this.container.addChild(rect);
    });

    return this.container;
  }
}
