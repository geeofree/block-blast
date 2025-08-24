import { Container, FederatedPointerEvent } from "pixi.js";
import { GameConfig } from "../game/GameConfig";

type DragType = 'drag-start' | 'dragging' | 'drag-end';

export abstract class Entity {
  public container: Container;
  private isDragging: boolean;

  constructor() {
    this.container = new Container();
    this.isDragging = false;
    setTimeout(() => {
      this.render();
    });
  }

  getSize() {
    return this.container.getSize();
  }

  getPosition() {
    return this.container.position;
  }

  setPosition(x: number, y: number) {
    this.container.position.set(x, y);
  }

  onDrag(callback: (dragType: DragType, event: FederatedPointerEvent) => void) {
    const originalPivot = { x: this.container.pivot.x, y: this.container.pivot.y };

    this.container.eventMode = 'static';
    this.container.cursor = 'grab';

    this.container.on('pointerdown', event => {
      if (!this.isDragging) {
        this.isDragging = true;
        this.container.pivot.set(this.container.width / 2, this.container.height - GameConfig.getBlockSize() / 2);
        this.container.cursor = 'grabbing';
        callback('drag-start', event);
      }
    });

    this.container.on('globalpointermove', event => {
      if (this.isDragging) {
        this.isDragging = true;
        callback('dragging', event);
      }
    });

    this.container.on('pointerup', event => {
      if (this.isDragging) {
        this.isDragging = false;
        this.container.pivot = originalPivot;
        this.container.cursor = 'grab';
        callback('drag-end', event);
      }
    });

    this.container.on('pointerupoutside', event => {
      if (this.isDragging) {
        this.isDragging = false;
        this.container.pivot = originalPivot;
        this.container.cursor = 'grab';
        callback('drag-end', event);
      }
    });
  }

  attachTo(parentContainer: Container) {
    parentContainer.addChild(this.container);
  }

  attachChild(childContainer: Container) {
    this.container.addChild(childContainer);
  }

  render() {
    throw new Error('render() not implemented.');
  }
}
