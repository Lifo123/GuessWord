import useRandom from "@Hooks/useRandom"
import ESvalid from "@Assets/dictionary/ES_API_Valid.json"

export const SelectWord = (dic, id) => {
    //Hooks
    const Random = useRandom()
    let category = dic[`d${id}`]
    let Word = category[Random.Generate(category?.length)]
    console.log(Word);

    return Word
}


export const Typing = (array, iRow, iLetter, input) => {
    let updateGame = [...array];
    let updateRow = [...updateGame[iRow]];
    let updateLetter = { ...updateRow[iLetter] };

    updateLetter.letter = input;
    updateRow[iLetter] = updateLetter;
    updateGame[iRow] = updateRow;

    return updateGame;

}

export const Backspace = (array, iRow, iLetter) => {
    let updateGame = [...array];
    let updateRow = [...updateGame[iRow]];
    let updateLetter = { ...updateRow[iLetter - 1] };

    updateLetter.letter = '';
    updateRow[iLetter - 1] = updateLetter;
    updateGame[iRow] = updateRow;

    return updateGame;
}

export const ValidateWord = (word, array, currentRow) => {
    let isWin = false;

    let updateGame = [...array];
    let updateRow = updateGame[currentRow];

    let wordA = word.split('');
    let letterCount = {};

    wordA.forEach((letter) => {
        letterCount[letter] = (letterCount[letter] || 0) + 1;
    });

    updateRow.forEach((box, index) => {
        if (box.letter === wordA[index]) {
            box.state = 'correct';
            letterCount[box.letter] -= 1;
        }
    });

    updateRow.forEach((box, index) => {
        if (box.state !== 'correct') {
            if (wordA.includes(box.letter) && letterCount[box.letter] > 0) {
                box.state = 'exist';
                letterCount[box.letter] -= 1;
            } else {
                box.state = 'incorrect';
            }
        }
    });

    updateGame[currentRow] = updateRow;
    isWin = updateGame[currentRow].every((box) => box.state === 'correct');


    return [updateGame, isWin];
};

export const ExistWord = (word, id) => {
    if (word.length > 4) {
        if (word.endsWith('ces')) {
            word = word.slice(0, -3) + 'z';
        } else if (word.endsWith('yes')){
            word = word.slice(0, -2);
        } else if (word.endsWith('es')) {
            word = word.slice(0, -2);
        } else if (word.endsWith('s')) {
            word = word.slice(0, -1);
        } else if (word.endsWith('r')) {
            word = word.slice(0, -1) + 'a';
        }else if (word.endsWith('ar')) {
            word = word.slice(0, -2) + 'o';
        } else if (word.endsWith('an')) {
            word = word.slice(0, -2);
        } else if (word.endsWith('lo')) {
            word = word.slice(0, -2);
        } else if (word.endsWith('io')) {
            word = word.slice(0, -2);
        } else if (word.endsWith('re')) {
            word = word.slice(0, -1);
        }


        let exist = ESvalid[`d${word.length}`].includes(word);
        console.log(exist);

        return exist
    } else {
        let exist = ESvalid[`d${id}`].includes(word);
        console.log(exist);
        return exist
    }

}
