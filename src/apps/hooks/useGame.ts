import { useEffect } from "react";
import { useStore } from "@nanostores/react";
import { GameStore, GameSettingsStore, initialGame, GameVisualStore } from "@Apps/context/GameStore";
import { getWord } from "@Services/WordleServices";
import { toast } from "sonner";
import { control } from "@Apps/utilities/GameControl";
import { Local } from "@Utilities/Local";

export default function useGame() {
    //GameStore
    const GAME = useStore(GameStore)
    const SETTINGS = useStore(GameSettingsStore)
    const VISUAL = useStore(GameVisualStore)


    //Functions
    const getWord = async () => {
        try {


            return true;
        } catch (e) {
            console.log(e);
            return false
        }
    }

    const restartGame = () => {
        let data = Local.inmutable(initialGame.game)
        GameStore.set(data);
        Local.set('F-Wordle', {
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

    return {
        getWord,
        restartGame,
        restartSettings
    }


}
