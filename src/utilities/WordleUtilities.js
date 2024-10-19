
export const LocalArray = (name) => {
    let data = localStorage.getItem(name);
    let array = JSON.parse(data);
    return array;
}

export const LocalWordle = () => {
    return JSON.parse(localStorage.getItem('F-Wordle'));
}

export const LocalWordleSet = (data) => {
    localStorage.setItem('F-Wordle', JSON.stringify(data));
}
