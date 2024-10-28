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
        let local = Util.Local.get('F-Wordle')
        let data = context.initialData

        if (PARAMS) {
            data = Util.utils.setParams(PARAMS, data)
            context.game.set(data.game)
            context.setting.set(data.settings)
            Util.Local.set('F-Wordle', data)
            return
        }

        if (local?.game?.word) {
            return
        }

        restartGame()
    }

    const restartGame = () => {
        let data = Util.Local.inmutable(context.initialData)

        const fetchWord = fetch(`https://app-eqlfk354ea-uc.a.run.app/word/`)
            .then(res => res.json())
            .then(word => {
                data.game.word = word;
                data.game.restart = false;
                data.game.isWin = null;
                context.game.set(data.game);
                Util.Local.set('F-Wordle', data);
            });

        toast.promise(fetchWord, {
            loading: 'Cargando...',
            error: 'Error al cargar la palabra',
        });
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
        if (GAME?.isWin || GAME?.currentRow === GAME?.valid.length || GAME?.restart) {
            window?.removeEventListener('keydown', handleKeyDown);
        } else {
            window?.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window?.removeEventListener('keydown', handleKeyDown)
        }
    }, [GAME?.isWin, GAME?.restart])

    useEffect(() => {
        getWord()
    }, [])

    return {
        getWord,
        restartGame
    }


}
