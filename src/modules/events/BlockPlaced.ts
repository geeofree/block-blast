import { Event } from "./Event";

export const blockPlaced = new Event<{
  trayItemIdx: number;
}>();

export type BlockPlaced = typeof blockPlaced;
