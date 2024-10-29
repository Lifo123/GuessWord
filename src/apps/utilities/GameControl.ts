import context from "@Apps/context/GameStore";
import gameUtils from '@Apps/utilities/GameUtils';
import Util from '@Utilities/GlobalUtilities'
import Local from "@Utilities/Local";
import { node } from 'lifo-utils'
import { toast } from "sonner";

const typing = (input: string) => {
    const data = Local.inmutable(context.game.get())
    if (data?.restart || data?.isWin !== null) {
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
    const data = Local.inmutable(context.game.get());
    if (data?.restart || data?.isWin !== null) {
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
    const curRow = data.currentRow

    if (curLetter < data.valid[0].length) {
        const DIV = document.querySelector(`[data-row="${curRow}"]`)
        DIV?.classList.add('error')
        toast.error('Field is not complete');
        setTimeout(() => {
            DIV?.classList.remove('error')
        }, 400)
        return;
    }
    toast.dismiss();

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
        gameUtils.popup('lose', data.valid.length)
        setTimeout(() => {
            toast(data.word, {
                duration: 1500,

            });
        }, data.valid.length * 150);
    }

    data.isWin ? gameUtils.popup('win', data.valid.length + 1) : null

    if (data.isWin) {
        gameUtils.stadistic(true, data.currentRow - 1)
    } else if (data.isWin === false) {
        gameUtils.stadistic(false, data.currentRow - 1)
    }


    //Guardar y actualizar
    context.game.set(data);
    Util.Local.set('F-Wordle', {
        game: data,
        settings: context.setting.get(),
        visual: context.visual.get(),
        stadistic: context.stadistic.get()
    });


}



export const control = {
    typing,
    backspace,
    enter
};