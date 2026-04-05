let todos = JSON.parse(localStorage.getItem("todos_minimal") || "[]");

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

function save() {
  localStorage.setItem("todos_minimal", JSON.stringify(todos));
}

function render() {
  list.innerHTML = todos
    .map(
      (todo) => `
      <li data-id="${todo.id}">
        <fieldset role="group">
          <button class="delete-todo">✓</button>
          <input type="text" class="todo-text pico-background-sand-150 pico-color-cyan-450 font-roboto ${todo.done ? "done" : ""}"
                 value="${todo.text}" readonly />
        </fieldset>
      </li>
    `,
    )
    .join("");
}

// Handle checkbox toggle (using click on the input since it's readonly)
list.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  const id = parseInt(li.dataset.id);
  const todo = todos.find((t) => t.id === id);

  // Toggle todo when clicking on the input field
  if (e.target.classList.contains("todo-text")) {
    if (todo) {
      todo.done = !todo.done;
      save();
      render();
    }
  }

  // Delete todo
  if (e.target.classList.contains("delete-todo")) {
    todos = todos.filter((t) => t.id !== id);
    save();
    render();
  }
});

form.onsubmit = (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    todos.push({ id: Date.now(), text, done: false });
    save();
    render();
    input.value = "";
  }
};

render();

function updateClock() {
  const now = new Date();
  const datePart = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const timePart = now
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .replace(/\s/g, "");
  document.getElementById("clock").innerHTML = `${datePart}<br/> ${timePart}`;
}
// Update every 1000 milliseconds (1 second)
setInterval(updateClock, 1000);
updateClock();
// Get all the buttons and their corresponding divs
const calsButton = document.getElementById("cals-button");
const notesButton = document.getElementById("notes-button");
const todosButton = document.getElementById("todos-button");
const mealsButton = document.getElementById("meals-button");

const calendarDiv = document.getElementById("calendar");
const notesDiv = document.getElementById("notes");
const todoDiv = document.getElementById("todo");
const mealsDiv = document.getElementById("meals");

// Hide all divs
function hideAll() {
  calendarDiv.hidden = true;
  notesDiv.hidden = true;
  todoDiv.hidden = true;
  mealsDiv.hidden = true;
}

// Set up button listeners
calsButton?.addEventListener("click", () => {
  hideAll();
  calendarDiv.hidden = false;
});

notesButton?.addEventListener("click", () => {
  hideAll();
  notesDiv.hidden = false;
});

todosButton?.addEventListener("click", () => {
  hideAll();
  todoDiv.hidden = false;
});

mealsButton?.addEventListener("click", () => {
  hideAll();
  mealsDiv.hidden = false;
});

// Show calendar by default
hideAll();
calendarDiv.hidden = false;

// Get DOM elements
const displayTextarea = document.querySelector('textarea[name="note-display"]');
const inputTextarea = document.querySelector('textarea[name="note-input"]');
const editButton = document.getElementById("edit-notes-button");
const saveButton = document.getElementById("save-notes-button");

// Load saved notes from localStorage on page load
function loadNotes() {
  const savedNotes = localStorage.getItem("user_notes");
  if (savedNotes) {
    displayTextarea.value = savedNotes;
    inputTextarea.value = savedNotes;
  } else {
    // Optional: Set default placeholder text
    displayTextarea.value = "Write your notes here...";
    inputTextarea.value = "Write your notes here...";
  }
}

// Save notes to localStorage
function saveNotes() {
  const notes = inputTextarea.value;
  localStorage.setItem("user_notes", notes);
  displayTextarea.value = notes;
}

// Enter edit mode
function editMode() {
  // Copy current display text to input
  inputTextarea.value = displayTextarea.value;

  // Hide display, show input
  displayTextarea.hidden = true;
  inputTextarea.hidden = false;

  // Show save button, hide edit button
  saveButton.hidden = false;
  editButton.hidden = true;

  // Focus on input
  inputTextarea.focus();
}

// Exit edit mode and save
function saveAndExit() {
  // Save to localStorage
  saveNotes();

  // Show display, hide input
  displayTextarea.hidden = false;
  inputTextarea.hidden = true;

  // Show edit button, hide save button
  editButton.hidden = false;
  saveButton.hidden = true;
}

// Add event listeners
editButton.addEventListener("click", editMode);
saveButton.addEventListener("click", saveAndExit);

// Optional: Save on Ctrl+Enter (Cmd+Enter on Mac)
inputTextarea.addEventListener("keydown", function (e) {
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    saveAndExit();
  }
});

// Load notes when page loads
loadNotes();
