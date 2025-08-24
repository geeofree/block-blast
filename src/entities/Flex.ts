import { GameConfig } from "../game/GameConfig";
import { Entity } from "./Entity";

export class Flex extends Entity {
  private entities: Entity[];
  private maxItemsPerRow: number;
  private gap: number;

  constructor(maxItemsPerRow: number, entities: Entity[]) {
    super();
    this.maxItemsPerRow = maxItemsPerRow;
    this.gap = 10;
    this.entities = entities;
  }

  render(): void {
    this.entities
      .forEach((entity, index) => {
        const col = index % this.maxItemsPerRow;
        const row = Math.floor(index / this.maxItemsPerRow);

        const x = (GameConfig.getBlockCols() * GameConfig.getBlockTileSize() * col) + (col === 0 ? 0 : this.gap);
        const y = (GameConfig.getBlockRows() * GameConfig.getBlockTileSize() * row) + (row === 0 ? 0 : this.gap);

        console.log({ col, row, x , y});

        entity.setPosition(x, y);
        this.attachChild(entity.container);
    });
  }
}
