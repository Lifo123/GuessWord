import Local from "@Utilities/Local";


const generateRandom = (max: number) => {
    return Math.floor(Math.random() * ((max || 100) + 1));
}

const compareWord = (word: string, guess: string) => {
    let resultArray = Array(word.length).fill('false');
    let letterCount: Record<string, number> = {};

    word.split('').forEach((letter: any) => {
        letterCount[letter] = (letterCount[letter] || 0) + 1;
    });


    for (let i = 0; i < word.length; i++) {
        if (guess[i] === word[i]) {
            resultArray[i] = 'true';
            letterCount[guess[i]] -= 1;
        }
    }

    // Segunda pasada: Identificar los "exists"
    for (let i = 0; i < word.length; i++) {
        if (resultArray[i] === 'false' && letterCount[guess[i]] > 0) {
            resultArray[i] = 'exists';
            letterCount[guess[i]] -= 1;  
        }
    }

    const isWin = resultArray.every((box) => box === 'true');

    return {
        result: resultArray,
        isWin:isWin
    };

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