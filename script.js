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
inputTask.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    addTask();
  }
});

function selectTask(event) {
  const taskElement = event.target;  
  if (taskElement.id === 'selected') {
    taskElement.removeAttribute('id', 'selected');
  } else {
    taskElement.setAttribute('id', 'selected');
  }
  for (const task of taskListItems) {
    if (task !== event.target) {
      task.removeAttribute('id', 'selected');
    }
  }
}

function decorateFinishedTask(event) {
  const finishedElement = event.target;
  const finishedElementClasses = finishedElement.classList;
  if (finishedElementClasses.length > 1) {
    finishedElement.className = finishedElementClasses[0];
    finishedElement.removeAttribute('id', 'selected');
  } else {
    finishedElement.className += ' ' + 'completed';
    finishedElement.setAttribute('id', 'selected');
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

function moveUpTask() {
  if (document.getElementById('selected') === null) {
    return;
  }
  const selectedItem = document.getElementById('selected');
  const previousElement = selectedItem.previousElementSibling;
  if (previousElement !== null) {
    selectedItem.parentNode.insertBefore(selectedItem, previousElement);
  }
}

// fonte: https://stackoverflow.com/questions/2698793/swapping-li-elements-with-replacechild-possible

function moveDownTask() {
  if (document.getElementById('selected') === null) {
    return;
  }
  const selectedItem = document.getElementById('selected');
  const nextElement = selectedItem.nextElementSibling;
  if (nextElement !== null) {
    selectedItem.parentNode.insertBefore(nextElement, selectedItem);
  }
}

const moveUpBtn = document.getElementById('mover-cima');
moveUpBtn.addEventListener('click', moveUpTask);

const moveDownBtn = document.getElementById('mover-baixo');
moveDownBtn.addEventListener('click', moveDownTask);

function removeSelected() {
  const selectedItem = document.getElementById('selected');
  if (selectedItem !== null) {
    taskList.removeChild(selectedItem);
  }
}

const removeSeletecItemBtn = document.getElementById('remover-selecionado');
removeSeletecItemBtn.addEventListener('click', removeSelected);
