import './Buttons.css'
import { useState } from 'react';

export default function ToggleBTN({funct}) {
    //States
    const [isActive, setIsActive] = useState(false);

    //Functions
    const handleFunct = () => {
        setIsActive((v) => !v);
        funct();
    }



    return (
        <span className={`btn-togle br-max o-hidden d-flex f-center pointer relative ${isActive ? 'active' : ''}`}
            onClick={handleFunct}
        >
            <span className={`btn-circle d-flex br-50 no-select absolute ${isActive ? 'active' : ''}`}></span>
        </span>
    )
}