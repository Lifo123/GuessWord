import './Additionals.css'
import { useEffect, useState } from 'react';
import context from "@Apps/context/GameStore";
import { useStore } from '@nanostores/react';

export default function PlayAgain({ funct = () => {
    console.log('Sin funcion');
}, delay = 0 }) {
    //States
    const [isActive, setIsActive] = useState(false)

    const GAME = useStore(context.game)


    useEffect(() => {
        setTimeout(() => {
            setIsActive(true)
        }, (delay) * 360)
    }, [])

    return isActive ? (
        <div className='absolute h-100 w-100 d-flex f-center'>
            <div className='play-again-container f-col g-2 absolute br-10'>
                {GAME?.isWin ? <h4>Felicidades</h4> : null}
                <span className='btn btn-green br-6 absolute' onClick={funct}>
                    Jugar de nuevo
                </span>
            </div>
        </div>
    ) : null
}