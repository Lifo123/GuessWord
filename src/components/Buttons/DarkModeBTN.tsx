import './Buttons.css'
import ToggleBTN from './ToggleBTN.jsx'
import { useEffect, useState } from 'react';

export default function DarkModeBTN() {
    //States
    const [theme, setThemeState] = useState(() => {
        const savedTheme = localStorage.getItem('F-Theme');
        if (savedTheme) return savedTheme === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    //Functions
    const Toggle = () => {
        setThemeState(v => !v)
    }

    const setDark = () => {
        setThemeState(true)
    }

    const setLight = () => {
        setThemeState(false)
    }

    const setSystem = () => {
        setThemeState(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }



    useEffect(() => {
        localStorage.setItem('F-Theme', theme ? 'dark' : 'light')
        document.documentElement.classList[theme ? 'add' : 'remove']('dark')
        document.documentElement.style.colorScheme = theme ? 'dark' : 'light'
    }, [theme])


    return (
        <ToggleBTN funct={Toggle} initial={theme} />
    )
}