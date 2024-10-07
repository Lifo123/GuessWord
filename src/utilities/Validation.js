import { WordStore } from "@Context/GlobalStore";

export const ValidationWord = () => {
    const RealWord = WordStore.get().toUpperCase().split('');
    const GuessWordNodes = document.querySelectorAll(`[data-row='active'] .game-in`);
    let GuessWord = [];
    let allFilled = true;

    GuessWordNodes.forEach((item) => {
        const letter = item.value.toUpperCase();
        GuessWord.push(letter);
        
        if (letter.length === 0) {
            allFilled = false;
        }
    });


    if (!allFilled) {
        return false;
    } 
}