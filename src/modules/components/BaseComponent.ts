import { Container } from "pixi.js";

export abstract class BaseComponent {
  protected container: Container;

  constructor() {
    this.container = new Container();
  }

  abstract render(): Container;
}
