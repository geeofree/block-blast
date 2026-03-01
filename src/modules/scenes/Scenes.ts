import { Container } from "pixi.js";
import { GameStates } from "../deps/GameState";
import { BaseScene } from "./BaseScene";
import { MenuScene } from "./MenuScene";
import { SettingScene } from "./SettingScene";
import { PlayingScene } from "./PlayingScene";
import { ExitScene } from "./ExitScene";

type SceneRegistry = Record<GameStates, new () => BaseScene>;

export class Scenes {
  private static registry: SceneRegistry = {
    'Menu': MenuScene,
    'Settings': SettingScene,
    'Playing': PlayingScene,
    'Exit': ExitScene,
  };

  static getSceneFromGameState(gameState: GameStates): Container {
    const Scene = Scenes.registry[gameState];
    const scene = new Scene();
    return scene.getScene();
  }
}
