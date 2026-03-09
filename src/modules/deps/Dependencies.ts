import { container } from "./Container";
import { Event } from "./Event";
import { gameState } from "./GameState";
import { GlobalConfig } from "./GlobalConfig";
import { PixiApp } from "./PixiApp";
import { Tokens } from "./Tokens";

export class Dependencies {
  static registerDeps() {
    container.register(Tokens.PixiApp, PixiApp);
    container.register(Tokens.GlobalConfig, GlobalConfig);
    container.register(Tokens.Event, Event);
    container.bindValue(Tokens.GameState, gameState);
  }
}
