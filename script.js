const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const namesRegex = /^[a-zA-Z\s']+$/;
const nameIndex= 0; 
const surnameIndex = 1;
const emailIndex = 2;

var table = null
var modifyTable = null;
var updateButton = null;
var deleteButton = null;
var searchButton = null;

// email è la primary key
const writeMessage = (elementId, message, appendMessage) => {
    var elementToUpdate = document.getElementById(elementId);
    if (appendMessage){
        elementToUpdate.innerHTML = elementToUpdate.innerHTML + message;
    }else {
        elementToUpdate.innerHTML = message;
    }
}

const appendNewButton = () => {
    let btnContainer = document.getElementById("btn-container");
    if (deleteButton) {
        deleteButton.removeEventListener("click", deleteUser);
        deleteButton.remove();
    }
    if (updateButton) {
        updateButton.removeEventListener("click", updateUser);
        updateButton.remove();
    }
    if (searchButton) {
        searchButton.removeEventListener("click", searchUser);
        searchButton.remove();
    }
    
    deleteButton = document.createElement("button");
    updateButton = document.createElement("button");
    searchButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    updateButton.textContent = "Update";
    searchButton.textContent = "Search";
    btnContainer.appendChild(deleteButton);
    btnContainer.appendChild(updateButton);
    btnContainer.appendChild(searchButton);
    deleteButton.addEventListener("click", deleteUser);
    updateButton.addEventListener("click", updateUser);
    searchButton.addEventListener("click", searchUser);
}

const userCrud = () => {
    insertUser();
    appendNewButton();
}

const insertUser = () => {
    table = document.createElement ("table");
    let name = document.getElementById("name-input").value;
    let surname  = document.getElementById("surname-input").value;
    let email  = document.getElementById("email-input").value;

    let row = document.createElement("tr");
    if (isNameValid(name) && isNameValid(surname) && isEmailValid(email)){
        var cellText = [name, surname, email];
        for (var i = 0; i < 3; i++) {
          var cell = document.createElement("td");
          cell.style.border = "2px";
          cell.textContent = cellText[i];
          row.appendChild(cell);
        }
        table.appendChild(row)
    }else {
        writeMessage('status-area', '<p>input non validi, riprova...</p>');
    } 
    let tableContainer = document.getElementById("table-container");
    tableContainer.appendChild(table);
}

const deleteUser = () => {
    let name = document.getElementById("search-name").value;
    let surname  = document.getElementById("search-username").value;
    let email  = document.getElementById("search-email").value;
    for (var i = 0; i < table.rows.length; i++) {
        var row = table.rows[i];
        var nameCell = row.cells[nameIndex];
        var surnameCell = row.cells[surnameIndex];
        var emailCell  = row.cells[emailIndex];
      if ( nameCell.textContent === name && surnameCell.textContent === surname && emailCell.textContent === email) {
        table.deleteRow(i);
        writeMessage('status-area',`<p>Hai eliminato l'utente: ${name} ${surname} ${email}</p>`);
        return;
      } 
    }
}

const updateUser = () => {
    let name = document.getElementById("search-name").value;
    let surname = document.getElementById("search-username").value;
    let email = document.getElementById("search-email").value;
  
    let found = false;
  
    for (let i = 0; i < table.rows.length; i++) {
      let row = table.rows[i];
      let nameCell = row.cells[nameIndex];
      let surnameCell = row.cells[surnameIndex];
      let emailCell = row.cells[emailIndex];
  
      if (
        nameCell.textContent === name &&
        surnameCell.textContent === surname &&
        emailCell.textContent === email
      ) {
        found = true;
        let newInputsContainer = document.createElement("div");
  
        let newNameLabel = document.createElement("label");
        newNameLabel.textContent = "New Name:";
        let newNameInput = document.createElement("input");
        newNameInput.type = "text";
        newNameInput.id = "new-name-input";
        newInputsContainer.appendChild(newNameLabel);
        newInputsContainer.appendChild(newNameInput);
  
        let newSurnameLabel = document.createElement("label");
        newSurnameLabel.textContent = "New Surname:";
        let newSurnameInput = document.createElement("input");
        newSurnameInput.type = "text";
        newSurnameInput.id = "new-surname-input";
        newInputsContainer.appendChild(newSurnameLabel);
        newInputsContainer.appendChild(newSurnameInput);
  
        let newEmailLabel = document.createElement("label");
        newEmailLabel.textContent = "New Email:";
        let newEmailInput = document.createElement("input");
        newEmailInput.type = "email";
        newEmailInput.id = "new-email-input";
        newInputsContainer.appendChild(newEmailLabel);
        newInputsContainer.appendChild(newEmailInput);
  
        let tableContainer = document.getElementById("table-container");
        tableContainer.parentNode.insertBefore(newInputsContainer, tableContainer);
  
        let confirmButton = document.createElement("button");
        confirmButton.textContent = "Confirm Update";
        tableContainer.parentNode.insertBefore(confirmButton, tableContainer.nextSibling);
  
        confirmButton.addEventListener("click", () => {
          let newUpdatedName = document.getElementById("new-name-input").value;
          let newUpdatedSurname = document.getElementById("new-surname-input").value;
          let newUpdatedEmail = document.getElementById("new-email-input").value;
  
          if (isNameValid(newUpdatedName) && isNameValid(newUpdatedSurname) && isEmailValid(newUpdatedEmail)) {
            nameCell.textContent = newUpdatedName;
            surnameCell.textContent = newUpdatedSurname;
            emailCell.textContent = newUpdatedEmail;
  
            newInputsContainer.remove();
            confirmButton.remove();
  
            writeMessage(
              'status-area',
              `<p>Hai aggiornato l'utente: ${name} ${surname} ${email} con i nuovi dati: ${newUpdatedName} ${newUpdatedSurname} ${newUpdatedEmail}</p>`
            );
          } else {
            writeMessage('status-area', '<p>I nuovi dati inseriti non sono validi. Riprova...</p>');
          }
        });
        break;
      }
    }
  
    if (!found) {
      writeMessage('status-area', `<p>Utente non trovato</p>`);
    }
  };
  
  

const searchUser = () => {
    let name = document.getElementById("search-name").value;
    let surname  = document.getElementById("search-username").value;
    let email  = document.getElementById("search-email").value;
    for (var i = 0; i < table.rows.length; i++) {
        var row = table.rows[i];
        var nameCell = row.cells[nameIndex];
        var surnameCell = row.cells[surnameIndex];
        var emailCell  = row.cells[emailIndex];
        if ( nameCell.textContent === name && surnameCell.textContent === surname && emailCell.textContent === email) {
          writeMessage('status-area', `<p>utente trovato: ${name} ${surname} ${email}</p>`);
          return;
        }
    }
    writeMessage('status-area', `<p>utente non trovato</p>`);
}

const isEmailValid = (email) => {
    return emailRegex.test(email);
}

const isNameValid = (name) => {
    return namesRegex.test(name)
}


window.onload = function() {
	document.getElementById('startButton').addEventListener('click', userCrud);
};