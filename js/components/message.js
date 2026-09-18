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

    static MessageFromJSON(json) {
        console.log(json);
        const messageData = JSON.parse(json);
        return new Message(messageData.id, messageData.text);
    }
}