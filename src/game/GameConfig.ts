class GameConfigSingleton {
  private static instance: GameConfigSingleton;
  private blockTileSize: number;
  private blockRows: number;
  private blockCols: number;


  private constructor() {
    this.blockTileSize = 24;
    this.blockRows = 3;
    this.blockCols = 3;
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
    GameConfigSingleton.instance.blockTileSize = blockSize;
  }

  public getBlockRows(): number {
    return this.blockRows;
  }

  public setBlockRows(blockRows: number) {
    GameConfigSingleton.instance.blockRows = blockRows;
  }

  public getBlockCols(): number {
    return this.blockCols;
  }

  public setBlockCols(blockCols: number) {
    GameConfigSingleton.instance.blockCols = blockCols;
  }
}

export const GameConfig = GameConfigSingleton.getInstance();
