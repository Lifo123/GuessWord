import './Additionals.css';
import { useEffect, useState } from 'react';
import context from "@Apps/context/GameStore";
import { PAGEUTILS } from "@Context/GlobalStore";
import { useStore } from '@nanostores/react';
import Stadistic from './Stadistic';

export default function PlayAgain({ funct = () => console.log('Sin funcion') }) {
    // States
    const [isActive, setIsActive] = useState(false);
    const GAME = useStore(context.game);
    const { popup } = useStore(PAGEUTILS);

    // Info based on game state
    const isWin = GAME.isWin;
    const info = {
        title: isWin ? '!Felicidades!' : '!Perdiste!',
        desc: isWin ? 'Has ganado la palabra' : 'No has ganado la palabra',
        btntext: isWin ? 'Jugar de nuevo' : 'Volver a intentarlo',
        btnsec: isWin,
        delay: popup?.delay || (GAME.valid[0]?.length + 1) * 360,
        cont: isWin ? <Stadistic /> : null,
    };

    useEffect(() => {
        if (isWin || !isWin) { // Puedes usar esto para manejar ambos estados
            const timer = setTimeout(() => {
                setIsActive(true);
            }, info.delay);

            return () => clearTimeout(timer); // Limpiar el timer al desmontar
        }
    }, [isWin, info.delay]); // Dependencias: se ejecuta al cambiar isWin o delay

    return isActive ? (
        <div className='obscure absolute h-100 w-100 d-flex fixed'>
            <div className='wrapper-play-again absolute d-flex f-justify-center'>
                <div className='play-again-container f-col g-2 br-10 px-3 py-4 f-align-center'>
                    <h1>{info.title}</h1>
                    <p>{info.desc}</p>
                    {info.cont && <div className='f-col g-2 w-100 f-center'>{info.cont}</div>}
                    <div className='f-row g-2 w-100 f-center'>
                        <span className='btn btn-green br-6 d-flex f-center' onClick={funct}>
                            {info.btntext}
                        </span>
                        {info.btnsec && <span className='btn btn-blue br-6 d-flex f-center'>Compartir</span>}
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}
