import './Buttons.css'
import useDarkMode from '@Hooks/useDarkMode';
import ToggleBTN from './ToggleBTN.jsx'
import { useStore } from '@nanostores/react';
import { DarkModeStore } from '@Context/GlobalStore.js';
import { useEffect } from 'react';

export default function DarkModeBTN() {
    //DarkMode Store
    const isDark = useStore(DarkModeStore);

    //Hooks
    const DM = useDarkMode();

    const Toggle = () => {
        const isDarkResult = DM.Toggle();
        DarkModeStore.set(isDarkResult);
    }

    useEffect(() => {
        if (isDark) {
            document.body.classList.add("DarkMode");
        } else {
            document.body.classList.remove("DarkMode");
        }
    }, [isDark])

    return (
        <ToggleBTN funct={Toggle} initial={isDark} />
    )
}