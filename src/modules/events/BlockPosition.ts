import { Container } from "pixi.js";
import { Event } from "./Event";
import { DragTypes } from "../components/DraggableComponent";

export const blockPosition = new Event<{
  blockContainer: Container;
  dragType: DragTypes;
  colorIdx: number;
}>();

export type BlockPosition = typeof blockPosition;
