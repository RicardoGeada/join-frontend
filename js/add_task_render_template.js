//-------------------------------------//
//------- HTML Render Templates -------//
//-------------------------------------//


/**
 * Generates HTML markup for a contact's initials badge.
 * @function
 * @param {number} index - The index of the contact in the sorted contact list.
 * @returns {string} The HTML markup for the contact's initials badge.
 */
function contactInitialsHTML(index) {
    return `<div class="profile-badge bc-${sortedContacts[index]['badge_color']} brd-white">${sortedContacts[index]['initials']}</div>`;
}


/**
 * Generates HTML markup for rendering a contact in the user interface.
 * @function
 * @param {number} index - The index of the contact in the sorted contact list.
 * @param {object} contact - The contact object to render.
 * @returns {string} The HTML markup for rendering the contact.
 */
function renderContactHTML(index, contact) {
    const contactClass = contact.userState === '(You)' ? 'currentContact' : '';

    return `
      <button type="button" id="contact${index}" class="singleContact option item brd-r10 ${contactClass}" onclick="addedContact(${index})">
        <div class="singleContactInitialName">
          <div class="font-white profile-badge bc-${contact['badge_color']} brd-white">${contact['initials']}</div>
          <div class="contact-text">
            <p class="contact-name" >${contact['name']}</p>
            <div class="contact-user-state" >${checkUserState(sortedContacts[index]['active_user'])}</div>
          </div>
        </div>
        <img id="check${index}" src="./assets/img/check_button_unchecked.svg">
      </button>`;
}


/**
 * Generates HTML markup for rendering a subtask in the user interface.
 * @function
 * @param {string} sub - The subtask content.
 * @param {number} index - The index of the subtask in the list.
 * @returns {string} The HTML markup for rendering the subtask.
 */
function renderSubHTML(sub, index) {
    return `<div id="listElement${index}" class="subListElement">
                <div class="subListInnerElement">
                    <img src="./assets/img/dot.png" alt="">
                    ${maskSpecialChars(sub)}
                </div>
                <div class="subListInnerElement">
                    <button type="button" class="icon-button" onclick="editSubElement(${index})">
                        <img class="item" src="./assets/img/edit_icon.svg">
                    </button>
                    <div class="subBorder"></div>
                    <button type="button" class="icon-button" onclick="deleteSub(${index})">
                        <img class="item" src="./assets/img/delete_icon.svg">
                    </button>
                </div>
            </div>
            <div id="editListElement${index}" class="editSub d-none">
                <input id="editSubTask${index}" type="text" onkeydown="enterKeyDownEditSub(event,${index})">
                <div class="editListElementButton">
                    <button type="button" class="icon-button" onclick="deleteSub(${index})">
                        <img class="item" src="./assets/img/delete_icon.svg">
                    </button>    
                    <div class="subBorder"></div>
                    <button type="button" class="icon-button" onclick="setNewSubValue(${index})">
                        <img  class="item" src="./assets/img/input_check.svg">
                    </button>
                </div>
            </div>`;
}