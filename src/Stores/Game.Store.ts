import { deepMap } from 'nanostores'
import type { GuessWordStore } from '../Types/Game.Types'
import { _setting } from './Settings.Store';
import { toast } from '@lifo123/library/Toast';
import { GameUtils } from '@/utils/Game.Utils';
import { GameServices } from '@/services/Game.Services';
import type { ModeTypes } from '@/Types/Settings.Types';
import { Local } from '@lifo123/library/utils';
import { _user, ManageUser } from './User.Store';

export const initialData: GuessWordStore = {
    word: '',
    guess: '',
    valid: Array.from({ length: _setting.get().tries }, () => Array.from({ length: _setting.get().length }, () => ({ letter: '', state: undefined }))), 
    currentRow: 0,
    currentLetter: 0,
    isWin: undefined,
    isDaily: false,
    waiting: false
}

export const _game = deepMap<GuessWordStore>(initialData);

const typing = (value: string) => {
    const DATA = _game.get();
    const SETTING = _setting.get();

    if (DATA.currentLetter >= SETTING.length || DATA.isWin || DATA.currentRow >= SETTING.tries) {
        return;
    }

    if (DATA.currentLetter < 0) {
        DATA.currentLetter = 0;
    } else if (DATA.currentLetter > DATA.valid[0].length - 1) {
        DATA.currentLetter = DATA.valid[0].length - 1;
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

const enter = async (path: ModeTypes) => {
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
        _game.setKey('lastPlayed', Date.now());
        setTimeout(() => {
            _game.setKey('waiting', true);
        }, (DATA.valid[0].length) * 350)
    } else if (DATA.currentRow === DATA.valid.length - 1) {
        _game.setKey('isWin', false);
        _game.setKey('lastPlayed', Date.now());
        setTimeout(() => {
            _game.setKey('waiting', true);
            toast.show(DATA.word);
        }, (DATA.valid[0].length) * 230)
    } else {
        DATA.currentLetter = 0;
        DATA.currentRow = DATA.currentRow + 1;
        DATA.guess = '';
        _game.set(DATA);
    }

    GameUtils.saveLocal(path);
}

const restart = async (path: ModeTypes) => {
    const USER = _user.get()

    if (!USER.isPremium) {
        ManageUser.decrementGames();
    }

    const GAME = Local.inmutable(_game.get())
    const SETTING = _setting.get();

    const resetData = {
        ...GAME,
        ...initialData,
        valid: Array.from({ length: SETTING.tries }, () =>
            Array.from({ length: SETTING.length }, () => ({ letter: '', state: undefined }))
        )
    };

    const word = await GameServices.getWord(SETTING.lang, SETTING.length);
    resetData.word = word;

    _game.set(resetData);

    GameUtils.saveLocal(path);
    const KEYS = document.querySelectorAll('.key-box');
    KEYS.forEach(KEY => KEY.removeAttribute('data-valid'));
};


export const ManageGame = {
    typing,
    backspace,
    enter,
    restart
}