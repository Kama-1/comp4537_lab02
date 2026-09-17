import {StorageManager} from './storageManager.js';
import {Message} from "./components/message.js";

class Writer {
    constructor() {
        this.storageManager = new StorageManager();
        const jsonMessages = this.storageManager.loadAllDataAsJSON();
        this.messages = [];
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

        this.storageManager.saveData(newMessageBoxID, messageBox.value);
        this.messages[newMessageBoxID] = new Message(newMessageBoxID, messageBox.value);
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

    updateMessageArrayFromBoxes() {
        for (let i = 0; i < this.messages.length; i++) {
            const message = this.messages[i];

            const messageID = message.id;
            const messageBox = document.getElementById(`message-box-${messageID}`);
            if (messageBox) {
                message.setText(messageBox.value);
            }
        }
    }

    beginSaveLoop(intervalSeconds) {
        const MILLISECONDS = 1000;
        setInterval(() => {
            this.updateMessageArrayFromBoxes();
            for (const message of this.messages) {
                this.storageManager.saveData(message.id, message.text);
            }
        }, intervalSeconds * MILLISECONDS);
    }

}


const writer = new Writer();
writer.addStartingButton();
writer.beginSaveLoop(2);


