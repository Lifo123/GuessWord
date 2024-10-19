import { atom } from "nanostores";

const isBrowser = typeof window !== "undefined";

//Game Stores
export const WordStore = atom(null)
export const WordLengthStore = atom(5);
export const isGameActiveStore = atom(true)


export const TryStore = atom(6)

//DarkMode Store

export const DarkModeStore = atom(isBrowser ? localStorage.getItem('DMstate') === 'true' || false : false);
