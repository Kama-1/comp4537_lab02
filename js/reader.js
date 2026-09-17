class Reader {
    constructor() {
        const storageManager = new StorageManager();
        let messages = storageManager.loadMessages() || [];
    }




}