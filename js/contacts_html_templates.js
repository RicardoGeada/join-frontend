/**
 * Helper function: To render the heading for the new letter.
 *
 * @param {string} letter - The new letter.
 * @returns - Returns the HTML text.
 */
function renderLetterbox(letter = "No Contacts") {
  return `
          <div class="contact-letterbox">
              <span class="contact-letter">${letter}</span>
          </div>
          <div class="contact-hr"></div>
      `;
}

/**
 * Compiles the HTML code for a contact's list entry.
 *
 * @param {number} i - i = index number in the sorted contact list.
 * @param {number} isUser - The additional text from the function isCurrentUserInfo
 * @returns - Returns HTML code to render.
 */
function renderListEntry(i, isUser = "") {
  return `
          <div id="contact-listbox-${sortedContacts[i].id}" class="contact-listbox" onclick="openContact(${sortedContacts[i].id})">
              <div class="contact-listbox-badgebox">
                  <div class="contact-listbox-badge">
                      <div class="contact-listbox-badge-circle bg-contact-${sortedContacts[i]["badge_color"]}">
                          <span class="contact-listbox-badge-text">${sortedContacts[i].initials}</span>
                      </div>
                  </div>
              </div>
              <div class="contact-listbox-namebox">
                  <span class="contact-listbox-name">${sortedContacts[i].name}${isUser}</span>
                  <span class="contact-listbox-mail">${sortedContacts[i].email}</span>
              </div>
          </div>
      `;
}

/**
 * Created HTML code for the edit button.
 *
 * @param {number} id - Id for contact.
 * @returns - Returns the created HTML code.
 */
function renderOptionEdit(id) {
  return `
          <div class="options-row" onclick="openEditCon(${id})">
              <div class="options-imgbox">
                  <img class="options-img" src="./assets/img/edit_icon.svg">
              </div>
              <span>Edit</span>
          </div>
      `;
}

/**
 * Created HTML code for the delete button.
 *
 * @param {number} id - Id for contact.
 * @returns - Returns the created HTML code.
 */
function renderOptionDelete(id) {
  return `
          <div class="options-row" onclick="deleteContact(${id})">
              <div class="options-imgbox">
                  <img class="options-img" src="./assets/img/delete_icon.svg">
              </div>
              <span>Delete</span>
          </div>
      `;
}
