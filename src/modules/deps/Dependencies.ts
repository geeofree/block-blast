import { container } from "./Container";
import { gameState } from "../stateMachines/GameState";
import { GlobalConfig } from "./GlobalConfig";
import { PixiApp } from "./PixiApp";
import { Tokens } from "./Tokens";
import { placeBlock } from "../events/PlaceBlock";

export class Dependencies {
  static registerDeps() {
    container.register(Tokens.PixiApp, PixiApp);
    container.register(Tokens.GlobalConfig, GlobalConfig);

    container.bindValue(Tokens.GameState, gameState);
    container.bindValue(Tokens.PlaceBlock, placeBlock);
  }
}
