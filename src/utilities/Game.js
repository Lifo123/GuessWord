import ES from "@Assets/dictionary/ES_API.json"
import useRandom from "@Hooks/useRandom";

export default function GameFunct() {
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

    const Backspace = (array, iRow, iLetter, input) => {
        let updateGame = [...array];
        let updateRow = [...updateGame[iRow]];
        let updateLetter = { ...updateRow[iLetter - 1] };

        updateLetter.letter = '';
        updateRow[iLetter - 1] = updateLetter; 
        updateGame[iRow] = updateRow;

        return updateGame;
    }

    const ValidateWord = (guess, word, array, currentRow) => {
        let updateGame = array
        let updateRow = updateGame[currentRow]

        let wordA = word.split('')

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
    
        return updateGame;

    }

    return {
        SelectWord,
        ValidateWord,
        Backspace,
        Typing
    }

}