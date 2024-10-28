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
        <div className='obscure absolute h-100 w-100 d-flex fixed'>
            <div className='wrapper-play-again absolute d-flex f-justify-center'>
                <div className='play-again-container f-col g-2 br-10 px-3 py-4'>
                    {GAME?.isWin ? <h4>Felicidades</h4> : null}
                    <span className='btn btn-green br-6 d-flex' onClick={funct}>
                        Jugar de nuevo
                    </span>
                </div>
            </div>
        </div>
    ) : null
}