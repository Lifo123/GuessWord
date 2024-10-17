import ES from "@Assets/dictionary/ES_Game.json"
import ESvalid from "@Assets/dictionary/ES_API_Valid.json"
import useRandom from "@Hooks/useRandom";

export default function useGame() {
    //Hooks
    const Random = useRandom()

    const SelectWord = (id) => {
        let category = ES[`d${id}`]
        let Word = category[Random.Generate(category.length)]
        return Word
    }

    const Typing = (array, iRow, iLetter, input) => {
        let updateGame = [...array];
        let updateRow = [...updateGame[iRow]];
        let updateLetter = { ...updateRow[iLetter] };

        updateLetter.letter = input;
        updateRow[iLetter] = updateLetter;
        updateGame[iRow] = updateRow;

        return updateGame;

    }

    const Backspace = (array, iRow, iLetter) => {
        let updateGame = [...array];
        let updateRow = [...updateGame[iRow]];
        let updateLetter = { ...updateRow[iLetter - 1] };

        updateLetter.letter = '';
        updateRow[iLetter - 1] = updateLetter;
        updateGame[iRow] = updateRow;

        return updateGame;
    }

    const ValidateWord = (guess, word, array, currentRow, id) => {
        let exist = existWord(guess, id)
        let isWin = false;

        if (!exist) {
            return [array, isWin, exist]
        }


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


        return [updateGame, isWin, true];
    };

    const RestartGame = (array) => {
        let updateGame = array
        for (let i = 0; i < updateGame.length; i++) {
            updateGame[i].forEach((box, index) => {
                box.letter = ''
                box.state = null
            })
        }

        return updateGame
    }

    const existWord = (word, id) => {
        return true

        let dictionary = ESvalid[`d${id}`];

        if (word.endsWith('ces')) {
            word = word.slice(0, -3) + 'z';
            dictionary = ESvalid[`d${id - 2}`];
        } else if (word.endsWith('s')) {
            word = word.slice(0, -1);
            dictionary = ESvalid[`d${id - 1}`];
        } else if (word.endsWith('es')) {
            word = word.slice(0, -2);
            dictionary = ESvalid[`d${id - 2}`];
        }
        console.log(dictionary);
        
        console.log(dictionary.includes(word));

        if (dictionary.includes(word)) {
            return true;
        }

        return false;
    }


    return {
        SelectWord,
        ValidateWord,
        Backspace,
        Typing,
        RestartGame
    }

}