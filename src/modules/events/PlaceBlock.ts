import { Container } from "pixi.js";
import { Event } from "./Event";
import { DragTypes } from "../components/DraggableComponent";
import { Block } from "../components/Block";

export const placeBlock = new Event<{
  block: Block;
  blockContainer: Container;
  dragType: DragTypes;
  colorIdx: number;
  trayItemIdx: number;
}>();

export type PlaceBlock = typeof placeBlock;
