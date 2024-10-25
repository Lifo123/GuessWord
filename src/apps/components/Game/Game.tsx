import './Game.css'
import { useStore } from '@nanostores/react';
import { GameStore, GameSettingsStore } from "@Apps/context/GameStore";
import useGame from '@Apps/hooks/useGame';

import Row from "./Row";
import PlayAgain from '@Components/Buttons/PlayAgain';

export default function Game() {
    //GameStores
    const GAME = useStore(GameStore)
    const SETTINGS = useStore(GameSettingsStore)

    //Hooks
    const GF = useGame();

    return (
        <div className="board f-col g-2 f-center">
            {
                GAME?.valid?.map((row: any, i: number) => (
                    <Row key={i} id={i} row={row} />
                ))
            }
            {
                GAME?.isWin ? <PlayAgain funct={GF.restartGame} /> : null
            }
        </div>
    )
}