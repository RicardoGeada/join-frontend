let expanded = false;
let selectTrigger = document.querySelector('.select-trigger');

let taskStatus = localStorage.getItem('taskStatus') || 'to-do';
let addedContacts = [];
let addedContactInitial = [];
let badges = [];
let categoryColor;
let addedSubTasks = [];


//-------------------------------------------------//
//------- Storage load and Render Functions -------//
//-------------------------------------------------//


/**
 * Initializes task processing and renders contacts.
 * @async
 * @function
 * @returns {Promise<void>} A Promise that resolves when initialization is complete.
 */
async function initAddTask() {
    // userAndContacts();
    await loadContactsFromStorage();
    // await loadUsersFromStorage();
    // await loadCurrentUserFromStorage();
    await loadTasksFromStorage();
    sortContactsUserFirst(contacts);
    renderContacts();
    selectPrio(2);
}


/**
 * Renders contacts in the user interface.
 * @function
 */
async function renderContacts() {
    let assignedToContact = document.getElementById('contactDropDown');
    assignedToContact.innerHTML = '';

    for (let i = 0; i < sortedContacts.length; i++) {
        const contact = sortedContacts[i];
        assignedToContact.innerHTML += renderContactHTML(i, contact);
        if (addedContacts.includes(contact.id)) addedContact(i);
    }
}


/**
 * Checks the user state in the contact list.
 * @function
 * @param {number} userid - The user ID to check.
 * @returns {string} A string indicating the user state ('(You)', '', or '(User)').
 */
function checkUserState(userid) {
    if (userid == currentUser['id']) {
        return '(You)';
    } else if (!userid) {
        return '';
    } else {
        return '(User)';
    }
}


/**
 * Renders contact initials from added contacts in the user interface.
 * @function
 */
function renderContactInitials() {
    let contactInitialDivs = document.getElementById('contactInitial');
    contactInitialDivs.innerHTML = '';

    for (let l = 0; l < addedContacts.length; l++) {
        const initial = addedContacts[l];
        const index = sortedContacts.findIndex(c => c['id'] == initial);

        contactInitialDivs.innerHTML += contactInitialsHTML(index);
    };
}


/**
 * Reloads edited subtasks and renders them in the user interface.
 * @function
 */
function renderSubTaskUpdate() {
    let showSubs = document.getElementById('subTaskList');
    showSubs.innerHTML = '';

    for (let j = 0; j < addedSubTasks.length; j++) {
        const sub = addedSubTasks[j]['subtask'];
        showSubs.innerHTML += renderSubHTML(sub, j);
    };
}


/**
 * Reloads the contact list by initializing task processing.
 * @async
 * @function
 */
async function reloadContacts() {
    await initAddTask();
}

