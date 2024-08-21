/**
 * Event listener
 */
document.addEventListener("DOMContentLoaded", async function () {
  loadTasksFromRemoteStorage();
  updateDisplay();
  await getCurrentUser();
  displayTimeGreetingAndUser();
  addImageHoverEffects();
});

setTimeout(function () {
  const viewportWidth = window.innerWidth;
  if (viewportWidth <= 1000) {
    document.querySelector(".right-container").style.opacity = "0";
  }
}, 1000);

/**
 * Switches the current window to "board.html".
 */
function switchToBoard() {
  window.location.href = "board.html";
}

// This timeout variable global.
let resizeTimeout;

/**
 * Sets the opacity of the right-container based on the provided width.
 * @param {number} width
 */
function setOpacityBasedOnWidth(width) {
  const rightContainer = document.querySelector(".right-container");
  rightContainer.style.opacity = width <= 1000 ? "0" : "1";
}

/**
 * Checks the viewport width and decides the opacity setting for the right-container.
 */
function checkViewportWidth() {
  const viewportWidth = window.innerWidth;
  clearTimeout(resizeTimeout);

  resizeTimeout = setTimeout(
    () => {
      setOpacityBasedOnWidth(viewportWidth);
    },
    viewportWidth <= 1000 ? 1500 : 0
  );
}

/**
 * Updates the display based on window resizing.
 */
function updateDisplay() {
  checkViewportWidth();
  window.addEventListener("resize", checkViewportWidth);
}

/**
 * Displays the time greeting and the logged-in user's name.
 */
function displayTimeGreetingAndUser() {
  const currentTime = new Date();
  let greeting = getGreetingByHour(currentTime.getHours());

  const loggedInUser = localStorage.getItem("loggedInUser");
  if (true) {
    document.querySelector(".right-container p:nth-child(1)").textContent =
      greeting + ",";
    document.querySelector(".right-container p:nth-child(2)").textContent =
      currentUser.username;
  }
}

/**
 * Loads tasks from remote storage and updates the Page accordingly.
 * @async
 */
async function loadTasksFromRemoteStorage() {
  tasks = await get('tasks');
  updateTaskFromServer();
  nextDeadline();
}

/**
 * Updates task counts on the Page on data from the server.
 */
function updateTaskFromServer() {
  const taskCount = tasks.length;
  const toDoCount = tasks.filter((task) => task.status === "to-do").length;
  const progessCount = tasks.filter(
    (task) => task.status === "in-progress"
  ).length;
  const feedbackCount = tasks.filter(
    (task) => task.status === "await-feedback"
  ).length;
  const urgentCount = tasks.filter((task) => task.priority === 1).length;
  const doneCount = tasks.filter((task) => task.status === "done").length;

  document.querySelector("#taskInBoard h3").textContent = taskCount;
  document.querySelector("#toDo h3").textContent = toDoCount;
  document.querySelector("#taskInProgress h3").textContent = progessCount;
  document.querySelector("#awaitingfeedback h3").textContent = feedbackCount;
  document.querySelector("#urgent h3").textContent = urgentCount;
  document.querySelector("#done h3").textContent = doneCount;
}

/**
 * Displays the next deadline for urgent tasks.
 */
function nextDeadline() {
  const urgentTasks = tasks.filter((task) => task.priority === 1);

  if (urgentTasks.length === 0) {
    return;
  }

  urgentTasks.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));

  const nextDate = urgentTasks[0].due_date;

  const formatDate = new Date(nextDate).toLocaleDateString("en-EN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  document.querySelector("#deadLine p:nth-child(1) b").textContent = formatDate;
}

/**
 * Adds hover effects to images on the page.
 */
function addImageHoverEffects() {
  const toDoElement = document.getElementById("toDo");
  const doneElement = document.getElementById("done");

  toDoElement.addEventListener("mouseover", function () {
    this.querySelector("img").setAttribute("src", "assets/img/edit_hover.svg");
  });

  toDoElement.addEventListener("mouseout", function () {
    this.querySelector("img").setAttribute("src", "assets/img/pencil.png");
  });

  doneElement.addEventListener("mouseover", function () {
    this.querySelector("img").setAttribute("src", "assets/img/done_hover.svg");
  });

  doneElement.addEventListener("mouseout", function () {
    this.querySelector("img").setAttribute("src", "assets/img/done.png");
  });
}

/**
 * greeting based on the current hour.
 * @param {number} hour - The current hour of the day.
 * @returns {string} - Returns the appropriate greeting .
 */
function getGreetingByHour(hour) {
  if (hour >= 6 && hour < 12) {
    return "Good morning";
  } else if (hour >= 12 && hour < 18) {
    return "Good afternoon";
  } else if (hour >= 18 && hour < 23) {
    return "Good evening";
  } else {
    return "Hello";
  }
}
