export class StorageManager {
    constructor() {}

    loadData(key) {
        return localStorage.getItem(key);
    }

    loadAllDataAsJSON() {
        return JSON.stringify(localStorage);
    }

    saveData(key, text) {
        localStorage.setItem(key, text);
    }

    removeData(key) {
        localStorage.removeItem(key);
    }

}