import { atom } from "nanostores";

const isBrowser = typeof window !== "undefined";


//Game Stores
const initialData = {
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
        isWin: null,
        restart: false,
    },
    settings: {
        tries: 6,
        length: 5,
        lang: 'ES',
        dictionary: 'gameDefault'
    },
    visual: {
        light: {
            bg: '#ffffff',
        },
        dark: {
            bg: '#161616',
        },
        main: {
            primary: '#007bff',
            secondary: '#6c757d',
            tertiary: '#ffc107',
            multiplier: '1'
        }
    },
    stadistic: {
        total: 0,
        win: 0,
        streak: 0,
        rows: [
            0,0,0,0,0,0,0,0,0,0
        ],
    }
}

const game = atom(isBrowser ? JSON.parse(localStorage.getItem('F-Wordle') || JSON.stringify(initialData))?.game : initialData.game)
const setting = atom(isBrowser ? JSON.parse(localStorage.getItem('F-Wordle') || JSON.stringify(initialData))?.settings : initialData.settings)
const visual = atom(isBrowser ? JSON.parse(localStorage.getItem('F-Wordle') || JSON.stringify(initialData))?.visual : initialData.visual)
const stadistic = atom(isBrowser ? JSON.parse(localStorage.getItem('F-Wordle') || JSON.stringify(initialData))?.stadistic : initialData.stadistic)
const navigation = atom('game');


export const GAMESTORE = {
    game,
    setting,
    visual,
    initialData,
    navigation,
    stadistic
}

export default GAMESTORE;