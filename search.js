
/*==================================================
    TODOFLOW
    SEARCH.JS
    Instant Task Search System
===================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("searchInput");

    if (!searchInput) return;

    let tasks = getTasks();

    /*=========================================

        SEARCH INPUT EVENT
    =========================================*/

    searchInput.addEventListener("input", (e) => {

        const query = e.target.value.toLowerCase().trim();

        const filtered = tasks.filter(task => {

            return (

                task.title.toLowerCase().includes(query) ||

                task.description.toLowerCase().includes(query)


            );

        });

        renderSearchResults(filtered);

    });

    /*=========================================
        RENDER SEARCH RESULTS
    =========================================*/

    function renderSearchResults(results) {

        const container = document.getElementById("taskContainer"

        );

        if (!container) return;

        container.innerHTML = "";

        if (results.length === 0) {

            container.innerHTML = `
                <div class="empty-state">
                    <h2>🔍</h2>
                    <h3>No Results Found</h3>
                    <p>Try searching with different keywords</p>
                </div>
            `;

            return;
        }

        if (typeof

            window.renderTasksFromFilter === "function") {
            window.renderTasksFromFilter(results);
        } else {
            renderFallback(results);
        }

    }

    /*=========================================
        FALLBACK RENDER
    =========================================*/

    function renderFallback(list) {

        const container =

            document.getElementById("taskContainer");

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

                    <button onclick="toggleComplete('${task.id}')">✔</button>

                    <button onclick="openEditModal('${task.id}')">✏</button>

                    <button 

onclick="openDeleteModal('${task.id}')">🗑</button>

                </div>
            `;

            container.appendChild(taskEl);

        });

    }

});
