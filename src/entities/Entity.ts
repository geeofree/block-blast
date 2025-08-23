import { Container } from "pixi.js";

export abstract class Entity {
  public container: Container;

  constructor() {
    this.container = new Container();
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
