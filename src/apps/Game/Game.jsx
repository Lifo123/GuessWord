import './Game.css'
import { useStore } from '@nanostores/react';
import { gameStateStore, isGameActiveStore } from "@Apps/context/GameStore";
import useGame from '@Hooks/useGame';

import Row from "./Row/Row";

export default function Game() {
    //Hooks
    const GF = useGame()

    //GameStores
    const gameState = useStore(gameStateStore)

    return (
        <div className="board f-col g-2 f-center">
            {
                gameState?.map((row, index) => {
                    return <Row key={index} id={index} row={row} />
                })
            }
            
        </div>
    )
}