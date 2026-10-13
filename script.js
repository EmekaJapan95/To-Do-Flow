
/*==================================================
    TODOFLOW
    APP.JS
    Global Initialization File
===================================================*/

/*=========================================
    RUN ON PAGE LOAD
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    // Initialize storage first
    initializeStorage();

    // Load theme
    loadTheme();

    // Start live clock (if elements exist)
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Highlight active sidebar link
    setActiveNavLink();

});


/*=========================================
    DATE & TIME
=========================================*/

function updateDateTime() {


    const dateEl = document.getElementById("currentDate");
    const timeEl = document.getElementById("currentTime");

    const now = new Date();

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    if (dateEl) {
        dateEl.textContent = now.toLocaleDateString(undefined, options);
    }

    if (timeEl) {
        timeEl.textContent = now.toLocaleTimeString();
    }

}


/*=========================================
    ACTIVE NAV LINK
=========================================*/

function setActiveNavLink() {

    const links = document.querySelectorAll(".sidebar nav a");

    const currentPage = window.location.pathname.split("/").pop();

    links.forEach(link => {

        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        }

    });

}


/*=========================================
    SAFE QUERY HELPERS

=========================================*/

function $(id) {
    return document.getElementById(id);
}

function $all(selector) {
    return document.querySelectorAll(selector);
}

const loadingModal =

    document.getElementById("loadingModal");

function showLoading() {
    loadingModal.classList.add("active");
}

function hideLoading() {
    loadingModal.classList.remove("active");
}
