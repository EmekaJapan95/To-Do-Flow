
/*==================================================
    TODOFLOW
    DASHBOARD.JS
    Handles Stats + Progress Updates
===================================================*/

document.addEventListener("DOMContentLoaded", () => {

    updateDashboard();

    // Update dashboard every 2 seconds (live sync)
    setInterval(updateDashboard, 2000);

});


/*=========================================
    MAIN DASHBOARD FUNCTION
=========================================*/

function updateDashboard() {

    const tasks = getTasks();

    const total = tasks.length;

    const completed = tasks.filter(t => t.completed).length;

    const pending = tasks.filter(t => !t.completed).length;

    const today = new Date().toISOString().split("T")[0];

    const overdue = tasks.filter(t =>
        t.date &&
        t.date < today &&
        !t.completed
    ).length;

    const percentage = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    updateUI(total, completed, pending, overdue, percentage);

}


/*=========================================
    UPDATE UI ELEMENTS

=========================================*/

function updateUI(total, completed, pending, overdue, percentage) {

    setText("totalTasks", total);

    setText("completedTasks", completed);

    setText("pendingTasks", pending);

    setText("overdueTasks", overdue);

    setText("completionPercent", percentage + "%");

    updateProgressBar(percentage);

}


/*=========================================
    UPDATE PROGRESS BAR
=========================================*/

function updateProgressBar(percent) {

    const bar = document.getElementById("progressFill");

    const text = document.getElementById("progressText");

    if (bar) {

        bar.style.width = percent + "%";

    }

    if (text) {

        text.textContent = percent + "% Completed";

    }

}


/*=========================================
    SAFE TEXT SETTER
=========================================*/

function setText(id, value) {

    const el = document.getElementById(id);

    if (el) {

        el.textContent = value;}
    }
