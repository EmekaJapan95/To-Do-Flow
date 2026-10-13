
/*==================================================
    TODOFLOW
    THEME.JS
    Handles Dark / Light Mode
===================================================*/

/*=========================================
    TOGGLE THEME BUTTON (GLOBAL)
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    const toggleBtn = document.getElementById("themeToggle");

    // Apply saved theme on load
    applySavedTheme();

    // Toggle theme on button click
    if (toggleBtn) {

        toggleBtn.addEventListener("click", () => {

            const currentTheme = getTheme();

            const newTheme = currentTheme === "dark" ? "light" : "dark";

            setTheme(newTheme);

        });

    }

});



/*=========================================
    APPLY SAVED THEME
=========================================*/

function applySavedTheme() {

    const theme = getTheme();

    if (theme === "dark") {
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }

}



/*=========================================
    SET THEME
=========================================*/

function setTheme(theme) {

    if (theme === "dark") {

        document.body.classList.add("dark");

    } else {

        document.body.classList.remove("dark");

    }


    saveTheme(theme);

}


/*=========================================
    LOAD THEME (CALLED FROM app.js)
=========================================*/

function loadTheme() {
    applySavedTheme();
}
