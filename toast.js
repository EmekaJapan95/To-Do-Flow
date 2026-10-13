
/*==================================================
    TODOFLOW
    TOAST.JS
    Notification System
===================================================*/

document.addEventListener("DOMContentLoaded", () => {

    createToastContainer();

});


/*=========================================
    CREATE TOAST CONTAINER
=====================================

====*/

function createToastContainer() {

    if (!document.getElementById("toastContainer")) {

        const container = document.createElement("div");

        container.id = "toastContainer";

        document.body.appendChild(container);

    }

}

/*=========================================
    SHOW TOAST
=========================================*/

function showToast(type, title, message, duration = 3000) {

    createToastContainer();

    const container = document.getElementById("toastContainer");

    const toast = document.createElement("div");

    toast.classList.add("toast");

    if (type) toast.classList.add(type);

    toast.innerHTML = `

        <div class="toast-title">${title}</div>

        <div class="toast-message">${message}</div>

    `;

    container.appendChild(toast);

    // Auto remove
    setTimeout(() => {

        toast.style.opacity = "0";

        toast.style.transform = "translateX(100px)";

        setTimeout(() => toast.remove(), 300);

    }, duration);

}


/*=========================================
    QUICK HELPERS
=========================================*/

function toastSuccess(title, message) {
    showToast("success", title, message);
}

function toastError(title, message) {}

