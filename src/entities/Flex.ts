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
    let largestY = 0;
    let x = 0;
    let y = 0;
    let prevRow = 0;

    this.entities
      .map((entity, index) => {
        const { height } = entity.getSize();
        const row = Math.floor(index / this.maxItemsPerRow);
        const col = index % this.maxItemsPerRow;

        largestY = Math.max(largestY, height);

        if (row != prevRow) {
          y = this.gap + largestY

          if (col === 0) {
            largestY = y + largestY;
          }

          prevRow = row;
        }

        return { entity, y }
      })
      .forEach((item, index) => {
        const { entity, y } = item;
        const { width } = entity.getSize();
        const col = index % this.maxItemsPerRow;

        if (col === 0) {
          x = 0;
        }

        entity.setPosition(x, y);
        x = x + this.gap + width;
        this.attachChild(entity.container);
    });
  }
}
