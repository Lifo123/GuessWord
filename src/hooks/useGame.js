import ES from "@Assets/dictionary/ES_Game.json"
import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { currentLetterStore, currentRowStore, gameStateStore, WordStore, WordLengthStore, TryStore, WordGuessStore } from "@Apps/context/GameStore";
import { LocalWordle, LocalWordleSet } from "@Utilities/WordleUtilities";
import { SelectWord, Typing, Backspace, ValidateWord, ExistWord } from "@Services/WordleServices";
import { toast } from "sonner";

export default function useGame() {
    //States
    const [isGameActive, setIsGameActive] = useState(true)
    const [isRender, setIsRender] = useState(false)

    //GameStore
    const Word = useStore(WordStore)
    const WordGuess = useStore(WordGuessStore)
    const gameState = useStore(gameStateStore)
    const currentRow = useStore(currentRowStore)
    const currentLetter = useStore(currentLetterStore)

    //GameSettingsStore
    const WordLength = useStore(WordLengthStore)
    const Tries = useStore(TryStore)

    //Functions
    const KeyDown = (e) => {
        const letter = /^[a-zA-ZñÑ]$/;
        if (!isGameActive) return;

        if (letter.test(e.key) && WordGuess.length < WordLength) {
            currentLetterStore.set(currentLetter + 1);
            WordGuessStore.set(WordGuess + e.key);
            gameStateStore.set(Typing(gameStateStore.get(), currentRow, currentLetter, e.key));
        } else if (e.key === "Backspace" && WordGuess.length > 0) {
            gameStateStore.set(Backspace(gameStateStore.get(), currentRow, currentLetter))
            WordGuessStore.set(WordGuess.slice(0, -1));
            currentLetterStore.set(currentLetter - 1);
        } else if (e.key === "Enter" && currentRow < Tries) {
            if (WordGuess.length !== WordLength) {
                toast('Insofucientes letras', {
                    className: 'toast-warning mx-auto br-6 fw-600',
                });
                return;
            }

            const isExist = ExistWord(WordGuess, WordLength)

            if (!isExist) {
                toast('La palabra no existe', {
                    className: 'toast-warning mx-auto br-6 fw-600',
                });
            } else {
                const [newGameState, isWin] = ValidateWord(Word, gameState, currentRow);
                gameStateStore.set(newGameState);
                currentRowStore.set(currentRow + 1);
                currentLetterStore.set(0);
                WordGuessStore.set('');
            }
        }

    }

    //Effects
    useEffect(() => {
        setIsRender(true)
    }, [])

    useEffect(() => {
        let localWordle = LocalWordle();
        let updateGame = Array(Tries).fill(Array(WordLength).fill({ letter: '', state: null }))
        let newWord = SelectWord(ES, WordLength);

        currentLetterStore.set(0);
        currentRowStore.set(0);
        WordGuessStore.set('');
        WordStore.set(newWord);
        gameStateStore.set(updateGame);

        let updateLocal = {
            ...localWordle,
            Game: { ...localWordle.Game, gameState: updateGame, currentLetter: 0, currentRow: 0, Word: newWord, WordGuess: '' },
            Settings: { ...localWordle.Settings, Tries: Tries, wordLength: WordLength }
        };

        LocalWordleSet(updateLocal)
    }, [WordLength, Tries])

    useEffect(() => {
        if (isGameActive) {
            window.addEventListener('keydown', KeyDown);
        }

        return () => {
            window.removeEventListener('keydown', KeyDown);
        };
    }, [isGameActive, WordGuess]);

    useEffect(() => {
        if (isGameActive) {

        }
    }, [isGameActive])

}
