const taskList = document.getElementById('lista-tarefas');
const createTaskBtn = document.getElementById('criar-tarefa');
const inputTask = document.getElementById('texto-tarefa');
//const taskListItems = document.getElementsByClassName('item-tarefas');
const finishedTasksList = document.getElementsByClassName('completed');

function addTask() {
  const newTaskListElement = document.createElement('li');
  newTaskListElement.classList.add('item-tarefas');
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
  const actualSelected = taskList.getElementsByClassName('selected');
  const taskElement = event.target;
  /* if (taskElement.id === 'selected') {
    taskElement.removeAttribute('id', 'selected');
  } else {
    taskElement.setAttribute('id', 'selected');
  }
  for (const task of taskListItems) {
    if (task !== event.target) {
      task.removeAttribute('id', 'selected');
    }
  } */


  if (actualSelected[0] && actualSelected[0] !== taskElement) {
    actualSelected[0].classList.remove('selected');
    taskElement.classList.add('selected');
  } else {
    taskElement.classList.toggle('selected');
    //actualSelected.classList.remove('selected');    
  }
}

function decorateFinishedTask(event) {
  const finishedElement = event.target;
  ///const finishedElementClasses = finishedElement.classList;
  /* if (finishedElementClasses.length > 1) {
    finishedElement.className = finishedElementClasses[0];
    finishedElement.removeAttribute('id', 'selected');
  } else {
    finishedElement.className += ' ' + 'completed';
    finishedElement.setAttribute('id', 'selected');
  } */
  finishedElement.classList.toggle('completed');
}

function clearTaskList() {
  const taskListItems = document.getElementsByClassName('item-tarefass');
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
  if (!taskList.getElementsByClassName('selected')[0]) {
    return;
  }
  const selectedUpItem = taskList.getElementsByClassName('selected');
  const previousUpItem = selectedUpItem[0].previousElementSibling;  
  if (selectedUpItem[0] && previousUpItem) {
    const parent = selectedUpItem[0].parentNode;
    parent.insertBefore(selectedUpItem[0], previousUpItem);
  }

  /* if (document.getElementById('selected') === null) {
    return null;
  }
  const selectedItem = document.getElementById('selected');
  const previousEl = selectedItem.previousElementSibling;
  if (previousEl !== null) {
    selectedItem.parentNode.insertBefore(selectedItem, previousEl);
  } */
}

// fonte: https://stackoverflow.com/questions/2698793/swapping-li-elements-with-replacechild-possible

function moveDownTask() {
  if (!taskList.getElementsByClassName('selected')[0]) {
    return;
  }
  const selectedDownItem = taskList.getElementsByClassName('selected');
  if (!selectedDownItem) return;
  const nextDownItem = selectedDownItem[0].nextElementSibling;
  if (selectedDownItem[0] && nextDownItem) {
    const parent = selectedDownItem[0].parentNode;
    parent.insertBefore(nextDownItem, selectedDownItem[0]);
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
