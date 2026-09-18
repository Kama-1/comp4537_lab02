import {StorageManager} from './storageManager.js';
import {Message} from "./components/message.js";
import {STRINGS} from '../lang/messages/en/user.js';

class Reader {
    constructor() {
        this.storageManager = new StorageManager();
        this.messages = this.loadStoredMessages();
    }

    getNextIndex() {
        if (this.messages.length === 0) {
            return 0
        } else {
            return parseInt(this.messages[this.messages.length - 1].id) + 1;
        }
    }


    addNewMessageBox(id= this.getNextIndex(), text='') {
        const messageBox = document.createElement('input');
        const messageBoxContainer = document.getElementById('message-list');

        messageBox.type = 'text';
        messageBox.disabled = true;
        messageBox.setAttribute('class', 'message-box');
        messageBox.setAttribute('id', `message-box-${id}`);
        messageBox.value = text;

        this.messages[id] = new Message(id, messageBox.value);
        messageBoxContainer.appendChild(messageBox);
    }

    loadStoredMessages() {
        const storageData = this.storageManager.loadAllData();
        let messageList = [];
        if (storageData.length > 0) {
            for (const key in storageData) {
                const text = this.storageManager.loadData(key);
                const message = new Message(key, text);
                messageList[parseInt(key)] = message;
            }
        }
        return messageList;
    }

    displayMessages() {
        const messageBoxContainer = document.getElementById('message-list');
        messageBoxContainer.innerHTML = '';

        for (const message of this.messages) {
            if (message) {
                this.addNewMessageBox(message.id, message.text);
            }
        }
    }

    beginLoadLoop(intervalSeconds) {
        const MILLISECONDS = 1000;
        setInterval(() => {
            this.messages = this.loadStoredMessages();
            this.displayMessages();
            document.getElementById('last-load').innerHTML = `${STRINGS.LAST_LOADED} ${this.getCurrentTime()}`;
        }, intervalSeconds * MILLISECONDS);
    }

    getCurrentTime() {
        const date = new Date();
        const currentTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} 
        ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        return currentTime;
    }

    initializeText() {
        document.getElementsByTagName('h1').innerHTML = STRINGS.READER_TITLE;
        document.getElementById('back-button').innerHTML = STRINGS.BACK;
    }

}


const reader = new Reader();
reader.initializeText();
reader.displayMessages();
reader.beginLoadLoop(2);



