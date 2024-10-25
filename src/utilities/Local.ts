const set = (path: string, value: any) => {
    localStorage.setItem(path, JSON.stringify(value));
}

const get = (path: string) => {
    return JSON.parse(localStorage.getItem(path) || '{}');
}

const remove = (key: string) => {
    let exists = localStorage.getItem(key);
    if (!exists) {
        console.log('Storage not found');
        return;
    }
    localStorage.removeItem(key)
}

export const Local = {
    set,
    get,
    remove
}