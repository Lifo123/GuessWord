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

    for (let i = 0; i < word.length; i++) {
        if (resultArray[i] === 'false' && letterCount[guess[i]] > 0) {
            resultArray[i] = 'exist';
            letterCount[guess[i]] -= 1;
        }
    }

    const isWin = resultArray.every((box) => box === 'true');
    return {
        result: resultArray,
        isWin: isWin
    };

}

export const GameUtils = {
    compareWord
}