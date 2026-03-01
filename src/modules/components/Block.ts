import { Container, Graphics } from "pixi.js";
import { container } from "../deps/Container";
import { GlobalConfig } from "../deps/GlobalConfig";
import { Tokens } from "../deps/Tokens";
import { BaseComponent } from "./BaseComponent";

type Bit = 0 | 1;

type BlockData = [
  Bit, Bit, Bit,
  Bit, Bit, Bit,
  Bit, Bit, Bit
]

export class Block extends BaseComponent {
  private data: BlockData;
  private globalConfig: GlobalConfig = container.resolve(Tokens.GlobalConfig);

  constructor(data: BlockData) {
    super();
    this.data = data;
  }

  render() {
    const container = new Container();

    this.data.forEach((bit, index) => {
      if (!bit) return;

      const rect = new Graphics();

      const x = (index % 3) * this.globalConfig.blockSize;
      const y = Math.ceil((index + 1) / 3) * this.globalConfig.blockSize;

      rect.roundRect(x, y, this.globalConfig.blockSize - this.globalConfig.blockGap, this.globalConfig.blockSize - this.globalConfig.blockGap, this.globalConfig.blockCornerRadius);
      rect.fill('red');

      container.addChild(rect);

    });

    container.pivot.set(container.width / 2, container.height / 2);

    return container;
  }
}
