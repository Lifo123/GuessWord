import { GameSettingsStore, GameStore } from "@Apps/context/GameStore";
import { Local } from "@Utilities/Local";
import { node } from 'lifo-utils'
import { toast } from "sonner";
import { localUtil } from "./GameUtils";

const typing = (input: string) => {
    const data = GameStore.get()
    const curLetter = data.currentLetter
    const curRow = data.currentRow

    if (curLetter >= data.valid[0].length) {
        return;
    }

    let updatedData = node.set(`valid/${curRow}/${curLetter}/char`, {
        value: input,
        data: data
    })
    updatedData.currentLetter = curLetter + 1

    GameStore.set(updatedData);
}

const backspace = () => {
    const data = GameStore.get();
    const curLetter = data.currentLetter
    const curRow = data.currentRow

    if (curLetter <= 0) {
        return;
    }

    let updatedData = node.set(`valid/${curRow}/${curLetter - 1}/char`, {
        value: '',
        data: data
    })
    updatedData.currentLetter = curLetter - 1

    GameStore.set(updatedData);
}

const enter = () => {
    let data = { ...GameStore.get() };
    const curLetter = data.currentLetter

    if (curLetter < data.valid[0].length) {
        toast.error('Field is not complete');
        return;
    }
    toast.dismiss();

    const curRow = data.currentRow
    const guess = data.valid[curRow].map((box: any) => box.char).join('')

    //Validation Word
    const isValidWord: any = localUtil.compareWord(data.word, guess);

    for (let i = 0; i < data.valid[curRow].length; i++) {
        data.valid[curRow][i].isValid = isValidWord.result[i]
    }

    data.currentRow = curRow + 1;
    data.currentLetter = 0;
    data.isWin = isValidWord?.isWin;

    const settings = GameSettingsStore.get();

    GameStore.set(data);
    Local.set('F-Wordle', {
        game: data,
        settings: settings
    });

}


export const control = {
    typing,
    backspace,
    enter
};