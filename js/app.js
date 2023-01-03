// All the todos in an array
let todos = [
    
];

// Add new todo item to the array
function addTodo() {
    // Get the value from the input field
    let todoValue = document.getElementById("todoValue").value;

    let todo = {id: todos.length + 1, title: todoValue, isDone: 0}

    // Create a todo object
    todos.push(todo);

    addToLocalStorage(todos);
}

// Remove specific todo item
function removeTodo(index) {
    todos.splice(index, 1);

    addToLocalStorage(todos);
}

// Render the todo items from the array
function renderTodos(todos) {
    // Find list by ID
    let htmlList = document.getElementById('todoList');

    // Remove everything in current list and add it back later
    while (htmlList.firstChild) {
        htmlList.removeChild(htmlList.firstChild);
    }

    todos.forEach((todo, id) => {
        // Create variables needed for todo list
        let listItem = document.createElement('li');
        let wrapper = document.createElement('div');
        let inputCheck = document.createElement('input');
        let deleteBtn = document.createElement("button");

        // Add attributes to the checkbox element
        inputCheck.setAttribute("type", "checkbox");
        inputCheck.setAttribute("class", "mr-10")
        inputCheck.setAttribute("id", "isDone")

        // Create the delete button for a todo item
        deleteBtn.appendChild(document.createElement('i'));
        deleteBtn.setAttribute("class", "fas fa-times delete");
        deleteBtn.addEventListener("click", () => {
            removeTodo(id);
        });

        // Create wrapper for the checkbox and title
        wrapper.setAttribute("class", "wrapper");

        // Connect the checkbox to the LI
        listItem.append(inputCheck);

        // Connect the wrapper to the LI
        // Connect the checkbox and title to the LI
        listItem.append(wrapper);
        wrapper.append(inputCheck);
        wrapper.append(todo.title);

        // Connect the delete button to the LI
        listItem.append(deleteBtn);

        // Connect the LI to the UL
        htmlList.append(listItem);
    });
}

// Add the current todos to local storage
function addToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));

    renderTodos(todos);
}

// Get all the todos from local storage
function getFromLocalStorage() {
    let reference = localStorage.getItem('todos');

    // If the reference exists then...
    if (reference) {
        // Convert it back to an array
        todos = JSON.parse(reference);

        renderTodos(todos);
    }
}

getFromLocalStorage();