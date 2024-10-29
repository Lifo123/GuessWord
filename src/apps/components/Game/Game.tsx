import './Game.css'
import { useStore } from '@nanostores/react';
import context from "@Apps/context/GameStore";
import useGame from '@Apps/hooks/useGame';

import Row from "./Row";
import PopupAppear from '@Apps/components/Additionals/PopupAppear';
import Teclado from './Teclado';
import { PAGEUTILS } from '@Context/GlobalStore';

export default function Game() {
    //GameStores
    const GAME = useStore(context.game)
    const SETTINGS = useStore(context.setting)
    const pageUtils = useStore(PAGEUTILS)

    //Hooks
    const GF = useGame();

    return (
        <div className="board f-col g-2 f-center h-100 w-100 relative pb-5">
            {
                GAME?.isWin !== null ? <PopupAppear funct={GF.restartGame} /> : null
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