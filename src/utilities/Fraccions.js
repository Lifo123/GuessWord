import ES from '../assets/dictionary/ES_Game.json'


export default function Test() {
    const alphabet = 'abcdefghijklmnñopqrstuvwxyz'.split(''); // Lista de letras
    const dictionary = ES.d8; // Supongo que ES.d4 es tu lista de palabras
    let result = {}; // Objeto para almacenar las palabras

    alphabet.forEach(letter => {
        // Filtrar las palabras que empiezan con la letra actual    
        const wordsForLetter = dictionary.filter(word => word.startsWith(letter));

        // Seleccionar solo las primeras 120 palabras (si hay suficientes)
        result[letter] = wordsForLetter.slice(0, 120);
    });
    console.log(result);
    
    
    
    

}