import { node } from 'lifo-utils'
import { toast } from "sonner";
import context from "@Apps/context/GameStore";
import Local from '@Utilities/Local';

const setWordLength = (length: number) => {
    const GAME = Local.inmutable(context.game.get());
    const SETTING = Local.inmutable(context.setting.get());

    GAME.valid = Array.from({ length: SETTING.tries }, () => Array.from({ length: Number(length) }, () => ({ char: '', isValid: null })))
    GAME.currentLetter = 0;
    GAME.restart = true;
    GAME.currentRow = 0;

    SETTING.length = Number(length);

    context.game.set(GAME);
    context.setting.set(SETTING);

    Local.set('F-Wordle', {
        game: GAME,
        settings: SETTING,
        visual: context.visual.get()
    });

}

const setTries = (tries: number) => {
    const GAME = Local.inmutable(context.game.get());
    const SETTING = Local.inmutable(context.setting.get());

    GAME.valid = Array.from({ length: Number(tries) }, () => Array.from({ length: SETTING.length }, () => ({ char: '', isValid: null })))
    GAME.currentLetter = 0;
    GAME.currentRow = 0;;

    SETTING.tries = Number(tries);

    context.game.set(GAME);
    context.setting.set(SETTING);

    Local.set('F-Wordle', {
        game: GAME,
        settings: SETTING,
        visual: context.visual.get()
    });
}

const setLanguage = (language: string) => {

}

const SETTINGS = {
    setWordLength,
    setTries,
    setLanguage
}

export default SETTINGS