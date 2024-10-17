import { useStore } from '@nanostores/react';
import { useEffect, useState } from "react";
import { TryStore, WordLengthStore, AlertStore, isGameActiveStore } from "@Context/GlobalStore";
import GameFunct from "@Utilities/Game";
import PlayAgain from '@Components/Buttons/PlayAgain';

import Row from "./Row/Row";

export default function Game() {
    //Hooks
    const GF = GameFunct()

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
            if (currentRow >= Try) {
                return;
            }

            setWordGuess((prev) => prev + e.key);
            setCurrentLetter((v) => (v < WordLength + 1 ? v + 1 : WordLength + 1));

            let updateGame = GF.Typing(gameStatus, currentRow, currentLetter, e.key);
            setGameStatus(updateGame);

        } else if (e.key === "Backspace") {
            setWordGuess((prev) => prev.slice(0, -1));
            setCurrentLetter((v) => (v > 0 ? v - 1 : 0));

            let updateGame = GF.Backspace(gameStatus, currentRow, currentLetter, e.key);
            setGameStatus(updateGame);

        } else if (e.key === "Enter") {
            if (currentRow >= Try) {
                AlertStore.set("Número máximo de intentos alcanzado");
                return;
            }
            if (WordGuess.length !== WordLength) {
                AlertStore.set('Insofucientes letras');
                return;
            }


            let [updateGame, isWin, exist] = GF.ValidateWord(WordGuess, Word, gameStatus, currentRow, WordLength)
            console.log(Word);

            if (!exist) {
                // Si la palabra no existe, retorna pero actualiza el estado del juego
                AlertStore.set('La palabra no existe');
                setGameStatus(updateGame);
                return;
            } else {
                // Avanzar al siguiente intento
                setGameStatus(updateGame);
                setCurrentRow((v) => (v < Try - 1 ? v + 1 : Try));
                setCurrentLetter(0);
                setWordGuess("");
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
            }
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
                !isGameActive ? <PlayAgain/> : null
            }
        </div>
    )
}