import { useStore } from '@nanostores/react';
import { useEffect, useState } from "react";
import useGame from '@Hooks/useGame';
import { TryStore, WordLengthStore, AlertStore, isGameActiveStore } from "@Context/GlobalStore";
import PlayAgain from '@Components/Buttons/PlayAgain';

import Row from "./Row/Row";

export default function Game() {
    //Hooks
    const GF = useGame()

    //GlobalStores
    const WordLength = useStore(WordLengthStore)
    const Try = useStore(TryStore)
    const isGameActive = useStore(isGameActiveStore)

    //States
    const [gameStatus, setGameStatus] = useState(
        JSON.parse(localStorage.getItem("WordleGame")) ||
        Array.from({ length: Try }, () =>
            Array.from({ length: WordLengthStore.get() }, () => ({ letter: '', state: null }))
        )
    )
    const [Word, setWord] = useState(GF.SelectWord(WordLength) || "Glass")
    const [currentRow, setCurrentRow] = useState(0)
    const [currentLetter, setCurrentLetter] = useState(0)
    const [WordGuess, setWordGuess] = useState("")

    //Functions
    const handleKeyDown = (e) => {
        const letter = /^[a-zA-ZñÑ]$/;

        if (letter.test(e.key) && WordGuess.length < WordLength) {
            handleTyping(e.key);
        } else if (e.key === "Backspace") {
            handleBackspace();
        } else if (e.key === "Enter") {
            handleEnter();
        }
    }

    //Function
    const RestartValues = (type) => {
        if (type === 1) {
            setWordGuess('');
            setCurrentLetter(0);
            return;
        }
        setGameStatus(GF.RestartGame(gameStatus));
        setCurrentRow(0);
        setWordGuess('');
        setCurrentLetter(0);
    }

    const handlePlayAgain = () => {
        RestartValues(0);  // Resetea los valores
        setWord(GF.SelectWord(WordLength)); // Selecciona una nueva palabra
        isGameActiveStore.set(true);  // Reactiva el juego
    }

    const handleTyping = (leter) => {
        if (currentRow >= Try) {
            return;
        }

        setWordGuess((prev) => prev + leter);
        setCurrentLetter((v) => (v < WordLength + 1 ? v + 1 : WordLength + 1));

        let updateGame = GF.Typing(gameStatus, currentRow, currentLetter, leter);
        setGameStatus(updateGame);
    }

    const handleBackspace = () => {
        setWordGuess((prev) => prev.slice(0, -1));
        setCurrentLetter((v) => (v > 0 ? v - 1 : 0));

        let updateGame = GF.Backspace(gameStatus, currentRow, currentLetter);
        setGameStatus(updateGame)
    }

    const handleEnter = () => {
        if (WordGuess.length !== WordLength) {
            AlertStore.set(['Insofucientes letras', 1]);
            return;
        }


        let [updateGame, isWin, exist] = GF.ValidateWord(WordGuess, Word, gameStatus, currentRow, WordLength)
        console.log(Word);

        if (!exist) {
            // Si la palabra no existe, retorna pero actualiza el estado del juego
            AlertStore.set(['La palabra no existe', 1]);
            setGameStatus(updateGame);
            return;
        } else {
            // Avanzar al siguiente intento
            setGameStatus(updateGame);
            setCurrentRow((v) => (v < Try - 1 ? v + 1 : Try));
            RestartValues(1)
        }

        if (isWin) {
            const boxNodes = document.querySelectorAll(`[row="${currentRow}"] .box-letter`);
            setTimeout(() => {
                boxNodes.forEach((node, index) => {
                    setTimeout(() => {
                        node.setAttribute('win', 'true');
                    }, index * 100);
                });
            }, (WordLength + 1) * 260);
            isGameActiveStore.set(false);
            window.removeEventListener('keydown', handleKeyDown);
        } else if (!isWin && currentRow === Try - 1) {
            setTimeout(() => {
                AlertStore.set([Word, 2])
            }, (WordLength + 1) * 260)
            isGameActiveStore.set(false)
            window.removeEventListener("keydown", handleKeyDown)
        }
    }

    //Effects
    useEffect(() => {
        if (isGameActive) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isGameActive, WordGuess]);

    return (
        <div className="board f-col g-2 f-center">
            {
                gameStatus?.map((row, index) => {
                    return <Row key={index} id={index} row={row} currentRow={currentRow} />
                })
            }
            {
                !isGameActive ? <PlayAgain funct={handlePlayAgain} /> : null
            }
        </div>
    )
}