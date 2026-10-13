
/*==================================================
    TODOFLOW
    TASKS.JS
    Renders Tasks + Handles Actions
===================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("taskContainer");

    if (!container) return;

    let tasks = getTasks();

    /*====================================

=====
        RENDER TASKS
    =========================================*/

    function renderTasks(list = tasks) {

        container.innerHTML = "";

        if (list.length === 0) {
            showEmptyState();
            return;
        }

        hideEmptyState();

        list.forEach(task => {

            const taskEl = document.createElement("div");


            taskEl.classList.add("task-card");

            if (task.completed) {
                taskEl.classList.add("completed");
            }

            taskEl.innerHTML = `
            
                <div class="task-header">

                    <div class="task-title">

                        <span class="task-emoji">${task.emoji}</span>

                        <h3>${task.title}</h3>

                    </div>

                    <span class="category-tag">$

{task.category}</span>

                </div>

                <p class="task-description">${task.description || ""}</p>

                <div class="task-details">

                    <div class="task-info">
                        <span class="task-label">Due:</span>
                        <span class="task-value">${task.date || "No date"} ${task.time || ""}</span>
                    </div>

                    <div class="task-info">
                        <span class="task-label">Priority:</span>
                        <span class="priority $

{task.priority.toLowerCase()}">
                            ${task.priority}
                        </span>
                    </div>

                </div>

                <div class="task-actions">

                    <button onclick="toggleComplete('${task.id}')">
                        ✔
                    </button>

                    <button onclick="openEditModal('${task.id}')">
                        ✏
                    </button>

                    <button onclick="openDeleteModal('${task.id}')">

                        🗑
                    </button>

                </div>

            `;

            container.appendChild(taskEl);

        });

    }

    /*=========================================
        EMPTY STATE
    =========================================*/

    function showEmptyState() {

        const empty = document.getElementById("emptyState");

        if (empty) empty.style.display = "block";

    }

    function hideEmptyState() {

        const empty = document.getElementById("emptyState");

        if (empty) empty.style.display = "none";

    }

    /*====================================

=====
        COMPLETE TASK
    =========================================*/

    window.toggleComplete = function (id) {

        const task = getTaskById(id);

        if (!task) return;

        task.completed = !task.completed;

        updateTask(task);

        tasks = getTasks();

        renderTasks();

        if (typeof showToast === "function") {

            showToast("info", "Task Updated", "Task status changed!");
        }

    };

    /*=========================================
        DELETE TASK
    =========================================*/

    window.openDeleteModal = function (id) {

        const confirmDelete = confirm("Are you sure you want to delete this task?");

        if (!confirmDelete) return;

        deleteTask(id);

        tasks = getTasks();

        renderTasks();

        if (typeof showToast === "function") {
            showToast("error", "Task Deleted", "Task removed successfully!");
        }

    };

    /*=========================================
        EDIT TASK (BASIC VERSION)
    =========================================*/

    window.openEditModal = function (id) {

        const task = getTaskById(id);

        if (!task) return;

        const newTitle = prompt("Edit Task Title:", task.title);

        if (newTitle !== null && newTitle.trim() !== "") {

            task.title = newTitle.trim();

            updateTask(task);

            tasks = getTasks();

            renderTasks();

            if (typeof showToast ===

                "function") {
                showToast("success", "Task Updated", "Task edited successfully!");
            }

        }

    };

    /*=========================================
        INITIAL LOAD
    =========================================*/

    renderTasks();

    
/*=========================================
    ALLOW FILTER MODULE TO OVERRIDE RENDER
=========================================*/

window.renderTasksFromFilter = function (filteredTasks) {
    const container = document.getElementById("taskContainer");
    if (!container) return;

    container.innerHTML = "";

    filteredTasks.forEach(task => {

        const taskEl = document.createElement("div");

        taskEl.classList.add("task-card");

        if (task.completed) {
            taskEl.classList.add("completed");
        }

        taskEl.innerHTML = `
            <div class="task-header">
                <div class="task-title">
                    <span class="task-emoji">${task.emoji}</span>
                    <h3>${task.title}</h3>
                </div>
                <span class="category-tag">${task.category}</span>
            </div>

            <p class="task-description">${task.description || ""}</p>

            <div class="task-details">

                <div class="task-info">
                    <span class="task-label">Due:</span>
                    <span class="task-value">${task.date || "No date"} ${task.time || ""}</span>
                </div>

                <div class="task-info">
                    <span class="task-label">Priority:</span>
                    <span class="priority ${task.priority.toLowerCase()}">
                        ${task.priority}
                    </span>
                </div>
            </div>

            <div class="task-actions">
                <button onclick="toggleComplete('${task.id}')">✔</

button>
                <button onclick="openEditModal('${task.id}')">✏</button>
                <button onclick="openDeleteModal('${task.id}')">🗑</button>
            </div>
        `;

        container.appendChild(taskEl);
    });
};


});
