const taskList = document.getElementById('lista-tarefas');
const createTaskBtn = document.getElementById('criar-tarefa');
const inputTask = document.getElementById('texto-tarefa');

function addTask() {
  const newTaskListElement = document.createElement('li');
  newTaskListElement.className = 'item-tarefas';
  newTaskListElement.innerText = inputTask.value;

  try {
    if (inputTask.value.length === 0) throw 'Digite uma tarefa válida';
    if (parseFloat(inputTask.value) == inputTask.value) throw 'Digite uma tarefa como texto';
  } catch (error) {
    alert(error);
    inputTask.value = '';
    return;
  }
  taskList.appendChild(newTaskListElement);
  inputTask.value = '';
  const taskListItems = document.getElementsByClassName('item-tarefas');
}

createTaskBtn.addEventListener('click', addTask);
inputTask.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    addTask();
  }
});

