
/*==================================================
    TODOFLOW
    SORT.JS
    Handles Task Sorting Logic
===================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const sortSelect = document.getElementById("sortTasks");

    if (!sortSelect) return;

    let tasks = getTasks();

    /*=========================================

        SORT CHANGE EVENT
    =========================================*/

    sortSelect.addEventListener("change", (e) => {

        const value = e.target.value;

        let sorted = [...tasks];

        switch (value) {

            case "newest":
                sorted.sort((a, b) =>
                    new Date(b.createdAt) - new Date(a.createdAt)
                );
                break;

            case "oldest":
                sorted.sort((a, b) =>
                    new Date(a.createdAt) - new Date(b.createdAt)
                );
                break;

            case "alphabetical":
                sorted.sort((a, b) =>
                    a.title.localeCompare(b.title)
                );
                break;

            case "priority":
                sorted.sort((a, b) => {

                    const order = { "High": 3, "Medium": 2, "Low": 1 };

                    return order[b.priority] - order[a.priority];


                });
                break;

            case "date":
                sorted.sort((a, b) => {

                    if (!a.date) return 1;
                    if (!b.date) return -1;

                    return new Date(a.date) - new Date(b.date);

                });
                break;

            default:
                sorted = tasks;
                break;
        }

        renderSortedTasks(sorted);

    });

    /*=========================================
        RENDER SORTED TASKS
    =========================================*/

    function renderSortedTasks(list) {

        const container = document.getElementById("taskContainer");

        if (!container) return;

        container.innerHTML = "";


        if (typeof window.renderTasksFromFilter === "function") {
            window.renderTasksFromFilter(list);
        } else {
            fallbackRender(list);
        }

    }

    /*=========================================
        FALLBACK RENDER
    =========================================*/

    function fallbackRender(list) {

        const container = document.getElementById("taskContainer");

        container.innerHTML = "";

        list.forEach(task => {

            const taskEl = document.createElement("div");

            taskEl.classList.add("task-card");

            if (task.completed) {
                taskEl.classList.add("completed");
            }

            taskEl.innerHTML = `
                <div class="task-header">
                    <div class="task-title">
                        <span class="task-emoji">$

{task.emoji}</span>
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

                    <button onclick="toggleComplete('${task.id}')">✔</button>

                    <button onclick="openEditModal('${task.id}')">✏</button>

                    <button onclick="openDeleteModal('${task.id}')">🗑</button>

                </div>
            `;

            container.appendChild(taskEl);

        });

    }

});
