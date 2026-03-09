import { container } from "../deps/Container";
import { PixiApp } from "../deps/PixiApp";
import { Tokens } from "../deps/Tokens";
import { BaseComponent } from "./BaseComponent";

export abstract class DraggableComponent extends BaseComponent {
  private isDragging: boolean = false;
  private pixiApp: PixiApp = container.resolve(Tokens.PixiApp);
  private dragOffsetX: number = 0;
  private dragOffsetY: number = 0;

  drag(cb?: (x: number, y: number) => void) {
    this.pixiApp.stage.eventMode = 'static';
    this.pixiApp.stage.hitArea = this.pixiApp.screen;

    this.container.eventMode = 'static';
    this.container.cursor = 'grab';

    this.container.on('pointerdown', (event) => {
      this.container.cursor = 'grabbing';
      this.isDragging = true;
      this.dragOffsetX = this.container.x - event.globalX;
      this.dragOffsetY = this.container.y - event.globalY;
    });

    this.pixiApp.stage.on('pointermove', (event) => {
      if (!this.isDragging) return;

      const x = event.globalX + this.dragOffsetX;
      const y = event.globalY + this.dragOffsetY;

      if (typeof cb === 'function') {
        cb(x, y);
      }

      this.container.x = x;
      this.container.y = y;
    });

    const stopDrag = () => {
      this.isDragging = false;
      this.container.cursor = 'grab';
    }

    this.pixiApp.stage.on('pointerup', stopDrag);
    this.pixiApp.stage.on('pointerupoutside', stopDrag);
  }
}
