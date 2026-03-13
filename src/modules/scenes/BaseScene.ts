import { Container } from "pixi.js";

export abstract class BaseScene {
  protected container: Container;
  abstract getScene(): Container;

  constructor() {
    this.container = new Container();
  }
}
