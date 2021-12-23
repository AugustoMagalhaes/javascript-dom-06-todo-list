const taskList = document.getElementById('lista-tarefas');
const createTaskBtn = document.getElementById('criar-tarefa');
const inputTask = document.getElementById('texto-tarefa');
const taskListItems = document.getElementsByClassName('item-tarefas');
const finishedTasksList = document.getElementsByClassName('completed');

function addTask() {
  const newTaskListElement = document.createElement('li');
  newTaskListElement.className = 'item-tarefas';
  newTaskListElement.innerText = inputTask.value;
  newTaskListElement.addEventListener('click', selectTask);
  newTaskListElement.addEventListener('dblclick', decorateFinishedTask);

  try {
    if (inputTask.value.length === 0) throw 'Digite uma tarefa válida';
    if (parseFloat(inputTask.value) == inputTask.value) throw 'Digite uma tarefa apenas como texto';
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

function decorateFinishedTask(event) {
  const finishedElement = event.target;
  const finishedElementClasses = finishedElement.classList;
  if (finishedElementClasses.length > 1) {
    finishedElement.className = finishedElementClasses[0];
    finishedElement.style.backgroundColor = 'rgba(0, 0, 0, 0)';
  } else {
    finishedElement.className += ' ' + 'completed';
    finishedElement.style.backgroundColor = 'rgb(128, 128, 128)';
  }
}

function clearTaskList() {
  for (let index = taskListItems.length - 1; index >= 0; index -= 1) {
    const singleTask = taskListItems[index];
    taskList.removeChild(singleTask);
  }
}

const clearTasksBtn = document.getElementById('apaga-tudo');
clearTasksBtn.addEventListener('click', clearTaskList);

function removeFinishedTasks() {  
  for (let index = finishedTasksList.length - 1; index >= 0; index -= 1) {
    const finishedTask = finishedTasksList[index];
    taskList.removeChild(finishedTask);
  }
}

const removeFinishedTasksBtn = document.getElementById('remover-finalizados');
removeFinishedTasksBtn.addEventListener('click', removeFinishedTasks);