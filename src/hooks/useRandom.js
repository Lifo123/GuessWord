

export default function useRandom() {
    
    const Generate = (max) => {
        return Math.floor(Math.random() * (max + 1));
    }


    return {Generate}
}