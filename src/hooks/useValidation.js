import { WordInfoStore } from "@Context/GlobalStore";
import { useStore } from "@nanostores/react";


export default function useValidation() {
    //GlobalStore
    const WordInfo = useStore(WordInfoStore);

    const CompareWord = (array) => {

        console.log(array, WordInfo);

        for (let i = 0; i < WordInfo.length; i++) {
            if (WordInfo[i].letter === array[i]) {
                WordInfo[i].isValid = true;
            }else{
                WordInfo[i].isValid = false;
            }
        }
        console.log(WordInfo);
        
    }

    return { CompareWord };
}