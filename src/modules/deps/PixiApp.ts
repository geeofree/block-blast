import { Application, ApplicationOptions } from "pixi.js";

declare global {
  interface Window {
    __PIXI_APP__: Application;
  }
}

export class PixiApp {
  private app: Application;

  constructor() {
    this.app = new Application();
  }

  async init(options: Partial<ApplicationOptions>) {
    window.__PIXI_APP__ = this.app;
    await this.app.init(options);
  }

  attachToDOMParent(id: string) {
    document.getElementById(id)!.appendChild(this.app.canvas);
  }

  get screen() {
    return this.app.screen
  }

  get stage() {
    return this.app.stage
  }

  get canvasWidth() {
    return this.app.canvas.width;
  }

  get canvasHeight() {
    return this.app.canvas.height;
  }
}
