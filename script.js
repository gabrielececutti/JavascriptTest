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
        table.deleteRow(i);
        writeMessage(
          'status-area',
          `<p>Hai eliminato l'utente: ${name} ${surname} ${email}</p>`
        );
        break;
      }
    }
};

const updateUser = () => {
}

const searchUser = () => {
    let name = document.getElementById("search-name").value;
    let surname  = document.getElementById("search-username").value;
    let email  = document.getElementById("search-email").value;
    for (var i = 0; i < table.rows.length; i++) {
        var row = table.rows[i];
        var nameCell = row.cells[nameIndex];
        var surnameCell = row.cells[surnameIndex];
        var emailCell  = row.Cells[emailIndex];
        if ( nameCell.value === name && surnameCell.value === surname && emailCell.value === email) {
          writeMessage('status-area', `<p>utente trovato: ${name} ${surname} ${email}</p>`);
          return true;
        }
    }
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