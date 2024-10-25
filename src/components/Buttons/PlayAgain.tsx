import { useEffect, useState } from 'react';
import './Buttons.css'
import { useStore } from '@nanostores/react';
import context from '@Apps/context/GameStore';

export default function PlayAgain({ funct = () => {
    console.log('Sin funcion');
} }) {
    //States
    const [isActive, setIsActive] = useState(false)

    const SETTINGS = useStore(context.setting);

    useEffect(() => {
        setTimeout(() => {
            setIsActive(true)
        }, (SETTINGS.length + 1) * 360)
    }, [])

    return isActive ? (
        <span className='btn btn-green br-6 mt-3 play-btn' onClick={funct}>
            Jugar de nuevo
        </span>
    ) : null
}