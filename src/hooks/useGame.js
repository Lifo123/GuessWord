import ES from "@Assets/dictionary/ES_Game.json"
import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { currentLetterStore, currentRowStore, gameStateStore, WordStore, WordLengthStore, TryStore, WordGuessStore, gameProgressStore } from "@Apps/context/GameStore";
import { LocalWordle, LocalWordleSet } from "@Utilities/WordleUtilities";
import { SelectWord, Typing, Backspace, ValidateWord, ExistWord } from "@Services/WordleServices";
import { toast } from "sonner";

export default function useGame() {
    //States
    const [isGameActive, setIsGameActive] = useState(true)

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
            let localWordle = LocalWordle();
            currentLetterStore.set(currentLetter + 1);
            WordGuessStore.set(WordGuess + e.key);
            const updateData = Typing(gameStateStore.get(), currentRowStore.get(), currentLetter, e.key);
            LocalWordleSet({ ...localWordle, Game: { ...localWordle.Game, gameState: updateData } });
            gameStateStore.set(updateData);
        } else if (e.key === "Backspace" && WordGuess.length > 0) {
            gameStateStore.set(Backspace(gameStateStore.get(), currentRow, currentLetter))
            WordGuessStore.set(WordGuess.slice(0, -1));
            currentLetterStore.set(currentLetter - 1);
        } else if (e.key === "Enter" && currentRow < Tries) {
            if (WordGuess.length !== WordLength) {
                toast('Insofucientes letras');
                return;
            }

            const isExist = ExistWord(WordGuess, WordLength)

            if (!isExist) {
                toast('La palabra no existe');
            } else {
                const [newGameState, isWin] = ValidateWord(Word, gameState, currentRow);
                gameStateStore.set(newGameState);
                currentRowStore.set(currentRow + 1);
                currentLetterStore.set(0);
                WordGuessStore.set('');

                if (isWin) {
                    setTimeout(() => {
                        setIsGameActive(false);
                        let boxNodes = document.querySelectorAll(`.game-row[row="${currentRow}"] .box-letter`);
                        boxNodes.forEach((box, index) => {
                            setTimeout(() => {
                                box.setAttribute('win', 'true');
                            }, (index + 1) * 130);
                        });
                        setTimeout(() => {
                            gameProgressStore.set('again');
                        }, (WordLength) * 260)

                    }, (WordLength + 1) * 260)
                }

                if (currentRowStore.get() === Tries) {
                    setTimeout(() => {
                        toast(Word)
                        setIsGameActive(false);
                        gameProgressStore.set('again');
                    }, (WordLength + 1) * 290)
                }

            }
        }

    }

    const restartGame = () => {
        let localWordle = LocalWordle();
        let updateGame = Array(Tries).fill(Array(WordLength).fill({ letter: '', state: null }));
        let newWord = SelectWord(ES, WordLength);

        currentLetterStore.set(0);
        currentRowStore.set(0);
        WordGuessStore.set('');
        WordStore.set(newWord);
        gameProgressStore.set('inProgress');
        gameStateStore.set(updateGame);

        let updateLocal = {
            ...localWordle,
            Game: { 
                ...localWordle?.Game, 
                gameState: 
                updateGame, 
                currentLetter: 0, 
                currentRow: 0, 
                Word: newWord, 
                WordGuess: '',
                gameProgress: 'inProgress'
            },
            Settings: { ...localWordle?.Settings, Tries: Tries, wordLength: WordLength }
        };

        LocalWordleSet(updateLocal);
        setIsGameActive(true);  // Reinicia el juego
    };

    //Effects
    useEffect(() => {
        let localWordle = LocalWordle();
        let updateGame = Array(Tries).fill(Array(WordLength).fill({ letter: '', state: null }))
        let newWord = SelectWord(ES, WordLength);

        currentLetterStore.set(0);
        currentRowStore.set(0);
        WordGuessStore.set('');
        WordStore.set(newWord);
        gameProgressStore.set(undefined);
        gameStateStore.set(updateGame);

        let updateLocal = {
            ...localWordle,
            Game: {
                ...localWordle?.Game,
                gameState: updateGame,
                currentLetter: 0,
                currentRow: 0,
                Word: newWord,
                WordGuess: '',
                gameProgress: 'inProgress',
            },
            Settings: { ...localWordle?.Settings, Tries: Tries, wordLength: WordLength }
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


    return {
        restartGame
    }

}
