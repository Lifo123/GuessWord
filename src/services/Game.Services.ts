import { _game } from "@/Stores/Game.Store";
import { _setting } from "@/Stores/Settings.Store";
import type { LanguageTypes, LengthTypes } from "@/Types/Settings.Types";
import { Local } from "@lifo123/library/utils";

const getByLangLength = async (where: string, lang: LanguageTypes, length: LengthTypes) => {
    try {
        const res = await fetch(`/api/${where}/${lang}/${length}`)
        if (!res.ok) {
            throw new Error(`Error ${res.status}: No se pudo obtener las palabras`);
        }
        const result = await res.json()
        return result
    } catch (e) {
        console.log(e)
    }
}

const getWord = async (lang: LanguageTypes, length: number) => {
    try {
        const words = await getByLangLength('game', lang, length)
        const id = await Math.floor(Math.random() * (words.length + 1));
        return words[id]
    } catch (e) {
        console.log(e);
    }
}

const existWord = async (word: string, lang: LanguageTypes, length: number) => {
    const words = await getByLangLength('dic', lang, length)
    return words.includes(word.toLowerCase())
}



export const GameServices = {
    getWord, getByLangLength, existWord
}

