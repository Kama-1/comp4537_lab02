export class StorageManager {
    constructor() {}

    loadData(key) {
        return localStorage.getItem(key);
    }

    loadAllData() {
        return localStorage;
    }

    saveData(key, text) {
        localStorage.setItem(key, text);
    }

    removeData(key) {
        localStorage.removeItem(key);
    }

}