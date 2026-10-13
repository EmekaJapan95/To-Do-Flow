
/*==================================================
    TODOFLOW
    UTILS.JS
    Helper Functions for Entire App
===================================================*/


/*=========================================
    FORMAT DATE (READABLE)
=========================================*/

function formatDate(dateString) {

    if (!dateString) return "No date";

    const date = new Date(dateString);


    return date.toLocaleDateString(undefined, {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric"
    });

}


/*=========================================
    CHECK IF TASK IS OVERDUE
=========================================*/

function isOverdue(task) {

    if (!task.date || task.completed) return false;

    const today = new Date().toISOString().split("T")[0];

    return task.date < today;

}


/*=========================================
    GET TODAY DATE STRING
=========================================*/

function getToday() {

    return new

        Date().toISOString().split("T")[0];

}


/*=========================================
    CAPITALIZE TEXT
=========================================*/

function capitalize(text) {

    if (!text) return "";

    return text.charAt(0).toUpperCase() + text.slice(1);

}


/*=========================================
    VALIDATE TASK INPUT
=========================================*/

function validateTask(task) {

    if (!task.title || task.title.trim() === "") {
        return {
            valid: false,
            message: "Task title is required"
        };
    }

    if (task.title.length < 3) {
        return {
            valid: false,
            message: "Task title must be at least 3 characters"
        };
    }

    return {
        valid: true
    };

}


/*=========================================
    GENERATE RANDOM COLOR (OPTIONAL USE)
=========================================*/

function getRandomColor() {

    const colors = [
        "#4F46E5",
        "#22C55E",
        "#F59E0B",
        "#EF4444",
        "#06B6D4",
        "#8B5CF6"
    ];

    return colors[Math.floor(Math.random() * colors.length)];

}


/*=========================================
    FORMAT TIME
=========================================*/


function formatTime(timeString) {

    if (!timeString) return "";

    const [hour, minute] = timeString.split(":");

    const date = new Date();

    date.setHours(hour);
    date.setMinutes(minute);

    return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

}

/*=========================================
    DEBOUNCE FUNCTION (FOR SEARCH)
=========================================*/

function debounce(func, delay) {

    let timeout;

    return function (...args) {

        clearTimeout(timeout);

        timeout = setTimeout(() => {
            func.apply(this, args);
        }, delay);

    };

}
