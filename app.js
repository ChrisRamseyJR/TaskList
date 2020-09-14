//Define UI vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all Event listenters
loadEventListeners();

function loadEventListeners() {
  //DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task
  form.addEventListener('submit', addTask);
  // Delete Task Event
  taskList.addEventListener('click', removeTask);
  //Clear Task Event
  clearBtn.addEventListener('click', clearTask);
  //Filter Tasks
  filter.addEventListener('keyup', filterTask);
}

//Get Tasks from Local
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task) {
    // Create li element
    const li = document.createElement('li');

    // Add class
    li.className = 'collection-item';

    //Create text node and append to li
    li.appendChild(document.createTextNode(task));

    //Create new link element
    const link = document.createElement('a');

    //Add class
    link.className = 'delete-item secondary-content';

    //Add icon
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //Append the link to li
    li.appendChild(link);

    //Append the li to ul
    taskList.appendChild(li);

  })
}


function addTask(e) {

  if (taskInput.value === '') {
    alert('Add a task');
  }

  // Create li element
  const li = document.createElement('li');

  // Add class
  li.className = 'collection-item';

  //Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));

  //Create new link element
  const link = document.createElement('a');

  //Add class
  link.className = 'delete-item secondary-content';

  //Add icon
  link.innerHTML = '<i class="fa fa-remove"></i>';

  //Append the link to li
  li.appendChild(link);

  //Append the li to ul
  taskList.appendChild(li);

  //Store in Local storage
  storeTaskLocalStorage(taskInput.value);

  //Clear input
  taskInput.value = '';

  e.preventDefault();
}

//Store Task
function storeTaskLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove Task 
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are You Sure')) {
      e.target.parentElement.parentElement.remove();
      //Remove from Local
      removeTaskLocal(e.target.parentElement.parentElement);
    }
  }
}

//Remove from Local
function removeTaskLocal(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}


//Clear Task
function clearTask() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  //Clear Local
  clearTaskLocal();
}

function clearTaskLocal() {
  localStorage.clear();
}

//Filter Task
function filterTask(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) !== -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });

}