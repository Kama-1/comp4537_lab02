

function addNewMessageBox() {
    const messageBox = document.createElement('input');
    const messageBoxContainer = document.getElementById('message-list');
    messageBox.type = 'text';
    messageBox.setAttribute('class', 'message-box');


    messageBoxContainer.appendChild(messageBox);
}

function createAddButton() {
    const button = document.createElement("button");
    button.addEventListener("click", addNewMessageBox);
    button.setAttribute("id", "add-message");
    button.innerText = "Add Message";
    return button;
}

function addStartingButton() {
    const addButton = createAddButton();
    const buttonContainer = document.getElementById('button-container');
    document.body.appendChild(addButton);
}

addStartingButton();

