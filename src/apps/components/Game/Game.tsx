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
                GAME?.isWin ? <PlayAgain funct={GF.restartGame} /> : null
            }
        </div>
    )
}