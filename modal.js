
/*==================================================
    TODOFLOW
    MODAL.JS
    Handles Edit & Delete Modals
===================================================*/

document.addEventListener("DOMContentLoaded", () => {

    createModalStructure();

});


/*=========================================
    CREATE MODAL HTML (DYNAMIC)
=====================================

====*/

function createModalStructure() {

    if (document.getElementById("modal")) return;

    const modal = document.createElement("div");

    modal.id = "modal";
    modal.className = "modal";

    modal.innerHTML = `
    
        <div class="modal-content">

            <span class="close" onclick="closeModal()">&times;</span>

            <h2 id="modalTitle">Modal</h2>


            <p id="modalMessage">Message</p>

            <div id="modalBody"></div>

            <div class="modal-buttons">

                <button id="modalCancelBtn" onclick="closeModal()">Cancel</button>

                <button id="modalConfirmBtn">Confirm</button>

            </div>

        </div>
    
    `;

    document.body.appendChild(modal);

}


/*=========================================
    OPEN MODAL
=========================================*/

function openModal(title, message, onConfirm, customHTML = "") {

    const modal = document.getElementById("modal");

    const modalTitle = document.getElementById("modalTitle");

    const modalMessage = document.getElementById("modalMessage"

    );

    const modalBody = document.getElementById("modalBody");

    const confirmBtn = document.getElementById("modalConfirmBtn");

    if (!modal) return;

    modalTitle.textContent = title;

    modalMessage.textContent = message;

    modalBody.innerHTML = customHTML;

    modal.classList.add("active");

    // Remove previous click events
    const newBtn =

        confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newBtn, confirmBtn);

    newBtn.addEventListener("click", () => {

        if (typeof onConfirm === "function") {
            onConfirm();
        }

        closeModal();

    });

}


/*=========================================

    CLOSE MODAL
=========================================*/

function closeModal() {

    const modal = document.getElementById("modal");

    if (modal) {

        modal.classList.remove("active");

    }

}


/*=========================================

    DELETE CONFIRMATION HELPER
=========================================*/

function confirmDelete(taskId) {

    openModal(
        "Delete Task",
        "Are you sure you want to delete this task? This action cannot be undone.",
        () => {

            deleteTask(taskId);

            if (typeof showToast === "function") {
                showToast("error", "Deleted", "Task removed successfully");
            }

            // Refresh UI if available

            if (typeof renderTasksFromFilter === "function") {
                renderTasksFromFilter(getTasks());
            }

        }
    );

}


/*=========================================
    EDIT MODAL HELPER (BASIC)
=========================================*/

function openEditTaskModal(taskId) {

    const task = getTaskById(taskId);

    if (!task) return;

    const formHTML = `
        <input id="editTitle" value="${task.title}" placeholder="Task Title" />
    `;

    openModal(
        "Edit Task",
        "Update your task details below",
        () => {

            const newTitle = document.getElementById("editTitle").value;

            task.title = newTitle;

            updateTask(task);


            if (typeof showToast === "function") {
                showToast("success", "Updated", "Task updated successfully");
            }

            if (typeof renderTasksFromFilter === "function") {
                renderTasksFromFilter(getTasks());
            }

        },
        formHTML
    );

}
