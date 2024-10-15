import './Buttons.css'
import { useState } from 'react';

export default function ToggleBTN() {
    //States
    const [isActive, setIsActive] = useState(false);

    return (
        <span className={`btn-togle br-max o-hidden d-flex f-center pointer relative ${isActive ? 'active' : ''}`}
            onClick={() => setIsActive(!isActive)}
        >
            <span className={`btn-circle d-flex br-50 no-select absolute ${isActive ? 'active' : ''}`}></span>
        </span>
    )
}