export class message {
    constructor(id, message) {
        this.id = id;
        this.message = message;
    }

    getJSON() {
        return JSON.parse(JSON.stringify(this.message));
    }
}