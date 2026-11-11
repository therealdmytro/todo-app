let todos = [
  { id: 1, text: 'Вивчити HTML', checked: true },
  { id: 2, text: 'Вивчити CSS', checked: true },
  { id: 3, text: 'Вивчити JavaScript', checked: false }
];

const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

function newTodo() {
  const taskText = prompt('Введіть назву нового завдання:');
  
  if (taskText && taskText.trim() !== '') {
    const newObj = {
      id: Date.now(),
      text: taskText.trim(),
      checked: false
    };

    todos.push(newObj);
    console.log('Оновлений масив todos:', todos);
    render(todos);
  }
}

function renderTodo(todo) {
  return `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <input type="checkbox" class="form-check-input me-2" id="${todo.id}" ${todo.checked ? 'checked' : ''} onChange="checkTodo(${todo.id})" />
        <label for="${todo.id}">
          <span class="${todo.checked ? 'text-success text-decoration-line-through' : ''}">${todo.text}</span>
        </label>
      </div>
      <button class="btn btn-danger btn-sm" onClick="deleteTodo(${todo.id})">delete</button>
    </li>
  `;
}

function render(todosArray) {
  const htmlElements = todosArray.map(todo => renderTodo(todo));
  list.innerHTML = htmlElements.join('');
  updateCounter();
}

function updateCounter() {
  const totalCount = todos.length;
  const uncheckedCount = todos.filter(todo => !todo.checked).length;

  itemCountSpan.textContent = totalCount;
  uncheckedCountSpan.textContent = uncheckedCount;
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  render(todos);
}

function checkTodo(id) {
  const todo = todos.find(item => item.id === id);
  if (todo) {
    todo.checked = !todo.checked;
    render(todos);
  }
}

render(todos);