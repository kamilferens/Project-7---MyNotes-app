// Zmienne - przypisanie buttony, inputy, textarey, utworzone tablice itp.
const addBtn = document.querySelector(".add");
const deleteAllBtn = document.querySelector(".delete-all");
const saveBtn = document.querySelector(".save");
const cancelBtn = document.querySelector(".cancel");
const deleteNoteBtn = document.getElementsByClassName("delete-note");

const noteArea = document.querySelector(".note-area");
const notePanel = document.querySelector(".note-panel");
const categoryInput = document.querySelector("#category");
const textArea = document.querySelector("#text");
const error = document.querySelector(".error");

/*Próba modyfikacji kodu, zeby można było pisać z enterami */

/*Tworzymy zmiene globalne "selectedValue" i "cardID", które później będziemy wykorzystywać do...*/
let selectedValue;

let cardID = 0;

//Wszystkie addEventListenery
addBtn.addEventListener("click", showPanel);

cancelBtn.addEventListener("click", () => {
    showPanel();
    clearPanel();
});

saveBtn.addEventListener("click", () => {
    // checkNewNote();
    addNote();
    // funkcja tworząca notatkę, jeżeli wszystko jest poprawne
});

// Funkcja odpowiadająca za wyświetlenie lub schowanie okna dodawania nowej notatki
function showPanel() {
    if (notePanel.style.display !== "flex") {
        notePanel.style.display = "flex";
    } else {
        notePanel.style.display = "none";
    }
}

// Funkcja odpowiedzialna za sprawdzenie poprawności nowej notatki
// function checkNewNote() {
//     if (categoryInput.selectedIndex !== 0 && textArea.value !== "") {
//         error.style.display = "none";
//         return true;
//     } else {
//         error.style.display = "flex";
//         return false;
//     }
// }

function clearPanel() {
    categoryInput.selectedIndex = 0;
    textArea.value = "";
}

function addNote() {
    if (categoryInput.selectedIndex !== 0 && textArea.value !== "") {
        error.style.display = "none";
        createNote();
        showPanel();
        clearPanel();
    } else {
        error.style.display = "flex";
        console.log("błąd!!!");
    }
}

function createNote() {
    const newNote = document.createElement("div");
    newNote.classList.add("note");
    newNote.setAttribute("id", cardID);

    // Te trzy linijki stworzyły nam nowego diva z klasą note oraz z ID (obecnie 0)

    newNote.innerHTML = `
    <div class="note-header">
        <h3 class="note-title">${selectedValue}</h3>
        <button class="delete-note" onclick="deleteNote(${cardID})">
            <i class="fa-solid fa-xmark"></i>
        </button>
    </div>
    <div class="note-body">
        ${textArea.value.replace(/(?:\r\n|\r|\n)/g, "<br>")}
    </div>
    `;

    noteArea.appendChild(newNote);
    cardID++;

    checkColor(newNote);
}

function selectValue() {
    selectedValue = category.options[category.selectedIndex].text;
    console.log(selectedValue);
}

function checkColor(note) {
    switch (selectedValue) {
        case "Zakupy":
            note.style.backgroundColor = "rgb(72,255,0)";
            break;
        case "Praca":
            note.style.backgroundColor = "rgb(255,243,0)";
            break;
        case "Inne":
            note.style.backgroundColor = "rgb(0,170,255)";
            break;
    }
}

function deleteNote(id) {
    const noteToDelete = document.getElementById(id);
    noteArea.removeChild(noteToDelete);
}

function deleteAllNotes() {
    noteArea.textContent = "";
}

deleteAllBtn.addEventListener("click", deleteAllNotes);
