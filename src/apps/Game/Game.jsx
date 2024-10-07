import { useEffect, useState } from "react";
import { useStore } from '@nanostores/react';
import { DifficultyStore, WordInfoStore, WordStore } from "@Context/GlobalStore";

import Row from "./Row/Row";


export default function Game() {
    //GlobalStore
    const Difficult = useStore(DifficultyStore);
    const Word = useStore(WordStore);

   //States
   const [isMounted, setIsMounted] = useState(false);
   const [isLoaded, setIsLoaded] = useState(true);

   //Variables
   let testword = 'wasa';
   let testwordinfo = [];

   // Efecto para inicializar las tiendas de palabras y su información
   useEffect(() => {
       testword.split('').forEach((letter) => {
           testwordinfo.push({
               letter: letter.toUpperCase(),
               isValid: null,
           });
       });

       setIsMounted(true);
       if (isMounted) {
           WordStore.set(testword.toUpperCase());
           WordInfoStore.set(testwordinfo);
           console.log(WordInfoStore.get());
           
       }
   }, [isMounted]);

    return (
        <div className="f-col g-3 f-center">
            {
                isLoaded ? (
                    Difficult.map((row, index) => {
                        return <Row key={index} word={Word} />
                    })
                ) : <p>Loading</p>
            }
            <span className="btn btn-green br-4 w-100 text-center">Validate</span>
        </div>
    )
}