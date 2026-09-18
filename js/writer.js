import {StorageManager} from './storageManager.js';
import {Message} from "./components/message.js";

class Writer {
    constructor() {
        this.storageManager = new StorageManager();
        this.messages = this.loadStoredMessages();
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

    addNewMessageBox(id= this.messages.length, text='') {
        console.log(id)
        const messageBox = document.createElement('input');
        const messageBoxContainer = document.getElementById('message-list');

        messageBox.type = 'text';
        messageBox.setAttribute('class', 'message-box');
        messageBox.setAttribute('id', `message-box-${id}`);
        messageBox.value = text;

        const deleteButton = this.createDeleteButton(id);
        const deleteBoxContainer = document.getElementById('delete-list');

        this.storageManager.saveData(id, messageBox.value);
        this.messages[id] = new Message(id, messageBox.value);
        messageBoxContainer.appendChild(messageBox);
        deleteBoxContainer.appendChild(deleteButton);
    }

    createAddButton() {
        const button = document.createElement("button");
        button.addEventListener("click", () => {
            this.addNewMessageBox();
        });
        button.setAttribute("id", "add-message");
        button.innerText = "Add Message";
        return button;
    }

    addStartingButton() {
        const addButton = this.createAddButton();
        const buttonContainer = document.getElementById('button-container');
        buttonContainer.appendChild(addButton);
    }

    loadStoredMessages() {
        const storageData = this.storageManager.loadAllData();
        let messageList = [];
        for (const key in storageData) {
            const text = this.storageManager.loadData(key);
            const message = new Message(key, text);
            messageList[parseInt(key)] = message;
        }
        return messageList;
    }

    displayMessages() {
        for (const message of this.messages) {
            this.addNewMessageBox(message.id, message.text);
        }
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
writer.displayMessages();
writer.addStartingButton();
writer.beginSaveLoop(2);



