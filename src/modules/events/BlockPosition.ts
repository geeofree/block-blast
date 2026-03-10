import { Event } from "./Event";

export const blockPosition = new Event<{
  blockData: number[];
  x: number;
  y: number;
}>();

export type BlockPosition = typeof blockPosition;
