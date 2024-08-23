/**
 * Opens the registration page in a new window.
 */
function openSignUpInNewWindow() {
  window.location.href = "sign_up.html";
}

/**
 * Toggles the visibility of the password.
 * @param {string} fieldId - The ID of the password input field.
 * @param {string} imgId - The ID of the image element.
 */
function togglePasswordVisibility(fieldId, imgId) {
  const passwordField = document.getElementById(fieldId);

  if (passwordField.type === "password") {
    passwordField.type = "text";
    if (imgId) {
      const imageElement = document.getElementById(imgId);
      imageElement.src = "./assets/img/visibility.svg";
    }
  } else {
    passwordField.type = "password";
    if (imgId) {
      const imageElement = document.getElementById(imgId);
      imageElement.src = "./assets/img/visibility_off.svg";
    }
  }
}

/**
 * Sets the visibility of the password to hidden.
 * @param {string} fieldId - The ID of the password input field.
 * @param {string} imgId - The ID of the image element.
 */
function setVisibilityOff(fieldId, imgId) {
  const imageElement = document.getElementById(imgId);
  imageElement.src = "./assets/img/visibility_off.svg";
}

/**
 * Displays the password requirements in a popup.
 */
function showPasswordRequirements() {
  document.getElementById("passwordInfo").style.display = "block";

  setTimeout(function () {
    document.getElementById("passwordInfo").style.display = "none";
  }, 3000);
}


/**
 * Saves login details if the checkbox is activated.
 * @param {string} email - The user's email.
 */
function saveLoginDetails(email) {
  localStorage.setItem("rememberEmail", email);
}

/**
 * Retrieves the login form elements from the DOM.*/
function getLoginElements() {
  const emailField = document.getElementById("emailLogin");
  const passwordField = document.getElementById("passwordLogin");
  const rememberMeCheckbox = document.getElementById("rememberBox");
  
  return { emailField, passwordField, rememberMeCheckbox };
}


/**
 * Handles the login process.
 * @returns {void}
 */
async function login() {
  const { emailField, passwordField, rememberMeCheckbox } = getLoginElements();

  clearErrorClasses(emailField, passwordField);

  if (isInputEmpty(emailField, passwordField)) {
    return;
  }

  body = {
    email: emailField.value,
    password: passwordField.value
  }
  
  const response = await postAPI('login',JSON.stringify(body))
  console.log(response)
  if (response.email && response.email == emailField.value && response.token) {
    user = response;
    user.password = body.password;
    handleSuccessfulLogin(rememberMeCheckbox, user);
  } else {
    displayLoginError();
  }
}
/**
  * Displays an error message when an error occurs during login.
 * @returns {void}
 */
function handleLoginError() {
  alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.");
}

/**
 * Handles a successful login and performs the appropriate actions.
 * @param {HTMLElement} rememberMeCheckbox 
 * @param {Object} user 
 * @param {string} user.email 
 */
function handleSuccessfulLogin(rememberMeCheckbox, user) {
  localStorage.setItem('token', user.token);
  handleRememberMe(rememberMeCheckbox, user.email, user.password);
  setLoggedInUser(user);
  navigateToSummary();
}

/**
 * Removes error styling from the email and password fields.
 * @param {HTMLElement}
 * @param {HTMLElement}
 */
function clearErrorClasses(emailField, passwordField) {
  emailField.closest(".elementbox").classList.remove("elementbox-error");
  passwordField.closest(".elementbox").classList.remove("elementbox-error");
}

/**
 * Checks if either the email or password fields are empty.
 * @param {HTMLElement}
 * @returns {boolean}
 */
function isInputEmpty(emailField, passwordField) {
  let error = false;

  if (!passwordField.value.trim()) {
    markInputAsError(passwordField);
    error = true;
  }

  if (!emailField.value.trim()) {
    markInputAsError(emailField);
    error = true;
  }

  return error;
}

/**
 * Marks the given input field as containing an error.
 * @param {HTMLElement} inputField
 */
function markInputAsError(inputField) {
  inputField.closest(".elementbox").classList.add("elementbox-error");
  inputField.reportValidity();
}

/**
 * Fetches user data from storage.
 * @returns {Array}
 */
async function loadUsersData() {
  let usersData = await getItem("users");
  let users;

  try {
    users = JSON.parse(usersData);
  } catch (error) {
    return null;
  }

  return users;
}


/**
 * Handles the remember me functionality based on the state of a checkbox.
 * @param {string} email
 * @param {string} password
 */
function handleRememberMe(checkbox, email, password) {
  if (checkbox.checked) {
    localStorage.setItem("rememberEmail", email);
    localStorage.setItem("rememberPassword", password);
  } else {
    localStorage.removeItem("rememberEmail");
    localStorage.removeItem("rememberPassword");
  }
}

/**
 * Sets the logged in user's data to local storage.
 * @param {Object} user
 */
function setLoggedInUser(user) {
  // localStorage.setItem("loggedInUser", user.name);
  localStorage.setItem("loggedInUserID", user.id);
}

function navigateToSummary() {
  window.location.href = "summary.html";
}

function displayLoginError() {
  document.getElementById("errorReport").style.display = "flex";
}

/**
 * Removes login details from storage if the checkbox is unchecked.
 */
function clearLoginDetailsFromStorage() {
  localStorage.removeItem("rememberEmail");
}

/**
 * Autofills the login details if saved.
 */
function autofillLoginDetails() {
  const emailField = document.getElementById("emailLogin");
  const passwordField = document.getElementById("passwordLogin");
  const rememberMeCheckbox = document.getElementById("rememberBox");

  const storedEmail = localStorage.getItem("rememberEmail");
  const storedPassword = localStorage.getItem("rememberPassword");

  if (storedEmail) {
    emailField.value = storedEmail;
    rememberMeCheckbox.checked = true;
  }

  if (storedPassword) {
    passwordField.value = storedPassword;
  }
}

/**
 * Closes the popup for incorrect logins.
 */
function closeWrongLogin() {
  document.getElementById("errorReport").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  // Autofill login details
  autofillLoginDetails();

  // Add keydown event listeners for email and password fields
  document
    .getElementById("emailLogin")
    .addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        login();
        event.preventDefault();
      }
    });

  document
    .getElementById("passwordLogin")
    .addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        login();
        event.preventDefault();
      }
    });
});

/**
 * Logs in a guest user.
 * @returns {void}
 */
function guestLogin() {
  const guestUser = {
    id: -2,
    name: "Guest",
    initials: "G",
    badgeColor: 1,
  };

  users.push(guestUser);

  localStorage.setItem("loggedInUser", guestUser.name);
  localStorage.setItem("loggedInUserID", guestUser.id);
  window.location.href = "summary.html";
}
/**
 * Logs out guest users.
 * @returns {void}
 */
function guestLogout() {
  users = users.filter((user) => user.id !== -2);

  userLogout();
}


