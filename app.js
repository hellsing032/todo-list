// Kumpulkan semua element
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const filterInput = document.querySelector("#filter-input");
const todoList = document.querySelector("#todo-list");
const clearButton = document.querySelector("#clear-todos");

// ini adalah kumpulan event listener
immediateLoadEventListener();
changeTitleProject("Todo List");
changeTitleBottomProject("© 2024 HellsingXYZ");

function immediateLoadEventListener() {
  // mendapatkan todos dari localStorage dan render di broser
  document.addEventListener("DOMContentLoaded", getTodos);
  // Ini adalah event untuk menambahkan todo
  todoForm.addEventListener("submit", addTodo);

  // ini adalah event untuk menghapus 1 todo
  todoList.addEventListener("click", deleteTodo);

  // ini adalh event yang digunakan untuk menhapus 1 todo
  clearButton.addEventListener("click", clearTodos);

  // ini adalah event untuk memfilter todo
  filterInput.addEventListener("keyup", filterTodos);
}

// Reusable Codes
function createTodoElement(value) {
  // membuat element
  const li = document.createElement("li");

  // Menambahkan class pada element li
  li.className =
    "list-group-item d-flex justify-content-between align-items-center mb-1";

  // Menambahkan children ke dalam element li
  li.appendChild(document.createTextNode(value));

  // Membuat delete button
  const a = document.createElement("a");

  // Memberi properti untuk a element
  a.href = "#";
  a.className = "badge badge-danger delete-todo";

  a.innerHTML = "Delete";

  // Menyelipkan elemet a ke dalam children element li
  li.appendChild(a);

  // Memasukan element li yang telah di buat dengan javascript kedalam element todolist
  todoList.appendChild(li);
}

function getItemFromLocalStorage() {
  let todos;

  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  return todos;
}
// ini adalah DOM functions
function changeTitleProject(title) {
    const projectTitle = document.querySelector("#project-title");
    if (typeof title === 'string') {
		projectTitle.textContent = title;
	} else {
		console.error("Your argument is not a string");
	}
}

function changeTitleBottomProject(title) {
    const bottomTitleProject = document.querySelector("#bottom-title");
    if (typeof title === 'string') {
		bottomTitleProject.textContent = title;
	} else {
		console.error("Your argument is not a string");
	}
}

function getTodos() {
  const todos = getItemFromLocalStorage();

  todos.forEach((todo) => {
    createTodoElement(todo);
  });
}

function addTodo(e) {
  e.preventDefault();

  if (todoInput.value) {
    createTodoElement(todoInput.value);

    addTodoLocalStorage(todoInput.value);

    todoInput.value = "";
  } else {
    alert("Tulis sebuah todo, Tidak boleh kosong!");
  }
}

function addTodoLocalStorage(todoInputValue) {
  const todos = getItemFromLocalStorage();

  todos.push(todoInputValue);

  localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodo(e) {
  e.preventDefault();

  if (e.target.classList.contains("delete-todo")) {
    if (confirm("Yakin mau hapus bro?")) {
      const parent = e.target.parentElement;

      parent.remove();

      deleteTodoFromLocalStorage(parent);
    }
  }
}

function deleteTodoFromLocalStorage(deletedElement) {
  const todos = getItemFromLocalStorage(); // Menghapus element parent todo

  todos.forEach((todo, index) => {
    if (deletedElement.firstChild.textContent === todo) {
      todos.splice(index, 1);
    }
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

function clearTodos() {
  todoList.innerHTML = "";

  clearTodosLocalStorage();
}

function clearTodosLocalStorage() {
    localStorage.clear();
}

function filterTodos(e) {
  const filterText = e.target.value.toLowerCase();
  const todoItems = document.querySelectorAll(".todo-item");

  todoItems.forEach((item) => {
    const itemText = item.firstChild.textContent.toLowerCase();

    if (itemText.indexOf(filterText) !== -1) {
      item.setAttribute("style", "display: block;");
    } else {
      item.setAttribute("style", "display: none !important;");
    }

    // console.log(itemText);
  });
}