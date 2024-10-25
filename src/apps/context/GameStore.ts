import { atom } from "nanostores";

const isBrowser = typeof window !== "undefined";


//Game Stores
export const initialGame = {
    game: {
        word: "Lifos",
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
    }
}

export const GameStore = atom(isBrowser ? JSON.parse(localStorage.getItem('F-Wordle') || JSON.stringify(initialGame))?.game : initialGame.game)
export const GameSettingsStore = atom(isBrowser ? JSON.parse(localStorage.getItem('F-Wordle') || JSON.stringify(initialGame))?.settings : initialGame.settings)
