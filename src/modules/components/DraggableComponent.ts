import { container } from "../deps/Container";
import { PixiApp } from "../deps/PixiApp";
import { Tokens } from "../deps/Tokens";
import { BaseComponent } from "./BaseComponent";

export type DragTypes = 'drag-down' | 'drag-move' | 'drag-up';

export abstract class DraggableComponent extends BaseComponent {
  private isDragging: boolean = false;
  private pixiApp: PixiApp = container.resolve(Tokens.PixiApp);
  private dragOffsetX: number = 0;
  private dragOffsetY: number = 0;

  drag(cb?: (dragType: DragTypes) => void) {
    this.pixiApp.stage.eventMode = 'static';
    this.pixiApp.stage.hitArea = this.pixiApp.screen;

    this.container.eventMode = 'static';
    this.container.cursor = 'grab';

    this.container.on('pointerdown', (event) => {
      if (this.isDragging) return;

      this.container.cursor = 'grabbing';
      this.isDragging = true;
      this.dragOffsetX = this.container.x - event.globalX;
      this.dragOffsetY = this.container.y - event.globalY;

      if (typeof cb === 'function') {
        cb('drag-down');
      }
    });

    this.pixiApp.stage.on('pointermove', (event) => {
      if (!this.isDragging) return;

      const x = event.globalX + this.dragOffsetX;
      const y = event.globalY + this.dragOffsetY;

      if (typeof cb === 'function') {
        cb('drag-move');
      }

      this.container.x = x;
      this.container.y = y;
    });

    const stopDrag = () => {
      if (!this.isDragging) return;

      this.isDragging = false;
      this.container.cursor = 'grab';
      if (typeof cb === 'function') {
        cb('drag-up');
      }
    }

    this.pixiApp.stage.on('pointerup', stopDrag);
    this.pixiApp.stage.on('pointerupoutside', stopDrag);
  }
}
