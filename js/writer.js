import {StorageManager} from './storageManager.js';
import {Message} from "./components/message.js";

class Writer {
    constructor() {
        this.storageManager = new StorageManager();
        const jsonMessages = this.storageManager.loadMessages();
        this.messages = Message.JSONToMessageArray(jsonMessages) || [];
    }

    deleteMessage(id) {
        const deleteID = `delete-message-${id}`;
        const messageBoxID = `message-box-${id}`;

        const deleteBoxContainer = document.getElementById('delete-list');
        const messageBoxContainer = document.getElementById('message-list');
        const deleteButton = document.getElementById(deleteID);
        const messageBox = document.getElementById(messageBoxID);

        deleteBoxContainer.removeChild(deleteButton);
        messageBoxContainer.removeChild(messageBox);

        this.messages.splice(id, 1);
    }

    createDeleteButton(messageID) {
        const button = document.createElement("button");
        button.addEventListener("click", this.deleteMessage.bind(null, messageID));
        button.setAttribute('class', 'delete-button');
        button.setAttribute('id', `delete-message-${messageID}`);
        button.innerText = "Delete";
        return button;
    }

    addNewMessageBox() {
        const messageBox = document.createElement('input');
        const messageBoxContainer = document.getElementById('message-list');
        const newMessageBoxID = this.messages.length;

        messageBox.type = 'text';
        messageBox.setAttribute('class', 'message-box');
        messageBox.setAttribute('id', `message-box-${newMessageBoxID}`);

        const deleteButton = this.createDeleteButton(newMessageBoxID);
        const deleteBoxContainer = document.getElementById('delete-list');


        this.messages[newMessageBoxID] = new Message(newMessageBoxID, messageBox.innerText);
        messageBoxContainer.appendChild(messageBox);
        deleteBoxContainer.appendChild(deleteButton);
    }

    createAddButton() {
        const button = document.createElement("button");
        button.addEventListener("click", this.addNewMessageBox.bind(this));
        button.setAttribute("id", "add-message");
        button.innerText = "Add Message";
        return button;
    }

    addStartingButton() {
        const addButton = this.createAddButton();
        const buttonContainer = document.getElementById('button-container');
        buttonContainer.appendChild(addButton);
    }

}


const writer = new Writer();
writer.addStartingButton();


