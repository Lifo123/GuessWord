let L4 = [];

export const wasa = async () => {
    // Fetch palabras en inglés
    const englishResponse = await fetch('http://192.168.1.72:4321/GuessWord/src/assets/dic/en/0.txt');
    const englishWords = (await englishResponse.text()).split('\n').map(word => word.trim().toLowerCase());

    // Fetch palabras en español
    const spanishResponse = await fetch('http://192.168.1.72:4321/GuessWord/src/assets/dic/es/0.txt');
    const spanishWords = (await spanishResponse.text()).split('\n').map(word => word.trim().toLowerCase());

    const spanishSet = new Set(spanishWords);
    L4 = englishWords.filter(word => word.length === 10 && !spanishSet.has(word));

    console.log(L4.join('\n'))
};

export const noduplicate = async () => {
    const englishResponse = await fetch('http://192.168.1.72:4321/GuessWord/src/assets/game/en/0.txt');
    const englishWords = (await englishResponse.text()).split('\n').map(word => word.trim().toLowerCase());

    L4 = englishWords.filter(word => word.length === 10);
    console.log(L4.join('\n'))
    

    
}