import { GameServices } from "@/services/Game.Services";
import { _game, initialData } from "@/Stores/Game.Store";
import { _setting } from "@/Stores/Settings.Store";
import { _user } from "@/Stores/User.Store";
import type { LanguageTypes, ModeTypes } from "@/Types/Settings.Types";
import { Local } from "@lifo123/library/utils";

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

const validatePrevData = async (path: ModeTypes, lang: LanguageTypes, length: number) => {
    const GAME = Local.get(`wordguess-${path}`)?.game || initialData;
    if (GAME?.word === '') {
        try {
            const word = await GameServices.getWord(lang, length);
            GAME.word = word;
        } catch (error) {
            console.error("Error fetching word:", error);
            GAME.isWin = false;
        }
    }
    _game.set(GAME);
    saveLocal(path);
}

const saveLocal = (path: ModeTypes) => {
    Local.set(`wordguess-${path}`, _game.get())
    Local.set('wordguess-setting', _setting.get())
    Local.set('wordguess-user', _user.get())
}



export const GameUtils = {
    compareWord,
    saveLocal,
    validatePrevData,
}