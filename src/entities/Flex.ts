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
    let prevX = 0;
    let prevY = 0;

    this.entities.forEach((entity, index) => {
      const { width, height } = entity.getSize();
      entity.setPosition(prevX, prevY);
      this.attachChild(entity.container);
      prevX = prevX + width + this.gap;
      prevY = prevY + this.gap + (height * Math.floor(index / this.maxItemsPerRow))
    });
  }
}
