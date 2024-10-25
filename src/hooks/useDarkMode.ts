import global from "@Context/GlobalStore";
import { useStore } from "@nanostores/react";

export default function useDarkMode() {
    //Store
    const CONFIG = useStore(global.Config);


    const Toggle = () => {
        let config = JSON.parse(localStorage.getItem("F-Config") || '{}');

        config.DarkMode = !CONFIG.DarkMode;
        global.Config.set(config);
        localStorage.setItem('F-Config', JSON.stringify(config));
    }

    const setDark = () => {
        localStorage.setItem("DMstate", 'true');
        return true;
    }

    const setLight = () => {
        localStorage.setItem("DMstate", 'false');
        return false;
    }

    const setSystem = () => {
        console.log('Function for system');

    }

    return {
        Toggle,
        setDark,
        setLight,
        setSystem
    }
}