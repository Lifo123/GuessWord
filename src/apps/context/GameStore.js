import { LocalArray } from "@Utilities/WordleUtilities";
import { atom } from "nanostores";

const isBrowser = typeof window !== "undefined";

let initialGame = [
    [{ letter: '', state: null }, { letter: '', state: null }, { letter: '', state: null }, { letter: '', state: null }, { letter: '', state: null }],
    [{ letter: '', state: null }, { letter: '', state: null }, { letter: '', state: null }, { letter: '', state: null }, { letter: '', state: null }],
    [{ letter: '', state: null }, { letter: '', state: null }, { letter: '', state: null }, { letter: '', state: null }, { letter: '', state: null }],
    [{ letter: '', state: null }, { letter: '', state: null }, { letter: '', state: null }, { letter: '', state: null }, { letter: '', state: null }],
    [{ letter: '', state: null }, { letter: '', state: null }, { letter: '', state: null }, { letter: '', state: null }, { letter: '', state: null }],
    [{ letter: '', state: null }, { letter: '', state: null }, { letter: '', state: null }, { letter: '', state: null }, { letter: '', state: null }]
]

//Game Stores
export const WordStore = atom('Lifos')
export const WordGuessStore = atom('');
export const gameStateStore = atom(isBrowser ? LocalArray('F-Wordle')?.Game?.gameState || initialGame : initialGame)
export const currentRowStore = atom(isBrowser ? LocalArray('F-Wordle')?.Game?.currentRow || 0 : 0)
export const currentLetterStore = atom(isBrowser ? LocalArray('F-Wordle')?.Game?.currentLetter || 0 : 0)
export const isWinStore = atom(isBrowser ? LocalArray('F-Wordle')?.Game?.isWin || false : false);
export const isGameActiveStore = atom(true)

//GameSettingsStore
export const WordLengthStore = atom(isBrowser ? LocalArray('F-Wordle')?.Settings?.wordLength || 5 : 5);
export const TryStore = atom(isBrowser ? LocalArray('F-Wordle')?.Settings?.Tries || 6 : 6)
