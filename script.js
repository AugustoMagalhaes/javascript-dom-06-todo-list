const taskList = document.getElementById('lista-tarefas');
const createTaskBtn = document.getElementById('criar-tarefa');
const inputTask = document.getElementById('texto-tarefa');
const taskListItems = document.getElementsByClassName('item-tarefas');

function addTask() {
  const newTaskListElement = document.createElement('li');
  newTaskListElement.className = 'item-tarefas';
  newTaskListElement.innerText = inputTask.value;
  newTaskListElement.addEventListener('click', selectTask);

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
  
}

createTaskBtn.addEventListener('click', addTask);
inputTask.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    addTask();
  }
});

function selectTask(event) {
  const taskElement = event.target;
  const taskElementColor = window.getComputedStyle(taskElement, null).getPropertyValue('background-color');
  taskElement.style.backgroundColor = (taskElementColor === 'rgb(128, 128, 128)') ? 'rgba(0, 0, 0, 0)' : 'rgb(128, 128, 128';
  for (let task of taskListItems) {
    if (task !== event.target) {
      task.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    }
  }
}



