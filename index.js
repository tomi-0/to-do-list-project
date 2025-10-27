// Create array of objects for tasks
let tasks = []
let generatedHTML = "";

// Collect task description from input when button clciken
let addTaskButtonElement = document.querySelector(".js-add-button");
let inputField = document.querySelector(".js-task-desc");

addTaskButtonElement.addEventListener("click", () => {
    let newTask = {desciption: inputField.value}
    tasks.push(newTask);

    // add task to display
    displayTasks(newTask);
    
    // clear input field
    inputField.value = '';
});

// display task in tasks section
function displayTasks(task) {
    let tasksElement = document.querySelector(".js-active-tasks");
    generatedHTML += `
         <div class="task">
                <div class="task-desc">${task.desciption}</div>
                <button class="completed-button"></button>
                <button class="delete-button"></button>
        </div>
    `;

    tasksElement.innerHTML = generatedHTML;
}