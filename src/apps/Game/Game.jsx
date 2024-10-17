import { useStore } from '@nanostores/react';
import { useEffect, useState } from "react";
import { TryStore, WordLengthStore, AlertStore, currentLetterStore } from "@Context/GlobalStore";
import GameFunct from "@Utilities/Game";

import Row from "./Row/Row";

export default function Game() {
    //Hooks
    const GF = GameFunct()

    //GlobalStores
    const WordLength = useStore(WordLengthStore)
    const Try = useStore(TryStore)
    const cleter = useStore(currentLetterStore)

    //States
    const [gameStatus, setGameStatus] = useState(
        JSON.parse(localStorage.getItem("WordleGame")) ||
        Array.from({ length: Try }, () => 
            Array.from({ length: WordLengthStore.get() }, () => ({ letter: '', state: null }))
        )
    )
    const [Word, setWord] = useState( GF.SelectWord(WordLength) || "Glass")
    const [currentRow, setCurrentRow] = useState(0)
    const [currentLetter, setCurrentLetter] = useState(0)
    const [WordGuess, setWordGuess] = useState("")
    const [isGameActive, setIsGameActive] = useState(true)

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
            if(WordGuess.length !== WordLength){
                AlertStore.set('Insofucientes letras');          
                return;
            }


            let [updateGame, isWin] = GF.ValidateWord(WordGuess, Word, gameStatus, currentRow)
            console.log(Word);
            
            if (isWin) {
                const boxNodes = document.querySelectorAll(`[row="${currentRow}"] .box-letter`);
                setTimeout(() => {
                    boxNodes.forEach((node, index) => {
                        setTimeout(() => {
                            node.setAttribute('win', 'true');
                        }, index * 100);
                    });
                }, (WordLength + 1) * 260);
                setIsGameActive(false);
                window.removeEventListener('keydown', handleKeyDown);
            }
            
            setGameStatus(updateGame)
            setCurrentRow((v) => (v < Try - 1 ? v + 1 : Try));
            setCurrentLetter(0);
            setWordGuess("");
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

    useEffect(() => {
        setCurrentLetter(cleter);
    }, [cleter])

    return (
        <div className="board f-col g-2 f-center">
            {
                gameStatus?.map((row, index) => {
                    return <Row key={index} id={index} row={row} currentRow={currentRow}/>
                })
            }
        </div>
    )
}