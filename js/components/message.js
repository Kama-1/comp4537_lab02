export class Message {
    constructor(id, text) {
        this.id = id;
        this.text = text;
    }

    getJSON() {
        return JSON.stringify(this);
    }

    setText(newText) {
        this.text = newText;
    }

    static JSONToMessageArray (json) {

    }
}