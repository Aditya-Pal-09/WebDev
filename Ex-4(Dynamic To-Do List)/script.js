const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const completedCount = document.getElementById("completedCount");
const progressBar = document.getElementById("progressBar");
const clearAllBtn = document.getElementById("clearAllBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Add Task
function addTask(text) {
    const task = {
        id: Date.now(),
        text: text,
        completed: false,
        date: new Date().toLocaleString()
    };
    tasks.push(task);
    saveTasks();
    renderTasks();
}

// Render Tasks
function renderTasks() {
    taskList.innerHTML = "";
    let completedTasks = 0;

    tasks.forEach(task => {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        const div = document.createElement("div");
        div.className = "task-info";
        div.innerHTML = `<strong>${task.text}</strong><br><small>${task.date}</small>`;

        if (task.completed) {
            div.classList.add("completed");
            completedTasks++;
        }

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "action-btn edit";
        editBtn.onclick = () => {
            const newText = prompt("Edit task:", task.text);
            if (newText && newText.trim() !== "") {
                task.text = newText.trim();
                saveTasks();
                renderTasks();
            }
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "action-btn delete";
        deleteBtn.onclick = () => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            renderTasks();
        };

        li.appendChild(checkbox);
        li.appendChild(div);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });

    updateStats(completedTasks);
}

// Update Stats & Progress
function updateStats(completedTasks) {
    taskCount.textContent = `${tasks.length} Tasks`;
    completedCount.textContent = `${completedTasks} Completed`;

    const percent = tasks.length === 0 ? 0 :
        (completedTasks / tasks.length) * 100;
    progressBar.style.width = percent + "%";
}

// Save to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Event Listeners
addTaskBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (text !== "") {
        addTask(text);
        taskInput.value = "";
    }
});

// Add with Enter key
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTaskBtn.click();
    }
});

// Clear All
clearAllBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all tasks?")) {
        tasks = [];
        saveTasks();
        renderTasks();
    }
});

// Initial Render
renderTasks();