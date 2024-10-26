import './Buttons.css';
import ToggleBTN from './ToggleBTN.jsx';
import { useEffect, useState } from 'react';

export default function DarkModeBTN() {
    // States
    const [theme, setThemeState] = useState(() => {
        const savedTheme = localStorage.getItem('F-Theme');
        return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    // Functions
    const Toggle = () => {
        const newTheme = !theme;
        setThemeState(newTheme);
        localStorage.setItem('F-Theme', newTheme ? 'dark' : 'light');
    };

    const setDark = () => {
        setThemeState(true);
        localStorage.setItem('F-Theme', 'dark');
    };

    const setLight = () => {
        setThemeState(false);
        localStorage.setItem('F-Theme', 'light');
    };

    const setSystem = () => {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setThemeState(systemPrefersDark);
        localStorage.removeItem('F-Theme');
    };

    useEffect(() => {
        document.documentElement.classList[theme ? 'add' : 'remove']('dark');
        document.documentElement.style.colorScheme = theme ? 'dark' : 'light';
    }, [theme]);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e : MediaQueryListEvent) => {
            if (!localStorage.getItem('F-Theme')) {
                setThemeState(e.matches);
            }
        };

        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);


    return <ToggleBTN funct={Toggle} initial={theme} />;
}
