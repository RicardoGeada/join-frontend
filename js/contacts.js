// ############################################################
// ----- Funktionen zum öffnen/schließen der Views ------------
// ############################################################
/**
 * This function shows the popup for adding new contacts
 */
function openAddCon() {
  useroptions(true);
  document.getElementById("popup-addcon").classList.add("inview");
}

/**
 * This function shows the popup for changing new contacts
 */
function openEditCon() {
  useroptions(true);
  document.getElementById("popup-editcon").classList.toggle("inview");
}

/**
 * This function shows the details of contacts
 *
 * @param {number} id - The id of the connected contact
 */
function openContact(id) {
  renderSingleView(id);
  document.getElementById("contact-single").classList.remove("d-none");
  unselectContacts();
  selectContacts(id);
}

/**
 * Help function to remove selection
 */
function unselectContacts() {
  useroptions(true);
  let obj = document.getElementsByClassName("contact-listbox");
  for (let i = 0; i < obj.length; i++) {
    obj[i].classList.remove("select");
  }
}

/**
 * Help function to add selection
 *
 * @param {number} id - The id of the selected contact
 */
function selectContacts(id) {
  useroptions(true);
  document.getElementById(`contact-listbox-${id}`).classList.add("select");
}

/**
 * This function hide the details of contacts
 */
function closeContact() {
  document.getElementById("contact-single").classList.add("d-none");
  unselectContacts();
}

/**
 * Search the id in Array and returns index
 *
 * @param {number} id - field in Array
 * @param {Array} arr - Array with contacts or users
 * @returns - index in Array
 */
function idToIndex(id, arr = contacts) {
  return arr.findIndex(function (item, i) {
    return item.id === id;
  });
}

/**
 * Initializes required data
 */
async function initContacts() {
  await userAndContacts();
  sortedContacts = sortMyList(contacts);
  let comeFrom = document.location.pathname;
  if (comeFrom.includes("contacts.html")) {
    renderContacts();
  }
}

function cLog(text, value) {
  console.log(text);
  console.log(value);
}

// ############################################################
/**
 * Is called from the form for creating a contact. If the user is a guest, a message box will be displayed.
 * Otherwise the new contact will be added to the contact list.
 */
async function saveNewContact() {
  if (loggedInUserID == -2) {
    msgBox();
  } else {
    let newDataSet = readNewInputs();
    clearAddPopup();
    let response = await post("contacts", JSON.stringify(newDataSet));
    isSavedNewContact(response.email == newDataSet.email);
  }
}

/**
 * Checks the response from saveNewContact(). If saving failed, a message box will be displayed.
 * If the save was successful, a copy of the contact list is sorted, the rendering of the contacts is started and the popup is closed.
 *
 * @param {boolean} answer - Indication of whether saving the new contact was successful.
 */
async function isSavedNewContact(answer) {
  if (answer) {
    contacts = await get('contacts');
    sortedContacts = sortContacts(contacts);
    renderContacts();
    document.getElementById("contactsuccess").classList.add("shortpopup");
    setTimeout(() => {
      document.getElementById("contactsuccess").classList.remove("shortpopup");
    }, "900");
  } else {
    msgBox("Contact was not saved.");
  }
}

/**
 * Gets data from the fields for the new contact and returns it as an array with Json object.
 *
 * @returns Array with Json object.
 */
function readNewInputs() {
  return {
    name: document.getElementById("addconname").value,
    email: document.getElementById("addconemail").value,
    phone: document.getElementById("addconphone").value,
  };
}

/**
 * Generates a random number from 0 to 14 for the color of the badge
 *
 * @returns Number 0 to 14
 */
function randomBadgeColor() {
  return Math.floor(Math.random() * 15);
}

/**
 * Deletes the input fields from the new contact popup
 */
function clearAddPopup() {
  document.getElementById("popup-addcon").classList.remove("inview");
  document.getElementById("addconname").value = "";
  document.getElementById("addconemail").value = "";
  document.getElementById("addconphone").value = "";
}

// ############################################################
/**
 * Called by the editcontact form. Accesses the functions for changing contact details.
 */
async function saveEditContact() {
  let id = +document.getElementById("editconid").value;
  let updateData =  getUpdateData();
  let response = await update(`contacts/${id}`, JSON.stringify(updateData));
//   if (response.active_user == loggedInUserID) updateLocalStorage(response.email);
  contacts = await get('contacts');
  sortedContacts = sortContacts(contacts);
  renderSaveEditContact(id);
}

/**
 * Return new contact data.
 */
function getUpdateData() {
    return {
        name: document.getElementById("editconname").value,
        email: document.getElementById("editconemail").value,
        phone: document.getElementById("editconphone").value,
    };
}


/**
 * Updated contact details can also be changed in LocalStorage for the logged in user.
 *
 * @param {*} newEmail - The new email.
 */
function updateLocalStorage(newEmail) {
  if (localStorage.getItem("rememberEmail")) {
    localStorage.setItem("rememberEmail", newEmail);
  }
}

/**
 * After changing contact information, re-render all areas for it.
 *
 * @param {number} id - Id of the selected contact.
 */
function renderSaveEditContact(id) {
  renderHeaderUserName();
  renderContacts();
  renderSingleView(id);
  openEditCon();
}

// ############################################################
/**
 * Start delete a contact
 *
 * @param {number} id The id from user in Database
 */
async function deleteContact(id) {
  let index = idToIndex(id, contacts);
  let userId = contacts[index].active_user;
  if (isNotAUser || currentUser.name == "Guest") {
    msgBox();
    closeContact();
    document.getElementById("popup-editcon").classList.remove("inview");
  } else if (isCurrentUser(userId)) {
    msgBox("Your account will be deleted.");
    await deleteAPI(`contacts/${id}`);
    localStorage.removeItem("rememberPassword");
    localStorage.removeItem("rememberEmail");
    setTimeout(() => userLogout(), 1000);
    
  } else {
    deleteNow(id);
  }
}

/**
 * Deletes contact from tasks, from users and from contacts
 *
 * @param {*} id - id-field in contacts
 * @param {*} index - the index in array
 * @param {*} userId - id-field in users
 */
async function deleteNow(id) {
  let response = await deleteAPI(`contacts/${id}`);
  contacts = await get('contacts');
  sortedContacts = sortContacts(contacts);
  renderContacts();
  closeContact();
  document.getElementById("popup-editcon").classList.remove("inview");
}


// ############################################################
/**
 * Helper function: Sorts an array of Json objects alphabetically by the initials of the contacts.
 *
 * @param {Array} arr - The array to sort.
 * @returns - Returns a sorted copy.
 */
function sortContacts(arr) {
  let targetArr = [...arr];
  targetArr.sort((c1, c2) =>
    c1.initials < c2.initials ? -1 : c1.initials > c2.initials ? 1 : 0
  );
  return targetArr;
}

/**
 *  Helper function: Sorts an array upwards by id.
 *
 * @param {Array} arr - The array to sort.
 * @returns - Returns a sorted copy.
 */
function sortIds(arr) {
  let targetArr = [...arr];
  targetArr.sort((c1, c2) => (c1.id < c2.id ? -1 : c1.id > c2.id ? 1 : 0));
  return targetArr;
}

/**
 * Opens a subpage.
 */
function openMore() {
  window.location.href = "admin.html";
}
