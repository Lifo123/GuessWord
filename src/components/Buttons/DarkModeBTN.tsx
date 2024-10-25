import './Buttons.css'
import useDarkMode from '@Hooks/useDarkMode';
import ToggleBTN from './ToggleBTN.jsx'
import { useStore } from '@nanostores/react';
import { ConfigStore } from '@Context/GlobalStore';
import { useEffect } from 'react';

export default function DarkModeBTN() {
    //DarkMode Store
    const CONFIG = useStore(ConfigStore);

    //Hooks
    const DM = useDarkMode();

    useEffect(() => {
        if (CONFIG?.DarkMode) {
            document.body.classList.add("DarkMode");
        } else {
            document.body.classList.remove("DarkMode");
        }
    }, [CONFIG?.DarkMode])

    return (
        <ToggleBTN funct={DM.Toggle} initial={CONFIG?.DarkMode} />
    )
}