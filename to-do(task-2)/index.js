document.addEventListener("DOMContentLoaded", loadTasks);
document.querySelector('#task-form').addEventListener('submit', addTask);
document.querySelector('#task-list').addEventListener('click', deleteTask);


function loadTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        createTaskElement(task);
    });
}

function addTask(e) {
    e.preventDefault();

    const taskInput = document.querySelector('#task-input').value;

    if (taskInput === '') {
        alert("please Enter a task")
    } else {
        createTaskElement(taskInput);
        storeTaskInLocalStorage(taskInput);
        document.querySelector('#task-input').value = '';
    }
}

function createTaskElement(task) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(task));

    const deleteBtn = document.createElement('button');
    deleteBtn.appendChild(document.createTextNode('X'));
    li.appendChild(deleteBtn);

    document.querySelector('#task-list').appendChild(li);
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(e) {
    if (e.target.tagName === 'BUTTON') {
        if (confirm('Are you sure?')) {
            const listItem = e.target.parentElement;
            listItem.classList.add('deleted');
            setTimeout(() => {
                listItem.remove();
                removeTaskFromLocalStorage(listItem);
            }, 500);
        }
    }
}

function removeTaskFromLocalStorage(taskItem) {

    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if (taskItem.firstChild.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}