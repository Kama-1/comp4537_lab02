export class Message {
    constructor(id, message) {
        this.id = id;
        this.message = message;
    }

    getJSON() {
        return JSON.parse(JSON.stringify(this.message));
    }

    static JSONToMessageArray (json) {

    }
}