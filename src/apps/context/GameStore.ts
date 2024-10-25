import { atom } from "nanostores";

const isBrowser = typeof window !== "undefined";


//Game Stores
export const initialGame = {
    game: {
        word: "lifos",
        guess: "",
        currentLetter: 0,
        currentRow: 0,
        valid: [
            [
                { char: '', isValid: null },
                { char: '', isValid: null },
                { char: '', isValid: null },
                { char: '', isValid: null },
                { char: '', isValid: null }
            ], [
                { char: '', isValid: null },
                { char: '', isValid: null },
                { char: '', isValid: null },
                { char: '', isValid: null },
                { char: '', isValid: null }
            ], [
                { char: '', isValid: null },
                { char: '', isValid: null },
                { char: '', isValid: null },
                { char: '', isValid: null },
                { char: '', isValid: null }
            ],
            [
                { char: '', isValid: null },
                { char: '', isValid: null },
                { char: '', isValid: null },
                { char: '', isValid: null },
                { char: '', isValid: null }
            ],
            [
                { char: '', isValid: null },
                { char: '', isValid: null },
                { char: '', isValid: null },
                { char: '', isValid: null },
                { char: '', isValid: null }
            ],
            [
                { char: '', isValid: null },
                { char: '', isValid: null },
                { char: '', isValid: null },
                { char: '', isValid: null },
                { char: '', isValid: null }
            ]
        ],
        isWin: false,
        restart: false,
    },
    settings: {
        tries: 6,
        length: 5,
        lang: 'ES'
    },
    visual: {
        fontSize: 50,
        fontColor: 'var(--w-text)',
    }
}

export const GameStore = atom(isBrowser ? JSON.parse(localStorage.getItem('F-Wordle') || JSON.stringify(initialGame))?.game : initialGame.game)
export const GameSettingsStore = atom(isBrowser ? JSON.parse(localStorage.getItem('F-Wordle') || JSON.stringify(initialGame))?.settings : initialGame.settings)
export const GameVisualStore = atom(isBrowser ? JSON.parse(localStorage.getItem('F-Wordle') || JSON.stringify(initialGame))?.visual : initialGame.visual)
