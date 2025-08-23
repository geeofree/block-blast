class GameConfigSingleton {
  private static instance: GameConfigSingleton;
  private blockSize: number;

  private constructor() {
    this.blockSize = 16;
  }

  public static getInstance() {
    if (!GameConfigSingleton.instance) {
      GameConfigSingleton.instance = new GameConfigSingleton();
    }

    return GameConfigSingleton.instance;
  }

  public getBlockSize(): number {
    return this.blockSize;
  }

  public setBlockSize(blockSize: number) {
    GameConfigSingleton.instance.blockSize = blockSize;
  }
}

export const GameConfig = GameConfigSingleton.getInstance();
