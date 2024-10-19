import './Game.css'
import { useStore } from '@nanostores/react';
import { gameProgressStore, gameStateStore } from "@Apps/context/GameStore";
import useGame from '@Hooks/useGame';

import Row from "./Row/Row";
import PlayAgain from '@Components/Buttons/PlayAgain';

export default function Game() {
    //Hooks
    const { restartGame } = useGame();

    //GameStores
    const gameState = useStore(gameStateStore)
    const gameProgress = useStore(gameProgressStore)

    return (
        <div className="board f-col g-2 f-center">
            {
                gameState?.map((row, index) => {
                    return <Row key={index} id={index} row={row} />
                })
            }
            {
                gameProgress === 'again' ? <PlayAgain funct={restartGame} /> : null
            }
        </div>
    )
}