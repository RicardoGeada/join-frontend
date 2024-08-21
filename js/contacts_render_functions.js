// ############################################################
// ----- Render-Funktionen für Contacts im Allgemeinen --------
// ############################################################
/**
 * Renders the collection of contacts.
 */
function renderContacts() {
    let newContent = "", firstLetter = "";
    for (let i = 0; i < sortedContacts.length; i++) {
        let isUser = isCurrentUserInfo(sortedContacts[i].active_user);
        let answer = nextLetter(sortedContacts[i].initials[0], firstLetter);
        firstLetter = answer[1];
        newContent += answer[0];
        newContent += renderListEntry(i, isUser);
    }
    if (newContent == "") {
        newContent += renderLetterbox();
    }
    document.getElementById("contact-list").innerHTML = newContent;
}


/**
 * Gets the additional text for users.
 * 
 * @param {number} userId - Id for user
 * @returns - Returns the additional text.
 */
function isCurrentUserInfo(userId) {
    if (userId === loggedInUserID) {
        return " (You)";
    } else if (userId) {
        return " (User)";
    } else {
        return "";
    }
}


/**
 * Helper function: Checks the current user via the user ID.
 * 
 * @param {number} userId - Id for user
 * @returns - True or false.
 */
function isCurrentUser(userId) {
    return userId === loggedInUserID;
}


/**
 * Checks the change of the next letter for the contacts listing.
 * 
 * @param {string} currentLetter - First letter of the current contact's initials.
 * @param {string} firstLetter - Current letter of the sorted collection.
 * @returns - Returns the new heading if the letter has changed.
 */
function nextLetter(currentLetter, firstLetter) {
    let newContent = "";
    if (currentLetter != firstLetter) {
        firstLetter = currentLetter;
        newContent += renderLetterbox(currentLetter);
    }
    return [newContent, firstLetter];
}


// ############################################################
/**
 * Renders the detailed view of a contact.
 * 
 * @param {number} id - Id for contact.
 */
function renderSingleView(id) {
    let index = idToIndex(id, sortedContacts);
    let isUser = isCurrentUserInfo(sortedContacts[index].active_user);
    document.getElementById("contact-single-info-badge-text").innerHTML = sortedContacts[index].initials;
    document.getElementById("contact-single-info-name-text").innerHTML = sortedContacts[index].name + isUser;
    document.getElementById("contact-single-info-email-text").innerHTML = sortedContacts[index].email;
    document.getElementById("contact-single-info-phone-text").innerHTML = sortedContacts[index].phone;
    document.getElementById("contact-single-info-badge-circle").className = `contact-single-info-badge-circle bg-contact-${sortedContacts[index]["badge-color"]}`;
    document.getElementById("options").innerHTML = renderOptions(id);
    document.getElementById("contact-single-info-options").innerHTML = renderOptions(id);
    isOptionsView(id, index);
}


// ############################################################
/**
 * Checks contact for user and removes options in mobile view if it is not the current user.
 * 
 * @param {number} id - Id for contact.
 * @param {number} index - Index of the current contact in the sorted contact list.
 */
function isOptionsView(id, index) {
    if(isCurrentUserInfo(sortedContacts[index].active_user) != " (User)") {
        document.getElementById('contact-btn-option-box').classList.remove('d-none');
        renderPopupEdit(id);
    } else {
        document.getElementById('contact-btn-option-box').classList.add('d-none');
    }
}


/**
 * Checks contact for user and removes options in desktop view if it is not the current user.
 * 
 * @param {number} id - Id for contact.
 * @returns - Returns the created HTML code.
 */
function renderOptions(id) {
    let content = "";
    if(isCurrentUserInfo(sortedContacts[idToIndex(id, sortedContacts)].active_user) != " (User)") {
        content += renderOptionEdit(id);
        content += renderOptionDelete(id);
    }
    return content;
}


// ############################################################
/**
 * Fills input fields from the edit form with saved data.
 * 
 * @param {number} id - Id for contact.
 */
function renderPopupEdit(id) {
    let index = idToIndex(id, sortedContacts);
    document.getElementById("popup-person-imgbox").className = `popup-person-imgbox bg-contact-${sortedContacts[index]["badge-color"]}`;
    document.getElementById("popup-person-imgbox-text").innerHTML = sortedContacts[index].initials;
    document.getElementById("editconid").value = sortedContacts[index].id;
    document.getElementById("editconname").value = sortedContacts[index].name;
    document.getElementById("editconemail").value = sortedContacts[index].email;
    document.getElementById("editconphone").value = sortedContacts[index].phone;
    document.getElementById("popup-editcon-btn-delete").innerHTML = `
        <button onclick='deleteContact(${id})' type="button" class="btn light">Delete</button>
    `;
}
