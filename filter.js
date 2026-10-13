
/*==================================================
    TODOFLOW
    FILTER.JS
    Handles Task Filtering Logic
===================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const filterButtons = document.querySelectorAll(".filter-btn");

    if (!filterButtons.length) return;

    let allTasks = getTasks();

    let activeFilter = "all";

    /*=========================================
        INIT FILTER EVENTS
        =========================================*/

    filterButtons.forEach(btn => {

        btn.addEventListener("click", () => {

            filterButtons.forEach(b => b.classList.remove("active"));

            btn.classList.add("active");

            activeFilter = btn.dataset.filter;

            applyFilter();

        });


    });

    /*=========================================
        APPLY FILTER LOGIC
    =========================================*/

    function applyFilter() {

        let filtered = [...allTasks];

        const today = new Date().toISOString().split("T")[0];

        switch (activeFilter) {

            case "completed":

                filtered = filtered.filter(t => t.completed);
                break;

            case "pending":
                filtered = filtered.filter(t => !t.completed);
                break;

            case "high":
                filtered = filtered.filter(t => t.priority === "High");
                break;

            case "today":
                filtered = filtered.filter(t => t.date === today);
                break;

            case "overdue":
                filtered = filtered.filter(t => {

                    return t.date && t.date < today && !t.completed;
                });
                break;

            default:
                filtered = allTasks;
                break;
        }

        renderFilteredTasks(filtered);
    }

    /*=========================================
        RENDER FILTERED TASKS
        (connects with tasks.js)
    =========================================*/


    function renderFilteredTasks(filteredTasks) {

        const container = document.getElementById("taskContainer");

        if (!container) return;

        container.innerHTML = "";

        if (typeof window.renderTasksFromFilter === "function") {
            window.renderTasksFromFilter(filteredTasks);
        } else {

            // fallback: reload tasks.js render

            const event = new CustomEvent("filterChanged", {
                detail: filteredTasks
            });

            window.dispatchEvent(event);

        }
    }

});
