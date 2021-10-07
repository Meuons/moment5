//Element variables
let coursesEl = document.getElementById("courses");
let btnEl = document.getElementById("addBtn");
let updateEl = document.getElementById("updateBtn");
let editEl = document.getElementById("editForm");
let editCon = document.getElementById("editFormCon");
let nameInput = document.getElementById("name");
let codeInput = document.getElementById("code");
let progressionInput = document.getElementById("progression");
let syllabusInput = document.getElementById("syllabus");
let notEl = document.getElementById('notification')
let nameUpdate = document.getElementById("nameUpdate");
let codeUpdate = document.getElementById("codeUpdate");
let updateId = document.getElementById("updateId");
let progressionUpdate = document.getElementById("progressionUpdate");
let syllabusUpdate = document.getElementById("syllabusUpdate");

// Add eventlisteners
window.addEventListener('load', getCourses)
btnEl.addEventListener('click', addCourse)
updateEl.addEventListener('click', updateCourse);
