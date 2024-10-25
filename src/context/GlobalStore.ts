import { atom } from "nanostores";

const isBrowser = typeof window !== "undefined";

//DarkMode Store
export const ConfigStore = atom(isBrowser ? JSON.parse(localStorage.getItem('F-Config') || "{}") : {});
