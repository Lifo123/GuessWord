import { deepMap, onMount } from 'nanostores'
import type { GuessWordStore } from '../Types/Game.Types'
import { _setting } from './Settings.Store';
import { Local } from '@lifo123/library/utils';
import { toast } from '@lifo123/library/Toast';
import { GameUtils } from '@/utils/Game.Utils';
import { GameServices } from '@/services/Game.Services';

export const initialData: GuessWordStore = {
    word: '',
    guess: '',
    valid: Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => ({ letter: '', state: undefined }))),
    currentRow: 0,
    currentLetter: 0,
    isWin: undefined,
    restart: false,
}

export const _game = deepMap<GuessWordStore>(initialData);

const typing = (value: string) => {
    const DATA = _game.get();
    const SETTING = _setting.get();

    if (DATA.currentLetter >= SETTING.length || DATA.isWin || DATA.currentRow >= SETTING.tries) {
        return;
    }

    const updatedLetter = DATA.valid[DATA.currentRow][DATA.currentLetter];
    updatedLetter.letter = value;
    updatedLetter.state = undefined;

    _game.setKey('currentLetter', DATA.currentLetter + 1);
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
    const SETTING = _setting.get();

    if (DATA.isWin || DATA.currentRow > DATA.valid.length - 1) {
        return;
    }

    const isComplete = DATA.valid[DATA.currentRow].every(letter => letter.letter);
    const DIV = document.querySelector(`[data-row="${DATA.currentRow}"]`)

    const handleError = (msg: string) => {
        DIV?.classList.add('error')
        toast.error(msg);
        setTimeout(() => {
            DIV?.classList.remove('error')
        }, 400)
    }

    if (!isComplete) {
        handleError('Field is not complete')
        return;
    }
    toast.dismiss();

    const guess = DATA.valid[DATA.currentRow].map((box: any) => box.letter).join('')
    const isValidWord = await GameServices.existWord(guess, SETTING.lang, SETTING.length);

    if (!isValidWord) {
        handleError('Invalid word')
        return;
    }

    const validCompare = GameUtils.compareWord(DATA.word.toUpperCase(), guess.toUpperCase());

    validCompare.result.forEach((state, i) => {
        DATA.valid[DATA.currentRow][i].state = state;
    });


    if (validCompare.isWin) {
        _game.setKey('isWin', true);
        Local.set('guessword', {
            game: _game.get(),
            setting: SETTING
        });
        return;
    } else if (DATA.currentRow === DATA.valid.length - 1) {
        _game.setKey('isWin', false);
        toast.show(DATA.word);
        Local.set('guessword', {
            game: _game.get(),
            setting: SETTING
        });
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
    const SETTING = _setting.get();
    const resetData = {
        ...initialData,
        valid: Array.from({ length: SETTING.tries }, () =>
            Array.from({ length: SETTING.length }, () => ({ letter: '', state: undefined }))
        )
    };
    _game.set(resetData);
    Local.set('guessword', {
        game: resetData,
        setting: SETTING
    });
    // window.location.reload();
    // return;
    const KEYS = document.querySelectorAll('.key-box');
    KEYS.forEach(KEY => KEY.removeAttribute('data-valid'));
};


export const ManageGame = {
    typing,
    backspace,
    enter,
    restart
}