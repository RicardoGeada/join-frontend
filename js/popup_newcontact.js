let editPopupOpen = false;

/**
 * This function shows the popup for adding new contacts 
 */
function openAddCon() {
    document.getElementById('popup-addcon').classList.add('inview');
}


/**
 * Returns two letters from a String. If String contains a word, two letters of that word are returned.
 * If String contains two words, one letter from each of the first two words is returned. 
 * 
 * @param {string} string - from a name-field
 * @returns - two letters
 */
function initialsFrom(string) {
    let wordlist = string.split(" ");
    let words = wordlist.length;
    let result = '--';
    if(words == 1) {
        result = wordlist[0][0];
        result += (wordlist[0].length > 1) ? wordlist[0][1] : '-';
    } else if(words > 1) {
        result = wordlist[0][0] + wordlist[1][0];
    }
    return result.toUpperCase();
}


/**
 * Is called from the form for creating a contact. If the user is a guest, a message box will be displayed. 
 * Otherwise the new contact will be added to the contact list.
 */
async function saveNewContact() {
    if(loggedInUserID == -2) {
        msgBox();
    } else {
        let newDataSet = readNewInputs();
        clearAddPopup();
        let response = await postAPI("contacts", JSON.stringify(newDataSet));
        reloadContacts();
        if (editPopupOpen) {
            loadContactsWithAddedContact(currentTask['id']);
        }
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
    if(answer) {
        sortedContacts = sortContacts(contacts);
        document.getElementById("contactsuccess").classList.add("shortpopup");
        setTimeout(() => {
            document.getElementById("contactsuccess").classList.remove("shortpopup");
        }, "900");
    } else {
        msgBox('Contact was not saved.');
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
    document.getElementById('popup-addcon').classList.remove('inview');
    document.getElementById('addconname').value = '';
    document.getElementById('addconemail').value = '';
    document.getElementById('addconphone').value = '';
}

/**
 * Helper function: Sorts an array of Json objects alphabetically by the initials of the contacts.
 * 
 * @param {Array} arr - The array to sort.
 * @returns - Returns a sorted copy.
 */
function sortContacts(arr) {
    let targetArr = [...arr];
    targetArr.sort((c1, c2) => (c1.initials < c2.initials ? -1 : c1.initials > c2.initials ? 1 : 0));
    return targetArr;
}

