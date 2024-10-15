import { useStore } from '@nanostores/react';
import useRandom from '@Hooks/useRandom';
import { useEffect, useState } from "react";
import { TryStore, WordLengthStore, WordStore } from "@Context/GlobalStore";

import Row from "./Row/Row";
import ES from '@Assets/dictionary/ES_API.json'

export default function Game() {
    //Hooks
    const Random = useRandom();

    //GlobalStore
    const Word = useStore(WordStore);
    const WordLength = useStore(WordLengthStore);
    const Try = Array.from({ length: TryStore.get() });

    //States
    const [game, setGame] = useState([]);
    
    //Functions
    const handleKeyDown = (e) => {
        const letter = /^[a-zA-ZñÑ]$/;
        
        if (letter.test(e.key)) {
            
            
        }

    }

    //Effects
    useEffect(() => {
        const category = ES[`d${WordLength}`]
        let SelectWord = category[Random.Generate(category.length)];
        if (SelectWord) {
            WordStore.set(SelectWord)
            console.log(SelectWord);
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };

    }, [])
    

    return (
        <div className="board f-col g-2 f-center">
            {
                Try.map((row, index) => {
                    return <Row key={index} word={Word} id={index}/>
                })
            }
        </div>
    )
}