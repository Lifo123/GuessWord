import { useEffect } from "react";
import { useStore } from "@nanostores/react";
import context from "@Apps/context/GameStore";
import global from "@Context/GlobalStore";
import { getWord } from "@Services/WordleServices";
import { toast } from "sonner";
import { control } from "@Apps/utilities/GameControl";
import Util from "@Utilities/GlobalUtilities";

export default function useGame() {
    //GameStore
    const GAME = useStore(context.game)
    const SETTINGS = useStore(context.setting)
    const VISUAL = useStore(context.visual)
    const PARAMS = useStore(global.Params)


    //Functions
    const getWord = async () => {
        if (PARAMS) {
            let updateData = Util.utils.setParams(PARAMS, context.initialData)
            context.game.set(updateData.game)
            context.setting.set(updateData.settings)
            Util.Local.set('F-Wordle', updateData)
            return
        }
    }

    const restartGame = () => {
        let data = Util.Local.inmutable(context.initialData.game)
        context.game.set(data);
        Util.Local.set('F-Wordle', {
            game: data,
            settings: SETTINGS,
            visual: VISUAL
        });
    }

    const restartSettings = () => {

    }

    const handleKeyDown = (e: KeyboardEvent) => {
        const letterRegex = /^[a-zA-ZñÑ]$/;

        if (letterRegex.test(e.key)) {
            control.typing(e.key)
        }
        if (e.key === 'Backspace') {
            control.backspace()
        }
        if (e.key === 'Enter') {
            control.enter()
        }
    }

    //Effects
    useEffect(() => {
        if (GAME?.isWin) {
            window?.removeEventListener('keydown', handleKeyDown);
        } else {
            window?.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window?.removeEventListener('keydown', handleKeyDown)
        }
    }, [GAME?.isWin])

    useEffect(() => {
        getWord()
    }, [])

    return {
        getWord,
        restartGame,
        restartSettings
    }


}
