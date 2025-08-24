import { Graphics } from "pixi.js";
import { GameConfig } from "../game/GameConfig";
import type { Binary, Layout } from "../types";
import { Entity } from "./Entity";

export class Board extends Entity {
  private data: Binary[];

  constructor(boardLayout: Layout) {
    super();
    this.data = Array.from(Array(boardLayout.row * boardLayout.col), () => 0);
  }

  render() {
    this.data.forEach((shouldRender, index) => {
      const blockGraphic = new Graphics();
      const boardLayout = GameConfig.getBoardLayout();
      const tileSize = GameConfig.getBlockTileSize();
      const x = (index % boardLayout.col) * tileSize;
      const y = Math.floor(index / boardLayout.row) * tileSize;
      blockGraphic
        .rect(x, y, tileSize, tileSize)
        .fill('#64748b')
        .stroke({ color: 'white', width: 2 });
      this.attachChild(blockGraphic);
    })
  }
}
