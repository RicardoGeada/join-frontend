/* ================= */
/* ===== BOARD ===== */
/* ================= */

/**
 * HTML Template - for board header in desktop view
 * @returns HTML
 */
function boardHeaderDesktopHTML() {
  return `
    <!-- Desktop -->
    <h1>Board</h1>
    <div class="board-header-right">
        <div class="board-searchbar-container">
            <input type="text" name="" id="board-searchbar" class="board-searchbar" placeholder="Find Task" autocomplete="off" onkeyup="searchTasks()">
            <div class="board-searchbar-container-inner-right">
                <div class="v-line-separator"></div>
                <svg class="icon-button" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_81525_6538" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
                    <rect width="32" height="32" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_81525_6538)">
                    <path d="M13.7118 20.2137C11.8946 20.2137 10.3567 19.5843 9.098 18.3256C7.83931 17.0669 7.20996 15.529 7.20996 13.7118C7.20996 11.8946 7.83931 10.3567 9.098 9.098C10.3567 7.83931 11.8946 7.20996 13.7118 7.20996C15.529 7.20996 17.0669 7.83931 18.3256 9.098C19.5843 10.3567 20.2137 11.8946 20.2137 13.7118C20.2137 14.4454 20.097 15.1372 19.8636 15.7874C19.6302 16.4376 19.3134 17.0127 18.9133 17.5129L24.5149 23.1145C24.6983 23.2979 24.79 23.5313 24.79 23.8147C24.79 24.0981 24.6983 24.3315 24.5149 24.5149C24.3315 24.6983 24.0981 24.79 23.8147 24.79C23.5313 24.79 23.2979 24.6983 23.1145 24.5149L17.5129 18.9133C17.0127 19.3134 16.4376 19.6302 15.7874 19.8636C15.1372 20.097 14.4454 20.2137 13.7118 20.2137ZM13.7118 18.2131C14.9622 18.2131 16.025 17.7755 16.9002 16.9002C17.7755 16.025 18.2131 14.9622 18.2131 13.7118C18.2131 12.4615 17.7755 11.3987 16.9002 10.5234C16.025 9.64815 14.9622 9.21053 13.7118 9.21053C12.4615 9.21053 11.3987 9.64815 10.5234 10.5234C9.64815 11.3987 9.21053 12.4615 9.21053 13.7118C9.21053 14.9622 9.64815 16.025 10.5234 16.9002C11.3987 17.7755 12.4615 18.2131 13.7118 18.2131Z" fill="#2A3647"/>
                    </g>
                </svg> 
            </div>
        </div>
        <button class="btn-add-task-with-text" onclick="openAddNewTaskPopUp('to-do')">
            <span class="font-21px-700">Add task</span>
            <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.24854 8H1.24854C0.965202 8 0.727702 7.90417 0.536035 7.7125C0.344368 7.52083 0.248535 7.28333 0.248535 7C0.248535 6.71667 0.344368 6.47917 0.536035 6.2875C0.727702 6.09583 0.965202 6 1.24854 6H6.24854V1C6.24854 0.716667 6.34437 0.479167 6.53604 0.2875C6.7277 0.0958333 6.9652 0 7.24854 0C7.53187 0 7.76937 0.0958333 7.96104 0.2875C8.1527 0.479167 8.24854 0.716667 8.24854 1V6H13.2485C13.5319 6 13.7694 6.09583 13.961 6.2875C14.1527 6.47917 14.2485 6.71667 14.2485 7C14.2485 7.28333 14.1527 7.52083 13.961 7.7125C13.7694 7.90417 13.5319 8 13.2485 8H8.24854V13C8.24854 13.2833 8.1527 13.5208 7.96104 13.7125C7.76937 13.9042 7.53187 14 7.24854 14C6.9652 14 6.7277 13.9042 6.53604 13.7125C6.34437 13.5208 6.24854 13.2833 6.24854 13V8Z" fill="#FFFFFF"/>
            </svg>
        </button>
    </div>
  `
}
  

/**
 * HTML Template - for board header in mobile view
 * @returns HTML
 */
function boardHeaderMobileHTML() {
  return `
  <!-- Mobile -->
  <h1>Board</h1>
  <button class="btn-add-task-filled width-40px fl-jcc-aic" onclick="openAddNewTaskPopUp('to-do')">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 1.5V16.5" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
          <path d="M16.5 9.1416L1.5 9.1416" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
      </svg>    
  </button>
  <!-- SEARCHBAR -->
  <div class="board-searchbar-container">
      <input type="text" name="" id="board-searchbar" class="board-searchbar" placeholder="Find Task" autocomplete="off" onkeyup="searchTasks()">
      <div class="board-searchbar-container-inner-right">
          <div class="v-line-separator"></div>
          <svg class="icon-button" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0_81525_6538" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
              <rect width="32" height="32" fill="#D9D9D9"/>
              </mask>
              <g mask="url(#mask0_81525_6538)">
              <path d="M13.7118 20.2137C11.8946 20.2137 10.3567 19.5843 9.098 18.3256C7.83931 17.0669 7.20996 15.529 7.20996 13.7118C7.20996 11.8946 7.83931 10.3567 9.098 9.098C10.3567 7.83931 11.8946 7.20996 13.7118 7.20996C15.529 7.20996 17.0669 7.83931 18.3256 9.098C19.5843 10.3567 20.2137 11.8946 20.2137 13.7118C20.2137 14.4454 20.097 15.1372 19.8636 15.7874C19.6302 16.4376 19.3134 17.0127 18.9133 17.5129L24.5149 23.1145C24.6983 23.2979 24.79 23.5313 24.79 23.8147C24.79 24.0981 24.6983 24.3315 24.5149 24.5149C24.3315 24.6983 24.0981 24.79 23.8147 24.79C23.5313 24.79 23.2979 24.6983 23.1145 24.5149L17.5129 18.9133C17.0127 19.3134 16.4376 19.6302 15.7874 19.8636C15.1372 20.097 14.4454 20.2137 13.7118 20.2137ZM13.7118 18.2131C14.9622 18.2131 16.025 17.7755 16.9002 16.9002C17.7755 16.025 18.2131 14.9622 18.2131 13.7118C18.2131 12.4615 17.7755 11.3987 16.9002 10.5234C16.025 9.64815 14.9622 9.21053 13.7118 9.21053C12.4615 9.21053 11.3987 9.64815 10.5234 10.5234C9.64815 11.3987 9.21053 12.4615 9.21053 13.7118C9.21053 14.9622 9.64815 16.025 10.5234 16.9002C11.3987 17.7755 12.4615 18.2131 13.7118 18.2131Z" fill="#2A3647"/>
              </g>
          </svg> 
      </div>
  </div>
  `
}

/**
 * HTML Template - for Board Task
 * @param {JSON} taskJSON - JSON Element with the informations of the task
 * @returns HTML for Board Task
 */
function generateBoardTaskHTML(taskJSON) {
    return /*html*/ `
      <div id="task-${taskJSON['id']}-container" class="task-container" onclick="openPopup(${taskJSON['id']})" draggable="true" ondragstart="startDragging(${taskJSON['id']},event)" ondrag="drag(event)"  ondragend="dragEnd(event)"  ontouchstart="touchStart(${taskJSON['id']},event)" ontouchmove="touchDrag(event)" ontouchend="touchEnd(event)">
          <div class="task-category bc-${getCategoryColorOnBoard(taskJSON['category'])}">${taskJSON['category']}</div>
          <div class="task-text">
              <div class="task-title">${maskSpecialChars(taskJSON['title'])}</div>
              <div class="task-description">${maskSpecialChars(shortenString(taskJSON['description'],50))}</div>
          </div>
         ${generateBoardSubtasksHTML(taskJSON)}
          <div class="task-assignments-prio-container">
              <div class="task-assignments">
                  ${generateAssignedUserBadges(taskJSON)}
              </div>
              <div class="task-prio">
                  <img src="./assets/img/prio-${taskJSON['priority']}.svg" alt="prio-media-symbol">
              </div>
          </div>
      </div>
    `;
}



/**
 * HTML for the profile badges on board
 * @param {JSON} contact contact JSON
 * @param {number} i - counter for positioning
 * @returns HTML
 */
function profileBadgeForBoardHTML(contact,i) {
    return /*html*/`
    <div class="profile-badge bc-${contact['badge_color']}" style="left: -${(i * 8)}px">${contact['initials']}</div>`;
  }
  


/**
 * HTML for additional profile badge on board
 * @param {Array} assignedContacts - array of all assigned contacts
 * @param {number} i - counter for positioning
 * @returns HTML
 */
function additionalProfileBadgeForBoardHTML(assignedContacts,i) {
  return /*html*/`
  <div class="profile-badge" style="left: -${(i * 8)}px; background-color: #2A3647;">+${assignedContacts.length - 5}</div>`;
}



  /**
 * HTML Template - for Subtasks in Board-Task HTML
 * 
 * @param {number} subtasksDone - amount of all subtasks that are done
 * @param {number} procentualAmountDone - procentual amount of subtasks completed
 * @param {Array} subtasks - Array of all subtasks for the task
 * @returns HTML
 */
function boardSubtasksContainerHTML(subtasksDone,procentualAmountDone,subtasks) {
    return /*html*/`
        <div class="task-subtask-progress-container">
            <div class="subtask-progress-bar">
                <div class="subtask-progress-bar-fill" style="width: ${procentualAmountDone}%"></div>
            </div>
            <div class="subtask-progress-text">${subtasksDone}/${subtasks.length} Subtasks</div>
        </div>
    `;
}



/**
 * HTML Template - for no-task-container
 * 
 * @param {string} taskStateCategory - e.g. 'to-do'
 * @returns HTML for no-task-container
 */
function noTaskContainerHTML(taskStateCategory) {
    return /*html*/`
      <div class="no-task-container">
        <div>No tasks ${taskStateCategory}</div>
      </div>
    `;
}



/* ================== */
/* ===== POP UP ===== */
/* ================== */


/**
 * HTML Template - for the Task Popup
 * @param {object} task - current task
 * @param {number} taskID - current task ID
 * @returns HTML
 */
function generatePopupTaskContainerHTML(task,taskID) {
    return /*html*/`
        <div class="popup-task-container" onclick="stopPropagation(event)">
            <div class="popup-task-header">
                <div class="task-category bc-${task['category_color']}">${task['category']}</div>
                <button class="close-button icon-button" onclick="closePopup()">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="mask0_81722_982" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="4" y="4" width="24" height="24">
                        <rect x="4" y="4" width="24" height="24" fill="#D9D9D9"/>
                        </mask>
                        <g mask="url(#mask0_81722_982)">
                        <path d="M15.9998 17.3998L11.0998 22.2998C10.9165 22.4831 10.6831 22.5748 10.3998 22.5748C10.1165 22.5748 9.88314 22.4831 9.6998 22.2998C9.51647 22.1165 9.4248 21.8831 9.4248 21.5998C9.4248 21.3165 9.51647 21.0831 9.6998 20.8998L14.5998 15.9998L9.6998 11.0998C9.51647 10.9165 9.4248 10.6831 9.4248 10.3998C9.4248 10.1165 9.51647 9.88314 9.6998 9.6998C9.88314 9.51647 10.1165 9.4248 10.3998 9.4248C10.6831 9.4248 10.9165 9.51647 11.0998 9.6998L15.9998 14.5998L20.8998 9.6998C21.0831 9.51647 21.3165 9.4248 21.5998 9.4248C21.8831 9.4248 22.1165 9.51647 22.2998 9.6998C22.4831 9.88314 22.5748 10.1165 22.5748 10.3998C22.5748 10.6831 22.4831 10.9165 22.2998 11.0998L17.3998 15.9998L22.2998 20.8998C22.4831 21.0831 22.5748 21.3165 22.5748 21.5998C22.5748 21.8831 22.4831 22.1165 22.2998 22.2998C22.1165 22.4831 21.8831 22.5748 21.5998 22.5748C21.3165 22.5748 21.0831 22.4831 20.8998 22.2998L15.9998 17.3998Z" fill="#2A3647"/>
                        </g>
                    </svg>                            
                </button>
            </div>
            <div class="popup-task-main">
                <h2 id="popup-task-title" class="popup-task-title">${maskSpecialChars(task['title'])}</h2>
                <p id="popup-task-description" class="popup-task-description">${maskSpecialChars(task['description'])}</p>
                <div class="popup-task-info-container">
                    <div class="popup-task-info-title">Due Date:</div>
                    <div class="popup-task-info">${maskSpecialChars(task['due_date'])}</div>
                </div>
                <div id="popup-task-priority-container" class="popup-task-info-container">
                    <div class="popup-task-info-title">Priority:</div>
                    <div class="popup-task-info">
                        <div>${prioToText(`${task['priority']}`)}</div>
                        <img src="./assets/img/prio-${task['priority']}.svg" alt="prio-${task['priority']}">  
                    </div>
                </div>
                ${generatePopupAssignedToContainerHTML(task)}
                ${generatePopupSubtasksContainerHTML(task)}
            </div>
            <div class="popup-task-footer">
                <button id="popup-task-delete-button" class="btn-task-edit" onclick="deleteTask(${taskID})">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_81758_217" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                      <rect width="24" height="24" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_81758_217)">
                      <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z" fill="#2A3647"/>
                    </g>
                  </svg>
                    <div>Delete</div>
                </button>
                <div class="v-line-separator"></div>
                <button id="popup-task-edit-button" class="btn-task-edit" onclick="editTask(${taskID})">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_81758_502" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                      <rect width="24" height="24" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_81758_502)">
                      <path d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z" fill="#2A3647"/>
                    </g>
                  </svg>
                  <div>Edit</div>
                </button>
            </div>
        </div>
    `;
}


/**
 * HTML Template - for popup assigned to container
 * @param {object} task - current task
 * @returns HTML
 */
function generatePopupAssignedToContainerHTML(task) {
  let html = '';
  if (task['assigned_to'].length > 0) {
    html = /*html*/`
    <div id="popup-task-assigned-to-container" class="popup-task-info-container flex-column gap-8px overflow-hidden">
        <div class="popup-task-info-title">Assigned To:</div>
        <div class="popup-task-info popup-task-assigned-to-contacts">
            <ul class="contacts-list">
              ${generatePopupContactsHTML(task)}
            </ul>
        </div>
    </div>
    `
  };
  return html;
}
  

/**
 * Generates a list of all assigned contacts
 * @param {object} task - current task
 * @returns HTML
 */
function generatePopupContactsHTML(task) {
  let contactList = '';
  for (let i = 0; i < task['assigned_to'].length; i++) {
    let contact = contacts.find( contact => contact['id'] == task['assigned_to'][i]);
    if (contact != undefined) {
        if (contact['userid'] == currentUser['id']) {
            contactList = contactListItemHTML(contact) + contactList;
        } else {
            contactList += contactListItemHTML(contact);
        }
    }
  }
  return contactList;
}


/**
 * HTML Template - for contact list item
 * @param {object} contact - current contact
 * @returns HTML
 */
function contactListItemHTML(contact) {
    return /*html*/`
    <li class="contacts-list-item">
      <div class="profile-badge bc-${contact['badge_color']} width-40 border-2px">${maskSpecialChars(contact['initials'])}</div>
      <div class="contact-name">${maskSpecialChars(contact['name'])}</div>
      <div class="contact-user-state">${checkContactUserState(contact['userid'])}</div>
    </li>  
  `;
}



/**
 * HTML Template - for popup subtask container
 * @param {object} task - current task
 * @returns HTML
 */
function generatePopupSubtasksContainerHTML(task) {
  let html = '';
  if (task['subtasks'].length > 0) {
    html = /*html*/`
      <div class="popup-task-info-container flex-column gap-8px overflow-hidden">
        <div class="popup-task-info-title">Subtasks:</div>
        <div class="popup-task-info popup-task-subtasks">
            <ul class="subtasks-list">
                ${generatePopupSubtasksHTML(task)} 
            </ul>
        </div>
      </div>
    `;
  };
  return html;
}


/**
 * HTML Template - for subtask in popup
 * @param {object} task - current task
 * @returns HTML
 */
function generatePopupSubtasksHTML(task) {
  let html = '';
  let checkButtonsSRC = ['./assets/img/check_button_unchecked.svg','./assets/img/check_button_checked.svg']
  for (let i = 0; i < task['subtasks'].length; i++) {
    let done = task['subtasks'][i]['is_done'];
    html += /*html*/`
      <li class="subtasks-list-item" onclick="toggleSubtaskState(${task['id']},${i})">
          <img id="subtask-${i}-checkbutton" src="${checkButtonsSRC[+done]}" alt="checked-icon">
          <div>${maskSpecialChars(task['subtasks'][i]['description'])}</div>
      </li>          
    `;
  }
  return html;
}