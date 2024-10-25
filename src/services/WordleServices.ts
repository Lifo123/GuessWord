import Util from "@Apps/utilities/GameUtils";
import { DicDB } from "src/firebase/fireDictionary";

import { get, ref } from "firebase/database";

export const getWord = async (lang: string, length: number) => {
    try {
        const dicRef = ref(DicDB, `${lang}/gameDefault/d${length}`);
        const dicSnapshot = await get(dicRef);
        const arr = dicSnapshot.val()
        const randomIndex = Util.generateRandom(arr.length);
        return arr[randomIndex];

    } catch (e) {
        console.log('Error fetching word:', e);
        throw e;
    }
}
