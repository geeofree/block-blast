import { Graphics } from "pixi.js";
import { GameConfig } from "../game/GameConfig";
import type { Binary } from "../types";
import { Entity } from "./Entity";
import { getRandomItem } from "../utils";

const BLOCK_COLORS = ['#ef4444', '#10b981', '#3b82f6', '#6366f1', '#d946ef', '#f43f5e'];

export class Block extends Entity {
  private data: Binary[];
  private tileColor: string;

  constructor(data: Binary[]) {
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
      const blockLayout = GameConfig.getBlockLayout();
      const x = (index % blockLayout.col) * GameConfig.getBlockTileSize();
      const y = Math.floor(index / blockLayout.row) * GameConfig.getBlockTileSize();
      blockGraphic
        .rect(x, y, GameConfig.getBlockTileSize(), GameConfig.getBlockTileSize())
        .fill(this.tileColor)
        .stroke({ color: 'white', width: 2 });
      this.attachChild(blockGraphic);
    })
  }
}
