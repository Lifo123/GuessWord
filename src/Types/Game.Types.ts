export type ValidateStates = true | false | 'exist' | undefined

export interface ValidInterface {
    letter: string;
    state: ValidateStates;
}

export interface Params {
    word: string;
    guess: string;
    valid: Array<Array<ValidInterface>>;
    currentRow: number;
    currentLetter: number;
    isWin: boolean | undefined;
    waiting: boolean;
    lastPlayed?: number;
}


export interface GuessWordStore extends Params {
    [key: string]: any;
}


export interface GameDaily {
    
}