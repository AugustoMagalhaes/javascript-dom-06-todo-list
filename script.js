const taskList = document.getElementById('lista-tarefas');
const createTaskBtn = document.getElementById('criar-tarefa');
const inputTask = document.getElementById('texto-tarefa');
//const taskListItems = document.getElementsByClassName('item-tarefas');
const finishedTasksList = document.getElementsByClassName('completed');
const moveUpBtn = document.getElementById('mover-cima');
const moveDownBtn = document.getElementById('mover-baixo');

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

  if (actualSelected[0] && actualSelected[0] !== taskElement) {
    actualSelected[0].classList.remove('selected');
    taskElement.classList.add('selected');
  } else if (event.target === moveDownBtn || event.target === moveUpBtn) {
    actualSelected.classList.remove('selected');
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
  const taskListItems = document.getElementsByClassName('item-tarefas');
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

function saveList() {
  const taskListContent = taskList.innerHTML;
  localStorage.setItem('taskList', JSON.stringify(taskListContent));
  // agradecimento ao @gabsufrrj por ter me explicado o requisito.
}

const saveListBtn = document.getElementById('salvar-tarefas');
saveListBtn.addEventListener('click', saveList);

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

//moveup
moveUpBtn.addEventListener('click', moveUpTask);

//move down
moveDownBtn.addEventListener('click', moveDownTask);

function removeSelected() {
  const selectedItem = document.getElementsByClassName('selected')[0];
  if (selectedItem !== null) {
    taskList.removeChild(selectedItem);
  }
}

const removeSeletecItemBtn = document.getElementById('remover-selecionado');
removeSeletecItemBtn.addEventListener('click', removeSelected);

function resetLocalStorage() {
  localStorage.clear();
}

const eraseStorageList = document.getElementById('erase-storage');
eraseStorageList.addEventListener('click', resetLocalStorage);

window.onload = (function() {
  if (localStorage.length > 0) {
    const localStorageTaskList = localStorage.getItem('taskList');
    taskList.innerHTML = JSON.parse(localStorageTaskList);
  }
  inputTask.value = '';
});