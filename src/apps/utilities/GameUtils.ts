const generateRandom = (max: number) => {
    return Math.floor(Math.random() * ((max || 100) + 1));
}


export const localUtil = {
    generateRandom
}