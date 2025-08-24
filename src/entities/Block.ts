import { Graphics } from "pixi.js";
import { GameConfig } from "../game/GameConfig";
import type { Binary } from "../types";
import { Entity } from "./Entity";
import { getRandomItem } from "../utils";

type BlockData = [
  Binary, Binary, Binary,
  Binary, Binary, Binary,
  Binary, Binary, Binary,
]

const BLOCK_COLORS = ['#ef4444', '#10b981', '#3b82f6', '#6366f1', '#d946ef', '#f43f5e'];

export class Block extends Entity {
  private data: BlockData;
  private tileColor: string;

  constructor(data: BlockData) {
    super();
    this.data = data;
    this.tileColor = getRandomItem(BLOCK_COLORS);
  }

  getTileColor(tileColor: string) {
    this.tileColor = tileColor;
  }

  setTileColor(tileColor: string) {
    this.tileColor = tileColor;
  }

  render() {
    this.data.forEach((shouldRender, index) => {
      if (!shouldRender) return;
      const blockGraphic = new Graphics();
      const x = (index % 3) * GameConfig.getBlockTileSize();
      const y = Math.floor(index / 3) * GameConfig.getBlockTileSize();
      blockGraphic
        .rect(x, y, GameConfig.getBlockTileSize(), GameConfig.getBlockTileSize())
        .fill(this.tileColor)
        .stroke({ color: 'white', width: 2 });
      this.attachChild(blockGraphic);
    })
  }
}
