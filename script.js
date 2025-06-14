// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage and populate the list
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Function to add a new task to the list
    function addTask(taskText, save = true) {
        // If called from UI, get and trim the input value
        if (typeof taskText !== 'string') {
            taskText = taskInput.value.trim();
        }

        // Check if the input is empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button for the task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';

        // Set up the remove button to delete the task when clicked
        removeBtn.onclick = function () {
            taskList.removeChild(li);
            // Remove from Local Storage
            let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks = storedTasks.filter(t => t !== taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        };

        // Append the remove button to the list item
        li.appendChild(removeBtn);

        // Add the new task to the task list
        taskList.appendChild(li);

        // Save to Local Storage if needed
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear the input field if task was added via UI
        if (save) {
            taskInput.value = "";
        }
    }

    // Event listener for the Add Task button
    addButton.addEventListener('click', function () {
        addTask();
    });

    // Event listener for pressing Enter in the input field
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks from Local Storage on page load
    loadTasks();
});