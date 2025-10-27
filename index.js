// Create array of objects for tasks
const tasks = []
const completedtasks = []

// Collect task description from input when button clciken
const addTaskButtonElement = document.querySelector(".js-add-button");
const inputField = document.querySelector(".js-task-desc");

addTaskButtonElement.addEventListener("click", () => {

    if (inputField.value && inputField.value[0]!==" ") {
        const newTask = {
            // id either 0 or previous id incremented
            id: (tasks[tasks.length-1]) ? tasks[tasks.length-1].id + 1 : 0,
            desciption: inputField.value
        }
        tasks.push(newTask);
        // add task to display
        renderTasks();
        console.log(tasks);
        console.log(document.querySelectorAll(".js-delete-button"));
    }
    
    // clear input field
    inputField.value = '';
});

// render task list
function renderTasks() {
    let generatedHTML = ' ';

    const tasksElement = document.querySelector(".js-active-tasks");
    tasks.forEach((task) => {
        generatedHTML += `
         <div class="task">
                <div class="task-desc">${task.desciption}</div>
                <button class="completed-button"></button>
                <button class="delete-button js-delete-button data-task-id=${task.id}"></button>
        </div>
    `;
    })
    tasksElement.innerHTML = generatedHTML;
}

// deletes an existing task
document.querySelectorAll(".js-delete-button").forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => {
        const id = deleteButton.dataset.taskId;
        console.log(id);
        tasks = tasks.filter((task) => task.id !== id);
        console.log(tasks);
    })
    renderTasks();
})



// adds a task to completed list



// updates progress bar upon deletion and completion