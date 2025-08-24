import { Entity } from "./Entity";

type FlexConfig = {
  maxItemsPerRow: number;
  gap?: number;
  entities: Entity[];
  width: number;
  height: number;
}

export class Flex extends Entity {
  private entities: Entity[];
  private maxItemsPerRow: number;
  private gap: number;
  private width: number;
  private height: number;

  constructor(config: FlexConfig) {
    super();
    this.maxItemsPerRow = config.maxItemsPerRow;
    this.gap = config.gap ?? 16;
    this.entities = config.entities;
    this.width = config.width;
    this.height = config.height;
  }

  render(): void {
    this.entities
      .forEach((entity, index) => {
        const col = index % this.maxItemsPerRow;
        const row = Math.floor(index / this.maxItemsPerRow);

        const x = (this.width * col) + (col === 0 ? 0 : this.gap);
        const y = (this.height * row) + (row === 0 ? 0 : this.gap);

        entity.setPosition(x, y);
        this.attachChild(entity.container);
    });
  }
}
