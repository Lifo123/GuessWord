import { useEffect } from "react";
import { useStore } from "@nanostores/react";
import context from "@Apps/context/GameStore";
import { toast } from "sonner";
import { control } from "@Apps/utilities/GameControl";
import popup from "@Apps/utilities/GameUtils";
import Util from "@Utilities/GlobalUtilities";
import wordService from "@Services/WordleServices";

export default function useGame() {
    //GameStore
    const GAME = useStore(context.game)
    const SETTINGS = useStore(context.setting)

    //Functions
    const restartGame = async () => {
        let data = Util.Local.inmutable(context.initialData)
        let stadistic = context.stadistic.get();

        const fetchWordPromise = wordService.getWord();
        await toast.promise(fetchWordPromise, {
            loading: 'Cargando...',
            error: 'Error al cargar la palabra',
        });

        const fetchWord = await fetchWordPromise;
        data.game.word = fetchWord;
        data.game.restart = false;
        data.game.isWin = null;
        data.game.valid = Array(SETTINGS.tries).fill(Array(SETTINGS.length).fill({ char: '', isValid: null }));
        data.settings.tries = SETTINGS.tries;
        data.stadistic = stadistic;

        context.game.set(data.game);
        Util.Local.set('F-Wordle', data);
        popup.popup('res', 0);

        const KEYS = document.querySelectorAll('[data-char]')
        KEYS.forEach((KEY: any) => {
            KEY.removeAttribute('data-valid')
        })
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
        let local = Util.Local.get('F-Wordle')
        if (!local?.game?.word) {
            wordService.getWord()
        }
    }, [])

    return {
        restartGame
    }


}
