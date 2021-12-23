const taskList = document.getElementById('lista-tarefas');
const createTaskBtn = document.getElementById('criar-tarefa');
const inputTask = document.getElementById('texto-tarefa');

function addTask() {
  const newTaskListElement = document.createElement('li');
  newTaskListElement.className = 'item-tarefas';
  newTaskListElement.innerText = inputTask.value;
  taskList.appendChild(newTaskListElement);
  inputTask.value = '';
}

createTaskBtn.addEventListener('click', addTask);
inputTask.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    addTask();
  }
});

