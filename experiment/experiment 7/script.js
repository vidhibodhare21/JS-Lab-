const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');
const count = document.querySelector('#todo-count');
const emptyState = document.querySelector('#empty-state');

let todos = [];

function updateSummary() {
  const taskWord = todos.length === 1 ? 'task' : 'tasks';
  count.textContent = `${todos.length} ${taskWord}`;
  emptyState.hidden = todos.length > 0;
}

function createTodoElement(todo) {
  const item = document.createElement('li');
  item.className = 'todo-item';
  item.dataset.id = todo.id;
  if (todo.completed) item.classList.add('completed');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'complete-checkbox';
  checkbox.checked = todo.completed;
  const checkboxAction = todo.completed ? 'incomplete' : 'complete';
  checkbox.setAttribute('aria-label', `Mark ${todo.text} as ${checkboxAction}`);

  const text = document.createElement('span');
  text.textContent = todo.text;

  const actions = document.createElement('div');
  actions.className = 'todo-actions';

  const editButton = document.createElement('button');
  editButton.type = 'button';
  editButton.className = 'edit-button';
  editButton.textContent = 'Edit';
  editButton.setAttribute('aria-label', `Edit ${todo.text}`);

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.className = 'delete-button';
  deleteButton.textContent = 'Delete';
  deleteButton.setAttribute('aria-label', `Delete ${todo.text}`);

  actions.append(editButton, deleteButton);
  item.append(checkbox, text, actions);
  return item;
}

function renderTodos() {
  list.replaceChildren(...todos.map(createTodoElement));
  updateSummary();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = input.value.trim();

  if (!text) return;

  todos.push({ id: crypto.randomUUID(), text, completed: false });
  input.value = '';
  renderTodos();
  input.focus();
});

list.addEventListener('change', (event) => {
  if (!event.target.classList.contains('complete-checkbox')) return;

  const item = event.target.closest('.todo-item');
  const todo = todos.find((currentTodo) => currentTodo.id === item.dataset.id);
  if (!todo) return;

  todo.completed = event.target.checked;
  renderTodos();
});

list.addEventListener('click', (event) => {
  const actionButton = event.target.closest('button');
  const item = event.target.closest('.todo-item');

  if (!actionButton || !item) return;

  const todoIndex = todos.findIndex((todo) => todo.id === item.dataset.id);
  if (todoIndex === -1) return;

  if (actionButton.classList.contains('delete-button')) {
    todos.splice(todoIndex, 1);
  } else if (actionButton.classList.contains('edit-button')) {
    const textElement = item.querySelector('span');

    if (item.dataset.editing === 'true') {
      const updatedText = textElement.querySelector('input').value.trim();
      if (!updatedText) return;
      todos[todoIndex].text = updatedText;
      delete item.dataset.editing;
    } else {
      const editInput = document.createElement('input');
      editInput.type = 'text';
      editInput.value = todos[todoIndex].text;
      editInput.setAttribute('aria-label', 'Edit task');
      textElement.replaceChildren(editInput);
      item.dataset.editing = 'true';
      actionButton.textContent = 'Save';
      editInput.focus();
      return;
    }
  }

  renderTodos();
});

renderTodos();
