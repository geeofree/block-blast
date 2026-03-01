import { container } from "./Container";
import { gameState } from "./GameState";
import { GlobalConfig } from "./GlobalConfig";
import { PixiApp } from "./PixiApp";
import { Tokens } from "./Tokens";

export class Dependencies {
  static registerDeps() {
    container.register(Tokens.PixiApp, PixiApp);
    container.register(Tokens.GlobalConfig, GlobalConfig);
    container.bindValue(Tokens.GameState, gameState);
  }
}
