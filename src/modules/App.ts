import { Dependencies } from "./deps/Dependencies";
import { Game } from "./Game";

export class App {
  start() {
    Dependencies.registerDeps();
    Game.start();
  }
}
