
/*==================================================
    TODOFLOW
    ADDTASK.JS
    Handles Task Creation + Live Preview
===================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("taskForm");

    if (!form) return;

    /*=========================================
        FORM ELEMENTS
    

=========================================*/

    const title = document.getElementById("taskTitle");
    const description = document.getElementById("taskDescription");
    const category = document.getElementById("taskCategory");
    const date = document.getElementById("taskDate");
    const time = document.getElementById("taskTime");
    const priority = document.getElementById("taskPriority");
    const color = document.getElementById("taskColor");
    const emoji = document.getElementById("taskEmoji");


    /*=========================================
        PREVIEW ELEMENTS
    =========================================*/

    const previewTitle = document.getElementById("previewTitle");
    const previewDescription = document.getElementById("previewDescription");
    const previewCategory = document.getElementById("previewCategory");
    const previewPriority = document.getElementById("previewPriority");
    const previewEmoji =

        document.getElementById("previewEmoji");
    const previewDate = document.getElementById("previewDate");

    /*=========================================
        LIVE PREVIEW UPDATE
    =========================================*/

    function updatePreview() {

        if (previewTitle) previewTitle.textContent = title.value || "Task Title";

        if (previewDescription) previewDescription.textContent =

            description.value || "Task description...";

        if (previewCategory) previewCategory.textContent = category.value;

        if (previewPriority) previewPriority.textContent = priority.value;

        if (previewEmoji) previewEmoji.textContent = emoji.value || "📝";

        if (previewDate) {

            previewDate.textContent = date.value
                ? `${date.value} • ${time.value || ""}`
                : "No Due Date";


        }

    }

    /*=========================================
        INPUT LISTENERS
    =========================================*/

    [
        title,
        description,
        category,
        date,
        time,
        priority,
        emoji

    ].forEach(input => {

        if (input) {

            input.addEventListener("input", updatePreview);

        }

    });

    /*=========================================
        FORM SUBMIT (SAVE TASK)
    =========================================*/

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        // Validation
        if (!title.value.trim()) {
            alert("Task title is required!");
            return;
        }

        const newTask = {

            id: generateTaskId(),

            title: title.value.trim(),

            description: description.value.trim(),

            category: category.value,

            date: date.value,

            time: time.value,

            priority: priority.value,

            color: color.value,

            emoji: emoji.value || "📝",

            completed: false,

            createdAt: new Date().toISOString()

        };

        addTask(newTask);

        // Reset form
        form.reset();

        updatePreview();


        // Success message
        if (typeof showToast === "function") {
            showToast("success", "Task Created", "Your task was saved successfully!");
        }

    });

    /*=========================================
        INITIAL PREVIEW LOAD
    =========================================*/

    updatePreview();

});

showLoading();

setTimeout(() => {

    // Your existing save task code goes here

    hideLoading();

}, 6000);

