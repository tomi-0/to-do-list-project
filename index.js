import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

// Create array of objects for tasks
let tasks = []
let completedTasks = []

renderTasks();

// render task list
function renderTasks() {
    // Displays current date
    const dateElement = document.querySelector(".js-date");
    const today = dayjs()
    const todayFormatted = today.format("ddd DD MMM");
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
            updateProgressBar();
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
            updateProgressBar();
        });
    });

    // adds a task to completed list
    document.querySelectorAll(".js-completed-button").forEach((completeButton) => {
        completeButton.addEventListener("click", () => {
            // add to completed tasks
            const id = parseInt(completeButton.dataset.taskId);
            const newTask = tasks.find( task => task.id === id);
            completedTasks.push(newTask);

            // remove from tasks
            tasks = tasks.filter((task) => {
                if (task.id === id) {
                    return false 
                } return true;
            });

            // re-renders to do list
            renderTasks();
            updateProgressBar();
        })  

    });

    function updateProgressBar() {
        // updates progress bar upon deletion and completion
        // Changes progress bar
        const progressBarElement = document.querySelector(".js-progress-bar");
        const activeProgressBarElement = document.querySelector(".js-green-progress-bar");

        // 100% = completedTasks.length + tasks.length
        const totalTasks = completedTasks.length + tasks.length;
        const ratio = completedTasks.length / totalTasks;

        // ratio * width pf progress bar
        activeProgressBarElement.style.width = progressBarElement.offsetWidth * ratio + "px";

        // if no more tasks set progress to 0 and empty completed tasks
        if (tasks.length === 0) {
            completedTasks = [];
        }
    }
    

}








