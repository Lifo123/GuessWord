import { atom } from "nanostores";

const isBrowser = typeof window !== "undefined";

//DarkMode Store
const Config = atom(isBrowser ? JSON.parse(localStorage.getItem('F-Config') || "{}") : {});
const Params = atom(isBrowser ? new URLSearchParams(window.location.search).get('data') || '' : '');


//Navigation Store

interface Popup {
    popup: {
        type: string | null | undefined;
        delay: number | null;
    }
}

export const PAGEUTILS = atom<Popup>({
    popup: {
        type: null,
        delay: null,
    },
})


const GLOBALSTORE = {
    Config,
    Params,
}

export default GLOBALSTORE
