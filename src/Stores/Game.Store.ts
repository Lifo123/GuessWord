import { deepMap, onMount } from 'nanostores'
import type { GuessWordStore } from '../Types/Game.Types'
import { _setting } from './Settings.Store';
import { Local } from '@lifo123/library/utils';
import { toast } from '@lifo123/library/Toast';
import { GameUtils } from '@/utils/Game.Utils';
import { GameServices } from '@/services/Game.Services';

const isBrowser = typeof window !== 'undefined';

const initialData: GuessWordStore = {
    word: '',
    guess: '',
    valid: Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => ({ letter: '', state: undefined }))),
    currentRow: 0,
    currentLetter: 0,
    isWin: undefined,
    restart: false,
}

export const _game = deepMap<GuessWordStore>(isBrowser ? Local.get('guessword').game || initialData : initialData);
const SETTING = _setting.get();

onMount(_game, () => {
    const data = _game.get()
    if (data.word === '') {
        GameServices.getWord()
    }

})

const typing = (value: string) => {
    const DATA = _game.get();

    if (DATA.currentLetter >= DATA.word.length || DATA.isWin || DATA.currentRow >= DATA.valid.length) {
        return;
    }

    const updatedValid = [...DATA.valid];
    updatedValid[DATA.currentRow][DATA.currentLetter] = { letter: value, state: undefined };

    _game.set({
        ...DATA,
        currentLetter: DATA.currentLetter + 1,
        valid: updatedValid
    });
};

const backspace = () => {
    const DATA = _game.get();

    if (DATA.currentLetter <= 0 || DATA.isWin || DATA.currentRow >= DATA.valid.length) {
        return;
    }

    const updatedValid = [...DATA.valid];
    const currentIndex = DATA.currentLetter - 1;

    const isLetter = DATA.valid[DATA.currentRow][DATA.currentLetter]?.letter;
    const indexToClear = isLetter ? DATA.currentLetter : currentIndex;

    if (indexToClear < 0) return;

    updatedValid[DATA.currentRow][indexToClear] = { letter: '', state: undefined };

    _game.set({
        ...DATA,
        currentLetter: indexToClear,
        valid: updatedValid
    });
};

const enter = async () => {
    const DATA = { ..._game.get() };

    if (DATA.isWin || DATA.currentRow > DATA.valid.length - 1) {
        return;
    }

    const isComplete = DATA.valid[DATA.currentRow].every(letter => letter.letter);

    if (!isComplete) {
        const DIV = document.querySelector(`[data-row="${DATA.currentRow}"]`)
        DIV?.classList.add('error')
        toast.error('Field is not complete');
        setTimeout(() => {
            DIV?.classList.remove('error')
        }, 400)
        return;
    }
    toast.dismiss();

    const guess = DATA.valid[DATA.currentRow].map((box: any) => box.letter).join('')
    const validCompare = GameUtils.compareWord(DATA.word.toUpperCase(), guess.toUpperCase());

    for (let i = 0; i < DATA.valid[DATA.currentRow].length; i++) {
        DATA.valid[DATA.currentRow][i].state = validCompare.result[i]
    }


    if (validCompare.isWin) {
        DATA.isWin = true;
        _game.set(DATA);
        Local.set('guessword', {
            game: DATA,
            setting: SETTING
        });
        return;
    }

    if (DATA.currentRow === DATA.valid.length - 1) {
        DATA.isWin = false;
        _game.set(DATA);
        Local.set('guessword', {
            game: DATA,
            setting: SETTING
        });
        toast.show(DATA.word);
        return;
    }

    DATA.currentLetter = 0;
    DATA.currentRow = DATA.currentRow + 1;
    DATA.guess = '';

    _game.set(DATA);
    Local.set('guessword', {
        game: DATA,
        setting: SETTING
    });
}

const restart = () => {
    const resetData = {
        ...initialData,
        valid: Array.from({ length: SETTING.tries }, () =>
            Array.from({ length: SETTING.length }, () => ({ letter: '', state: undefined }))
        )
    };
    _game.set(resetData);
};


export const ManageGame = {
    typing,
    backspace,
    enter,
    restart
}