import { Container } from "pixi.js";

export abstract class BaseComponent {
  abstract render(): Container;
}
