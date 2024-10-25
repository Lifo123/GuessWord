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


export const localUtil = {
    generateRandom,
    compareWord
}