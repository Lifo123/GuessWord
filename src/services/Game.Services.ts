import { _game } from "@/Stores/Game.Store";
import { _setting } from "@/Stores/Settings.Store";
import type { LanguageTypes, LengthTypes } from "@/Types/Settings.Types";

const apiCache: Record<string, any> = {};
const getByLangLength = async (where: string, lang: LanguageTypes, length: LengthTypes) => {
    const cacheKey = `${where}-${lang}-${length}`;
    if (apiCache[cacheKey]) {
        return apiCache[cacheKey];
    }

    const controller = new AbortController();
    const signal = controller.signal;
    const timeout = setTimeout(() => controller.abort(), 5000);

    try {
        const res = await fetch(`/api/${where}/${lang}/${length}`, { signal });
        clearTimeout(timeout);
        if (!res.ok) {
            throw new Error(`Error ${res.status}: No se pudo obtener las palabras`);
        }
        const result = await res.json();
        apiCache[cacheKey] = result;
        return result;
    } catch (e) {
        console.log(e);
    }
};

const getWord = async (lang: LanguageTypes, length: number) => {
    try {
        const words = await getByLangLength('game', lang, length);
        if (!words || words.length === 0) {
            throw new Error('No hay palabras disponibles');
        }
        const id = Math.floor(Math.random() * words.length);
        return words[id];
    } catch (e) {
        console.log(e);
        return null;
    }
};


const cache: Record<string, Set<string>> = {};
const existWord = async (word: string, lang: LanguageTypes, length: number) => {
    const cacheKey = `${lang}-${length}`;
    
    if (!cache[cacheKey]) {
        const words = await getByLangLength('dic', lang, length);
        cache[cacheKey] = new Set(words.map((w:string) => w.toLowerCase()));
    }

    return cache[cacheKey].has(word.toLowerCase());
};

const preloadData = async (lang: LanguageTypes, length: number) => {
    console.log('Preloading data');
    await getByLangLength('dic', lang, length);
};



export const GameServices = {
    getWord, 
    getByLangLength, 
    existWord, 
    preloadData
}

