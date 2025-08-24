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
      const x = (index % 3) * GameConfig.getBlockTileSize();
      const y = Math.floor(index / 3) * GameConfig.getBlockTileSize();
      blockGraphic
        .rect(x, y, GameConfig.getBlockTileSize(), GameConfig.getBlockTileSize())
        .fill('red')
      this.attachChild(blockGraphic);
    })
  }
}
