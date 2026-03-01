import { Container } from "pixi.js";

export abstract class BaseScene {
  abstract getScene(): Container;
}
