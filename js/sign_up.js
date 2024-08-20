/**
 * Navigates back to the login page.
 */
function backToLogin() {
  window.location.href = "index.html";
}

/**
 * Toggles the visibility of the password .
 * @param {string} fieldId
 * @param {string} [imgId]
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
 * Sets the password visibility to "off".
 * @param {string} fieldId
 * @param {string} imgId
 */
function setVisibilityOff(fieldId, imgId) {
  const imageElement = document.getElementById(imgId);
  imageElement.src = "./assets/img/visibility_off.svg";
}

/**
 * Displays password requirements for a short time.
 */
function showPasswordRequirements() {
  document.getElementById("passwordInfo").style.display = "block";

  setTimeout(function () {
    document.getElementById("passwordInfo").style.display = "none";
  }, 3000);
}


/**
 * Shows a popup for a field.
 * @param {HTMLElement} field
 */
function showFieldPopup(field) {
  const popup = document.createElement("div");
  popup.textContent = "Please fill out this field";
  popup.className = "field-popup";
  field.parentElement.appendChild(popup);

  setTimeout(() => {
    field.parentElement.removeChild(popup);
  }, 1500);
}

/**
 * values from the input fields.
 */
function getFormFields() {
  return {
    nameField: document.getElementById("nameField"),
    emailField: document.getElementById("emailField"),
    passwordField: document.getElementById("password"),
    passwordConfField: document.getElementById("passwordConf"),
    privacyCheckBox: document.getElementById("PrivacyCheckBox"),
  };
}

/**
 * Attaches event listeners to input fields.
 * @param {fields}
 */
function attachInputEventListeners(fields) {
  [
    fields.nameField,
    fields.emailField,
    fields.passwordField,
    fields.passwordConfField,
  ].forEach((field) => {
    field.addEventListener("input", function () {
      checkAndRemoveErrorClass(this);
    });
  });
}

/**
 * Validates field values.
 * @param {fields}
 * @returns {boolean}
 */
function areFieldsValid(fields) {
  if (
    !fields.nameField.value.trim() ||
    !fields.emailField.value.trim() ||
    !fields.passwordField.value.trim() ||
    !fields.passwordConfField.value.trim()
  ) {
    [
      fields.nameField,
      fields.emailField,
      fields.passwordField,
      fields.passwordConfField,
    ].forEach((field) => {
      if (!field.value.trim()) {
        field.closest(".elementbox").classList.add("elementbox-error");
        showFieldPopup(field);
      }
    });
    return false;
  }

  if (!fields.privacyCheckBox.checked) {
    showPrivacyPopup();
    return false;
  }

  if (fields.passwordField.value !== fields.passwordConfField.value) {
    showWrongPasswordPopup();
    return false;
  }

  return true;
}

/**
 * Registers the user.
 * @param {fields}
 */
async function register(fields) {
  const newUser = {
    username: fields.nameField.value,
    email: fields.emailField.value.toLowerCase(),
    password: fields.passwordField.value,
  };
  const response = await post('register', JSON.stringify(newUser));
  if (response.email && response.email.includes('custom user with this email already exists.')) {
    showEmailExistPopup();
  }
  if (response.email && response.email.includes('Enter a valid email address.')) {
    showInvalidEmailPopup()
  }
  if (response.message && response.message == 'User successfully registered') {
    showRegistrationSuccess();
  }
}

/**
 * Registers a user after checking field validity.
 */
async function registerUser() {
  const fields = getFormFields();

  attachInputEventListeners(fields);

  if (!areFieldsValid(fields)) return;

  await register(fields);

  return false;
}

/**
 * Checks and removes the error class if the field contains data.
 * @param {field}
 */
function checkAndRemoveErrorClass(field) {
  if (field.value.trim()) {
    field.closest(".elementbox").classList.remove("elementbox-error");
  }
}


/**
 * Validates whether the given email contains an "@" character.
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  return email.includes("@");
}


/**
 * Validates if the password meets requirements.
 * @returns {boolean}
 */
function validatePasswordRequirements() {
  const passwordField = document.getElementById("password");
  const password = passwordField.value;

  if (!password.trim()) return;

  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  if (!regex.test(password)) {
    document.getElementById("passwordNotSecure").style.display = "flex";
    return false;
  }
  return true;
}

/**
 * Validates if two passwords match.
 */
function checkPasswordsMatch() {
  const passwordField = document.getElementById("password");
  const passwordConfField = document.getElementById("passwordConf");

  const password = passwordField.value;
  const passwordConf = passwordConfField.value;

  if (password.trim() && passwordConf.trim() && password !== passwordConf) {
    showWrongPasswordPopup();
  }
}

function closeWrongPassword() {
  document.getElementById("errorPassword").style.display = "none";
}

function showWrongPasswordPopup() {
  document.getElementById("errorPassword").style.display = "flex";
}

function closePasswordNotSecurePopup() {
  document.getElementById("passwordNotSecure").style.display = "none";
}

function showInvalidEmailPopup() {
  document.getElementById("invalidEmailPopup").style.display = "flex";
}

function closeInvalidEmailPopup() {
  document.getElementById("invalidEmailPopup").style.display = "none";
}

function closeEmailExist() {
  document.getElementById("errorEmailExists").style.display = "none";
  document.getElementById("emailField").value = "";
}

function showEmailExistPopup() {
  document.getElementById("errorEmailExists").style.display = "flex";
}

function closePrivacyAlert() {
  document.getElementById("errorPrivacy").style.display = "none";
}

function showPrivacyPopup() {
  document.getElementById("errorPrivacy").style.display = "flex";
}

function showRegistrationSuccess() {
  document.getElementById("successRegistration").style.display = "flex";

  startCountdown(3);
}

/**
 * Starts a countdown after registration.
 * @param {number}
 */
function startCountdown(seconds) {
  let counter = seconds;
  const countdownElement = document.getElementById("countdown");

  const timer = setInterval(function () {
    countdownElement.textContent = counter;
    counter--;

    if (counter < 0) {
      clearInterval(timer);
      window.location.href = "index.html";
    }
  }, 1000);
}
