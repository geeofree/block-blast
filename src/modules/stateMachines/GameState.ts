import { StateMachine } from "./StateMachine";

export type GameStates = 'Menu' | 'Playing' | 'Settings' | 'Exit';

export type GameEvents = 'GoToMenu' | 'PlayGame' | 'GoToSettings' | 'Quit';

export const gameState = new StateMachine<GameStates, GameEvents>('Playing', {
  Menu: {
    PlayGame: 'Playing',
    GoToSettings: 'Settings',
    Quit: 'Exit',
  },
  Playing: {
    GoToMenu: 'Menu',
    GoToSettings: 'Settings'
  },
  Settings: {
    GoToMenu: 'Menu',
  },
})

export type GameState = typeof gameState;
