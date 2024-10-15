import ES from "@Assets/dictionary/ES_API.json"
import useRandom from "@Hooks/useRandom";

export default function GameFunct () {
    //Hooks
    const Random = useRandom()

    const SelectWord = (id) => {
        let category = ES[`d${id}`]
        let Word = category[Random.Generate(category.length)]
        return Word
    }

    const ValidateWord = (guess, word, array, currentRow) => {
        let row = array[currentRow]
        console.log(row);
        
    }

    const Typing = (letter, index, array) => {
        let row = array[index]
        
    }

    return {
        SelectWord,
        ValidateWord,
        Typing
    }

}