import Util from "@Utilities/GlobalUtilities";
import context from "@Apps/context/GameStore"
import global from "@Context/GlobalStore"

const getWord = async () => {
    try {
        let data = context.initialData

        if (global.Params.get()) {
            data = Util.utils.setParams(global.Params.get(), data)
            context.game.set(data.game)
            context.setting.set(data.settings)
            Util.Local.set('F-Wordle', data)
            return
        }
        
        const res = await fetch(`https://app-eqlfk354ea-uc.a.run.app/word/`)
        const word = await res.json()
       
        Util.Local.set('F-Wordle', {
            game: {
                word: word,
                valid: Array(data.settings.tries).fill(Array(data.settings.length).fill({ char: '', isValid: null })),
                currentRow: 0,
                currentLetter: 0,
                isWin: null,
                restart: false
            },
            settings: context.setting.get(),
            visual: context.visual.get(),
            stadistic: context.stadistic.get()
        })
        context.game.set({...context.game.get(), word: word})


        return word

    } catch (e) {
        console.log(e)
        return null
    }
}

const WORDLE = {
    getWord
}


export default WORDLE