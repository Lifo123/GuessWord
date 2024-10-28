import context from "@Apps/context/GameStore";
import Util from '@Utilities/GlobalUtilities'
import Local from "@Utilities/Local";
import { node } from 'lifo-utils'
import { toast } from "sonner";

const typing = (input: string) => {
    const data = context.game.get()
    if (data?.restart) {
        return;
    }

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
    if (data?.restart) {
        return;
    }

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
    let data = Local.inmutable(context.game.get());
    if (data?.restart) {
        return;
    }

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
    data.isWin = !isValidWord?.isWin ? null : isValidWord?.isWin;

    //Perdio
    if (data.currentRow === data.valid.length && data.isWin === null) {
        data.isWin = false
        setTimeout(() => {
            toast(data.word, {
                duration: 1500,

            });
        }, data.valid.length * 150);
    }

    //Guardar y actualizar
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