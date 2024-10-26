import './Game.css'
import { useStore } from '@nanostores/react';
import context from "@Apps/context/GameStore";
import useGame from '@Apps/hooks/useGame';

import Row from "./Row";
import PlayAgain from '@Components/Buttons/PlayAgain';
import { useEffect } from 'react';

export default function Game() {
    //GameStores
    const GAME = useStore(context.game)
    const SETTINGS = useStore(context.setting)

    //Hooks
    const GF = useGame();

    const handleCLick = () => {
        GF.getWord()
    }

    const handleChange = (e: any) => {
        // Cambia la variable globalmente desde JavaScript
        document.documentElement.style.setProperty('--wt-multiplier', e.target.value);
    };

    return (
        <div className="board f-col g-2 f-center mt-5">
            {
                GAME?.valid?.map((row: any, i: number) => (
                    <Row key={i} id={i} row={row} />
                ))
            }
            {
                GAME?.isWin || GAME.currentRow === GAME?.valid.length ? <PlayAgain funct={GF.restartGame} /> : null
            }
            {
                GAME?.restart ? (
                    <>
                        <p className='my-2'>Sorry! for now only support for 5 word length</p>
                        <span className='btn btn-green br-6' onClick={GF.restartGame}>Restart Game</span>
                    </>
                ) : null
            }
        </div>
    )
}