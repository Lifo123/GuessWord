import Local from "@Utilities/Local";


const generateRandom = (max: number) => {
    return Math.floor(Math.random() * ((max || 100) + 1));
}

const compareWord = (word: string, guess: string) => {
    let resultArray = [];
    let letterCount: Record<string, number> = {};

    word.split('').forEach((letter: any) => {
        letterCount[letter] = (letterCount[letter] || 0) + 1;
    });


    for (let i = 0; i < word.length; i++) {
        const key = guess[i];
        if (key === word[i]) {
            resultArray.push('true');
            letterCount[key] -= 1;
        } else if (letterCount[key] > 0) {
            resultArray.push('exists');
            letterCount[key] -= 1;
        } else {
            resultArray.push('false');
        }
    }

    return {
        result: resultArray,
        isWin: resultArray.every((box: any) => box === 'true')
    }

}

const setParams = (params: string, data: object) => {
    const PARAMS = params.split(':')
    const DATA = Local.inmutable(data)
    console.log(PARAMS)

    const newValid = Array.from({ length: parseInt(PARAMS[1]) }, () =>
        Array.from({ length: parseInt(PARAMS[2]) }, () => ({ char: '', isValid: null }))
    );

    DATA.game.word = PARAMS[0]
    DATA.game.valid = newValid
    DATA.settings.tries = parseInt(PARAMS[1])
    DATA.settings.length = parseInt(PARAMS[2])
    DATA.settings.lang = PARAMS[3]
    DATA.settings.dictionary = PARAMS[4]
    return DATA

}


const UTILITY = {
    generateRandom,
    compareWord,
    setParams
}


export default UTILITY