import context from "@Apps/context/GameStore";
import Util from '@Utilities/GlobalUtilities'
import { node } from 'lifo-utils'
import { toast } from "sonner";

const typing = (input: string) => {
    const data = context.game.get()
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

    context.game.set(updatedData);
}

const backspace = () => {
    const data = context.game.get();
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

    context.game.set(updatedData);
}

const enter = () => {
    let data = { ...context.game.get() };
    const curLetter = data.currentLetter

    if (curLetter < data.valid[0].length) {
        toast.error('Field is not complete');
        return;
    }
    toast.dismiss();

    const curRow = data.currentRow
    const guess = data.valid[curRow].map((box: any) => box.char).join('')

    //Validation Word
    const isValidWord: any = Util.utils.compareWord(data.word, guess);

    for (let i = 0; i < data.valid[curRow].length; i++) {
        data.valid[curRow][i].isValid = isValidWord.result[i]
    }

    data.currentRow = curRow + 1;
    data.currentLetter = 0;
    data.isWin = isValidWord?.isWin;


    context.game.set(data);
    Util.Local.set('F-Wordle', {
        game: data,
        settings: context.setting.get(),
        visual: context.visual.get()
    });

}


export const control = {
    typing,
    backspace,
    enter
};