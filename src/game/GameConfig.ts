import type { Layout } from "../types";

class GameConfigSingleton {
  private static instance: GameConfigSingleton;
  private blockTileSize: number;
  private boardLayout: Layout;
  private blockLayout: Layout;


  private constructor() {
    this.blockTileSize = 24;
    this.boardLayout = { row: 8, col: 8 }
    this.blockLayout = { row: 3, col: 3 }
  }

  public static getInstance() {
    if (!GameConfigSingleton.instance) {
      GameConfigSingleton.instance = new GameConfigSingleton();
    }

    return GameConfigSingleton.instance;
  }

  public getBlockTileSize(): number {
    return this.blockTileSize;
  }

  public setBlockTileSize(blockSize: number) {
    this.blockTileSize = blockSize;
  }

  public getBoardLayout(): Layout {
    return this.boardLayout;
  }

  public setBoardLayout(layout: Layout) {
    this.boardLayout = layout;
  }

  public getBlockLayout(): Layout {
    return this.blockLayout;
  }

  public setBlockLayout(layout: Layout) {
    this.blockLayout = layout;
  }
}

export const GameConfig = GameConfigSingleton.getInstance();
