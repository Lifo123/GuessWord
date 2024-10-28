import './Game.css'
import { useStore } from '@nanostores/react';
import context from "@Apps/context/GameStore";
import useGame from '@Apps/hooks/useGame';

import Row from "./Row";
import PlayAgain from '@Apps/components/Additionals/PlayAgain';
import { useEffect } from 'react';
import Teclado from './Teclado';

export default function Game() {
    //GameStores
    const GAME = useStore(context.game)
    const SETTINGS = useStore(context.setting)

    //Hooks
    const GF = useGame();

    return (
        <div className="board f-col g-2 f-center h-100 w-100 relative pb-5">
            {
                GAME?.restart ? <PlayAgain delay={0} funct={GF.restartGame} /> :
                    GAME?.isWin !== null ? <PlayAgain delay={SETTINGS.length + 2} funct={GF.restartGame} /> : null
            }
            <div className='board-cont f-col g-2'>
                {
                    GAME?.valid?.map((row: any, i: number) => (
                        <Row key={i} id={i} row={row} />
                    ))
                }
            </div>
            <Teclado />
        </div>
    )
}