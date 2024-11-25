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
    isDaily?: boolean;
    waiting: boolean;
    lastPlayed?: number;
}


export interface GuessWordStore extends Params {
    [key: string]: any;
}


export interface GameDaily extends Params {
    isDaily?: boolean;
}

export interface GameTimer extends Params {
    Timer?: number; 
}