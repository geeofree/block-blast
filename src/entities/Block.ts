import { Graphics } from "pixi.js";
import { GameConfig } from "../game/GameConfig";
import type { Binary } from "../types";
import { Entity } from "./Entity";

type BlockData = [
  Binary, Binary, Binary,
  Binary, Binary, Binary,
  Binary, Binary, Binary,
]

export class Block extends Entity {
  private data: BlockData;

  constructor(data: BlockData) {
    super();
    this.data = data;
  }

  render() {
    this.data.forEach((shouldRender, index) => {
      if (!shouldRender) return;
      const blockGraphic = new Graphics();
      const x = (index % 3) * GameConfig.getBlockSize();
      const y = Math.floor(index / 3) * GameConfig.getBlockSize();
      blockGraphic
        .rect(x, y, GameConfig.getBlockSize(), GameConfig.getBlockSize())
        .fill('red')
      this.attachChild(blockGraphic);
    })
  }
}
