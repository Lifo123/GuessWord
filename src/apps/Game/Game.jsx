import { useState } from "react";
import { useStore } from '@nanostores/react';
import { DifficultyStore, WordStore } from "@Context/GlobalStore";

import Row from "./Row/Row";
 
 
export default function Game(){
    //GlobalStore
    const Difficult = useStore(DifficultyStore);
    const Word = useStore(WordStore);

    //States

   return (
       <div className="f-col g-3 f-center">
           {
               Difficult.map((row, index)=>{
                   return <Row key={index} word={Word} />
               })
           }
           <span className="btn btn-green br-4 w-100 text-center">Validate</span>
       </div>
   )
}