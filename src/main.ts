import { GameApp } from './game/GameApp';
import './style.css'

async function main() {
  const gameApp = new GameApp();
  gameApp.init();
};

main();
