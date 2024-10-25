import { useEffect } from "react";
import { useStore } from "@nanostores/react";
import { GameStore, GameSettingsStore } from "@Apps/context/GameStore";
import { getWord } from "@Services/WordleServices";
import { toast } from "sonner";
import { control } from "@Apps/utilities/GameControl";

export default function useGame() {
    //GameStore
    const GAME = useStore(GameStore)
    const SETTINGS = useStore(GameSettingsStore)


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
