import { useStore } from '@nanostores/react';
import { useEffect, useState } from "react";
import { TryStore, WordLengthStore, WordStore } from "@Context/GlobalStore";
import GameFunct from "@Utilities/Game";

import Row from "./Row/Row";

export default function Game() {
    //Hooks
    const GF = GameFunct()

    //GlobalStores
    const WordLength = useStore(WordLengthStore)

    //States
    const [gameStatus, setGameStatus] = useState(
        JSON.parse(localStorage.getItem("test")) ||
        Array.from({ length: TryStore.get() }, () => 
            Array.from({ length: WordLengthStore.get() }, () => "")
        )
    )
    const [Word, setWord] = useState( GF.SelectWord(WordLength) || "Glass")
    const [currentRow, setCurrentRow] = useState(0)
    const [WordGuess, setWordGuess] = useState("")

    //Functions
    const handleKeyDown = (e) => {
        const letter = /^[a-zA-ZñÑ]$/;
        let indexLetter = 0;

        if (letter.test(e.key) && WordGuess.length < WordLength) {
            setWordGuess((prev) => prev + e.key);

            let updateRow = gameStatus[currentRow]
            let updateLetter = updateRow[indexLetter]
            updateLetter = e.key


        } else if (e.key === "Backspace") {
            setWordGuess((prev) => prev.slice(0, -1));
        } else if (e.key === "Enter") {
            GF.ValidateWord(WordGuess, Word, gameStatus, currentRow)
            
        }

    }

    //Effects
    useEffect(() => {
        const category = ES[`d${WordLength}`]
        let SelectWord = category[Random.Generate(category.length)];
        if (SelectWord) {
            WordStore.set(SelectWord)
            console.log(SelectWord);
            
            let inputLetters = [];
            for(let i = 0; i < Try; i++) {
                inputLetters.push({})
                for(let j = 0; j < SelectWord.length; j++) {
                    inputLetters[i][j] = '';
                }
            }
            setGame(inputLetters);
            
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };

    }, [])

    return (
        <div className="board f-col g-2 f-center">
            {
                gameStatus?.map((row, index) => {
                    return <Row key={index} word={Word} id={index} />
                })
            }
        </div>
    )
}