import { useEffect, useState } from 'react';
import './Buttons.css'

export default function ToggleBTN({
    funct = () => {
        console.log('Without function');
    },
    initial }:
    { funct: () => void, initial: boolean }) {

        
    //States
    const [isActive, setIsActive] = useState(initial || false);

    //Functions
    const handleFunct = () => {
        funct();
        setIsActive((prev) => !prev);
    };

    useEffect(() => {
        setIsActive(initial);
    }, [initial]);

    return (
        <span
            className={`btn-togle br-max d-flex f-center pointer relative ${isActive ? 'active' : ''}`}
            onClick={handleFunct}
        >
            <span className={`btn-circle d-flex br-50 no-select absolute ${isActive ? 'active' : ''}`}></span>
        </span>
    );
}
