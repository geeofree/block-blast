import { Application, ApplicationOptions, ContainerChild } from "pixi.js";

export class PixiApp {
  private app: Application;

  constructor() {
    this.app = new Application();
  }

  async init(options: Partial<ApplicationOptions>) {
    await this.app.init(options);
  }

  attachToDOMParent(id: string) {
    document.getElementById(id)!.appendChild(this.app.canvas);
  }

  addStageChild(containerChild: ContainerChild) {
    this.app.stage.addChild(containerChild);
  }

  get canvasWidth() {
    return this.app.canvas.width;
  }

  get canvasHeight() {
    return this.app.canvas.height;
  }
}
