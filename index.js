import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

// Create array of objects for tasks
let tasks = []
const completedtasks = []

renderTasks();

// render task list
function renderTasks() {
    // Displays current date
    const dateElement = document.querySelector(".js-date");
    const today = dayjs()
    const todayFormatted = today.format("ddd DD MMM");
    console.log(todayFormatted);
    dateElement.innerHTML = todayFormatted;

    // HTML for each task
    let generatedHTML = ' ';

    const tasksElement = document.querySelector(".js-active-tasks");
    tasks.forEach((task) => {
        generatedHTML += `
         <div class="task">
                <div class="task-desc">${task.desciption}</div>
                <button class="completed-button js-completed-button" data-task-id=${task.id}></button>
                <button class="delete-button js-delete-button" data-task-id=${task.id}></button>
        </div>
    `;
    })
    tasksElement.innerHTML = generatedHTML;

    // Collect task description from input when button clciken
    const addTaskButtonElement = document.querySelector(".js-add-button");
    const inputField = document.querySelector(".js-task-desc");

    addTaskButtonElement.addEventListener("click", () => {

        if (inputField.value && inputField.value[0]!==" ") {
            const newTask = {
                // id either 0 or previous id incremented
                id: parseInt((tasks[tasks.length-1]) ? tasks[tasks.length-1].id + 1 : 0),
                desciption: inputField.value
            }
            tasks.push(newTask);
            // add task to display
            renderTasks();
        }
        
        // clear input field
        inputField.value = '';
    });


    // deletes an existing task
    document.querySelectorAll(".js-delete-button").forEach((deleteButton) => {
        deleteButton.addEventListener("click", () => {
            const id = parseInt(deleteButton.dataset.taskId);
            tasks = tasks.filter((task) => {
                if (task.id === id) {
                    return false 
                } return true;
            });
            renderTasks();
        });
    });

    // adds a task to completed list
    document.querySelectorAll(".js-completed-button").forEach((completeButton) => {
        completeButton.addEventListener("click", () => {
            // add to completed tasks
            const id = parseInt(completeButton.dataset.taskId);
            const newTask = tasks.find( task => task.id === id);
            completedtasks.push(newTask);

            // remove from tasks
            tasks = tasks.filter((task) => {
                if (task.id === id) {
                    return false 
                } return true;
            });

            // re renders to do list
            renderTasks();
        })  

    });
}








// updates progress bar upon deletion and completion