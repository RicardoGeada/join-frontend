let currentDraggedElement;
let dropIndicationExists = false;
let dragStartSection; 
let currentDraggedOverContainer= '';
let touchDragging = false;
let dragScrollEnabled = false;

// LONG TOUCH Variables
let onlongtouch = false;
let timer = false;
let duration = 1000;


let isScrolling = false;

setInterval(dragScroll, 25); 


/* ============================= */
/* ===== DRAG & DROP MOUSE ===== */
/* ============================= */

/**
 * function called ondragstart of task-container Element
 * - sets currentDraggedElement
 * - creates dragable Clone
 * 
 * @param {number} id - current task-container id
 * @param {event} ev 
 */
function startDragging(id,ev) {
    let task = document.getElementById(`task-${id}-container`);
    task.classList.add('grabbed-task'); // indicate grabbed element
    currentDraggedElement = id;
    dragStartSection = getDraggedOverZone(ev);
    dragScrollEnabled = true; // for dragScroll
    createVisibleTaskClone(ev,task);  
}


/**
 * create a visible copy of the task to move and follow the cursor
 * 
 * @param {event} event - touch or drag event
 * @param {Element} task - the task we try to drag
 */
function createVisibleTaskClone(event,task) {
    let visibleTaskClone = task.cloneNode(true);
    let touchEvent = (event.type == 'touchstart' || event.type == 'touchmove' || event.type == 'touchend');
    let pageX = touchEvent ? event.touches[0].pageX : event.pageX;
    let pageY = touchEvent ? event.touches[0].pageY : event.pageY;
    let offsetX = touchEvent ? (pageX - event.target.getBoundingClientRect().left) : event.offsetX;
    let offsetY = touchEvent ? (pageY - event.target.getBoundingClientRect().top) : event.offsetY;
    visibleTaskClone.id = 'visibleTaskClone';
    visibleTaskClone.style = `
      pointer-events: none;
      touch-action: none;
      opacity: 0;
      position: absolute;
      left:  ${pageX - offsetX};
      top:  ${pageY - offsetY};
      transform: translate(-${offsetX}px,-${offsetY}px);
      box-sizing: border-box;
    `;
    document.body.appendChild(visibleTaskClone);
    if (!touchEvent) {
        event.dataTransfer.setDragImage(visibleTaskClone, offsetX, offsetY);
    }
}


/**
 * function called ondragover task-section
 * - cancel the dafault action of a div for ondragenter and ondragover to allow ondrop
 * 
 * @param {event} event 
 */
function allowDrop(event) {
  event.preventDefault();
}


/**
 * function called ondrop over task-section
 * - change status of the current task
 * - render all tasks to update view
 * 
 * @param {string} taskStateCategory e.g. 'to-do', 'done' ...
 */
async function moveTo(taskStateCategory) {
  let index = tasks.findIndex(task => task['id'] == currentDraggedElement);
  let task = tasks[index];
  task['status'] = taskStateCategory;
  tasks.push(tasks.splice(index,1)[0]); //move task to the last position in the array
  if (currentUser['id'] == -2) {
    msgBox("Your changes won't be saved.<br> Please register and log in.")
  } else {
    await update(`tasks/${task.id}`, JSON.stringify(task))
  }
  renderAllTasks();
}


/**
 * function called ondrag of task-container
 * - let the visible clone follow the cursor
 * 
 * @param {event} event 
 */
function drag(event) {
  let visibleTaskClone = document.getElementById('visibleTaskClone');
  if (visibleTaskClone) {
    visibleTaskClone.style.opacity = 1;
    visibleTaskClone.style.left = event.pageX + 'px';
    visibleTaskClone.style.top = event.pageY + 'px';
    if (event.pageX == 0 || event.pageY == 0) { // if mouse is outside the page => hide the element
      visibleTaskClone.style.opacity = 0;
    }
  }
  toggleDropIndication(event);
}


/**
 * function called ondragend of task-container
 * - removes the visible clone
 */
function dragEnd() {
  let visibleTaskClone = document.getElementById('visibleTaskClone');
  let indication = document.getElementById('task-container-indication');
  let grabbedTask = document.getElementsByClassName('grabbed-task')[0];
  visibleTaskClone.remove();
  if (indication) {
    indication.remove();
  }
  if (grabbedTask) {
    grabbedTask.classList.remove('grabbed-task');
  }
  dragScrollEnabled = false;
}


/**
 * show and hide task indication
 * 
 * @param {event} event 
 */
function toggleDropIndication(event) {
  // check if touch is in dragzone
  let draggedOverSection = getDraggedOverZone(event);
  draggedOverSection += '-tasks-container';
  // if there is no dashed container => create one and hide the empty box
  if (!dropIndicationExists && currentDraggedOverContainer != draggedOverSection && draggedOverSection != '') {
    createTaskDropIndication(draggedOverSection);
    currentDraggedOverContainer = draggedOverSection;
  } else if (dropIndicationExists && currentDraggedOverContainer != draggedOverSection) {
    removeTaskDropIndication(currentDraggedOverContainer);
  };
}


/**
 * add html for to indicate task drop
 * 
 * @param {string} id - of the section tasks container e.g. 'section-to-do-tasks-container'
 */
function createTaskDropIndication(id) {
  let tasksContainer = document.getElementById(id);
  let height = document.getElementById('visibleTaskClone').offsetHeight;
  hideNoTaskContainer(id);
  if (!dropIndicationExists) {
    tasksContainer.innerHTML += /*html*/`
      <div id="task-container-indication" style="min-height: ${height}px;"></div> 
    `;
    dropIndicationExists = true;
  }
}


/**
 * remove html for task drop indication
 * 
 * @param {string} id - of the section tasks container e.g. 'section-to-do-tasks-container'
 */
function removeTaskDropIndication(id) {
  dropIndicationExists = false;
  let dashedContainer = document.getElementById('task-container-indication');
  if (dashedContainer) {
    dashedContainer.remove();
  };
  showNoTaskContainer(id);
}


/**
 * add display: none to no-task-container
 * 
 * @param {string} id - of the section tasks container e.g. 'section-to-do-tasks-container'
 */
function hideNoTaskContainer(id) {
  let tasksContainer = document.getElementById(id);
  let notaskContainer = tasksContainer.getElementsByClassName('no-task-container')[0];
  if (notaskContainer) {
    notaskContainer.classList.add('d-none');
  }
}


/**
 * remove display: none from no-task-container
 * 
 * @param {string} id - of the section tasks container e.g. 'section-to-do-tasks-container'
 */
function showNoTaskContainer(id) {
  let tasksContainer = document.getElementById(id);
  let notaskContainer = tasksContainer.getElementsByClassName('no-task-container')[0];
  if (notaskContainer) {
    notaskContainer.classList.remove('d-none');
  }
}


/* ============================= */
/* ===== DRAG & DROP TOUCH ===== */
/* ============================= */


// LONG TOUCH

/**
 * touchstart for touchdrag
 * - startDragging only after the duration (long touch)
 * 
 * @param {number} id - current task-container id
 * @param {event} event - touchstart event
 */
function touchStart(id,event){
  if (!timer) {
    timer = setTimeout(function() {
      onlongtouch = true;
      if (!isScrolling) {
        startDragging(id,event);
      }
    }, duration);
  }
}


/**
 * touchend for touchdrag
 * - reset timer and longtouch state
 * 
 * @param {event} event - touchevent
 */
function touchEnd(event){
  if (timer) {
    clearTimeout(timer)
    timer = false;
    if (onlongtouch) {
      touchDrop(event);
    }
    onlongtouch = false;
  }
}


/**
 * function called ontouchmove of task-container
 * - let the visible clone follow the cursor
 * 
 * @param {event} event - touchmove
 */
function touchDrag(event) {
  if (onlongtouch && !isScrolling) {
    let visibleTaskClone = document.getElementById('visibleTaskClone');
    touchDragging = true;
    if (event.cancelable) {
      event.preventDefault(); // prevent touch scrolling while holding the element
      event.stopPropagation();
    }
    if (visibleTaskClone) {
      visibleTaskClone.style.opacity = 1;
      visibleTaskClone.style.left = event.changedTouches[0].pageX + 'px';
      visibleTaskClone.style.top = event.changedTouches[0].pageY + 'px';
    }
    toggleDropIndication(event);
  }
}


/**
 * 
 * @param {event} event - touchend
 */
function touchDrop(event) {
  if (touchDragging) {
    let draggedOverSection = getDraggedOverZone(event); 
    dragEnd();
    if (draggedOverSection != dragStartSection) {
      touchMoveTo(draggedOverSection);
    }
    (draggedOverSection == '') ? removeTaskDropIndication(dragStartSection) : removeTaskDropIndication(draggedOverSection);
    dragScrollEnabled = false;
    touchDragging = false;
  }
}


/**
 * move task to Section
 * 
 * @param {string} id - e.g. 'section-to-do'
 */
function touchMoveTo(id) {
  if (id != '') {
    let stateCatgory = id.replace('section-','');
    moveTo(stateCatgory)
  }
}


/**
 * get the section the task is dragged over
 * 
 * @param {event} event 
 * @returns - the section the task gets dragged over
 */
function getDraggedOverZone(event) {
  // define the dropzones
  let toDo = document.getElementById('section-to-do').getBoundingClientRect();
  let inProgress = document.getElementById('section-in-progress').getBoundingClientRect();
  let awaitFeedback = document.getElementById('section-await-feedback').getBoundingClientRect();
  let done = document.getElementById('section-done').getBoundingClientRect();
  // check if touch is in dropzone
  let droppedIn_toDo = checkIfDropIsInZone(toDo,event);
  let droppedIn_inProgress = checkIfDropIsInZone(inProgress,event);
  let droppedIn_awaitFeedback = checkIfDropIsInZone(awaitFeedback,event);
  let droppedIn_done = checkIfDropIsInZone(done,event);
  let dropzones = [droppedIn_toDo,droppedIn_inProgress,droppedIn_awaitFeedback,droppedIn_done];
  let containers = ['section-to-do','section-in-progress','section-await-feedback','section-done'];
  let dropID = dragStartSection;
  for (let i = 0; i < dropzones.length; i++) {
    if(dropzones[i]) {
       dropID = containers[i];
    }; 
  };
  return dropID;
}



/**
 * check if the last touch position is inside a task section (dropzone)
 * 
 * @param {object} dropContainer - section.getBoundingClientRect() -> Bounding Box of section
 * @param {event} event  - touchend
 * @returns 
 */
function checkIfDropIsInZone(dropContainer,event) {
  let touch = (event.type == 'touchstart' || event.type == 'touchmove' || event.type == 'touchend') ;
  let touchX = touch ? event.changedTouches[0].pageX : event.pageX;
  let touchY = touch ? event.changedTouches[0].pageY : event.pageY;
  return (dropContainer.right > touchX &&
          dropContainer.left < touchX &&
          dropContainer.bottom > touchY &&
          dropContainer.top < touchY);
}


/**
 * scroll in main container when touchDragging a task-container
 */
function dragScroll() {
  // Vertical Scroll
  if (dragScrollEnabled) {
    const TOP_POSITION = 80;
    const BOTTOM_POSITION = window.innerHeight - 80;
    let visibleTaskClone = document.getElementById('visibleTaskClone').getBoundingClientRect();
    if (visibleTaskClone.top < TOP_POSITION) {
      document.getElementsByClassName('board-main-container')[0].scrollTop -= 10;
    }
    if (visibleTaskClone.bottom > BOTTOM_POSITION) {
      document.getElementsByClassName('board-main-container')[0].scrollTop += 10;
    }
  }
}


// check if touchmove ("touchscroll") is active 

document.addEventListener('touchstart', function(){
  isScrolling = false;
}, { passive: true });

document.addEventListener('touchmove', function(){
  isScrolling = true;
}, { passive: true });

document.addEventListener('touchend', function(){
  isScrolling = false;
}, { passive: true });