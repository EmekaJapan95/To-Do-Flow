
/*==================================================
    TODOFLOW
    STORAGE.JS
    Handles Local Storage Operations
===================================================*/

const STORAGE_KEYS = {
    TASKS: "todoFlowTasks",
    CATEGORIES: "todoFlowCategories",
    THEME: "todoFlowTheme"
};

/*=========================================
    DEFAULT CATEGORIES
=========================================*/

const DEFAULT_CATEGORIES = [
    "📚 School",
    "💼 Work",
    "🏠 Home",
    "🛒 Shopping",
    "💪 Fitness",
    "🎮 Gaming"
];

/*=========================================
    INITIALIZE STORAGE
=========================================*/

function initializeStorage() {

    if (!localStorage.getItem(STORAGE_KEYS.TASKS)) {

        localStorage.setItem(
            STORAGE_KEYS.TASKS,
            JSON.stringify([])
        );
    }

    if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
        localStorage.setItem(
            STORAGE_KEYS.CATEGORIES,
            JSON.stringify(DEFAULT_CATEGORIES)
        );
    }

    if (!localStorage.getItem(STORAGE_KEYS.THEME)) {
        localStorage.setItem(
            STORAGE_KEYS.THEME,

            "light"
        );
    }

}

/*=========================================
    TASKS
=========================================*/

function getTasks() {

    return JSON.parse(
        localStorage.getItem(STORAGE_KEYS.TASKS)
    ) || [];

}

function saveTasks(tasks) {

    localStorage.setItem(
        STORAGE_KEYS.TASKS,
        JSON.stringify(tasks)
    );

}

/*=========================================
    CATEGORIES
=========================================*/

function getCategories() {

    return JSON.parse(

        localStorage.getItem(STORAGE_KEYS.CATEGORIES)
    ) || [];

}

function saveCategories(categories) {

    localStorage.setItem(
        STORAGE_KEYS.CATEGORIES,
        JSON.stringify(categories)
    );

}

/*=========================================
    THEME
=====================================

====*/

function getTheme() {

    return localStorage.getItem(STORAGE_KEYS.THEME) || "light";

}

function saveTheme(theme) {

    localStorage.setItem(
        STORAGE_KEYS.THEME,
        theme
    );

}

/*====================================

=====
    ADD CATEGORY
=========================================*/

function addCategory(categoryName) {

    const categories = getCategories();

    if (!categories.includes(categoryName)) {

        categories.push(categoryName);

        saveCategories(categories);

    }

}

/*=========================================
    GENERATE UNIQUE ID
=========================================*/

function generateTaskId() {

    return Date.now().toString();

}

/*=========================================
    FIND TASK
=========================================*/

function getTaskById(id) {

    return getTasks().find(task => task.id === id);

}

/*=========================================
    UPDATE TASK
=========================================*/

function updateTask(updatedTask) {

    const tasks = getTasks();

    const index = tasks.findIndex(
        task => task.id === updatedTask.id
    );

    if (index !== -1) {


        tasks[index] = updatedTask;

        saveTasks(tasks);

    }

}

/*=========================================
    DELETE TASK
=========================================*/

function deleteTask(id) {

    const tasks = getTasks().filter(
        task => task.id !== id
    );


    saveTasks(tasks);

}

/*=========================================
    TOGGLE COMPLETE
=========================================*/

function toggleTaskStatus(id) {

    const tasks = getTasks();

    const task = tasks.find(
        task => task.id === id
    );

    if (task) {


        task.completed = !task.completed;

        saveTasks(tasks);

    }

}

/*=========================================
    ADD NEW TASK
=========================================*/

function addTask(task) {

    const tasks = getTasks();

    tasks.push(task);


    saveTasks(tasks);

}

/*=========================================
    INITIALIZE APP
=========================================*/

initializeStorage();
