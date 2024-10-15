import ES from '../assets/dictionary/ES.json'


let dm8 = []
let d8 = []
let d7 = []
let d6 = []
let d5 = []
let d4 = []
let d3 = []

let NewDiccionary = {}

export default function Test() {
    for (let i = 0; i < ES.length; i++) {
        if (ES[i].lemma.length === 3) {
            d3.push(ES[i].lemma)
        } else if (ES[i].lemma.length === 4) {
            d4.push(ES[i].lemma)
        } else if (ES[i].lemma.length === 5) {
            d5.push(ES[i].lemma)
        } else if (ES[i].lemma.length === 6) {
            d6.push(ES[i].lemma)
        } else if (ES[i].lemma.length === 7) {
            d7.push(ES[i].lemma)
        } else if (ES[i].lemma.length === 8) {
            d8.push(ES[i].lemma)
        } else if (ES[i].lemma.length > 8) {
            dm8.push(ES[i].lemma)
        }
    }
    NewDiccionary = { d3, d4, d5, d6, d7, d8, dm8 }

    const jsonData = JSON.stringify(NewDiccionary);

    // Creamos un blob y luego generamos un enlace para descargar el archivo
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();

}
