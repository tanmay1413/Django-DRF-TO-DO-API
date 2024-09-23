const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const apiUrl = 'http://127.0.0.1:8000/api/todos/'; // Update with your API URL

// Fetch todos from the API and render them
const fetchTodos = async () => {
    const response = await fetch(apiUrl);
    const todos = await response.json();
    renderTodos(todos);
};

// Render todos to the UI
const renderTodos = (todos) => {
    todoList.innerHTML = ''; // Clear the current list
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo.title;
        li.className = todo.is_completed ? 'completed' : '';

        // Toggle completion
        li.onclick = () => toggleTodoCompletion(todo.id, todo.is_completed);

        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = (e) => {
            e.stopPropagation();
            deleteTodo(todo.id);
        };

        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
};

// Add a new todo
todoForm.onsubmit = async (e) => {
    e.preventDefault();
    const newTodo = { title: todoInput.value, is_completed: false };
    await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
    });
    todoInput.value = ''; // Clear the input
    fetchTodos(); // Refresh the list
};

// Toggle todo completion
const toggleTodoCompletion = async (id, currentStatus) => {
    await fetch(`${apiUrl}${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_completed: !currentStatus }),
    });
    fetchTodos(); // Refresh the list
};

// Delete a todo
const deleteTodo = async (id) => {
    await fetch(`${apiUrl}${id}/`, {
        method: 'DELETE',
    });
    fetchTodos(); // Refresh the list
};

// Initial fetch to display todos
fetchTodos();
