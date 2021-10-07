
function getCourses() {

   //Reset the element
   coursesEl.innerHTML = '';

   fetch('http://studenter.miun.se/~mama2006/moment5/rest/rest.php', {
           method: 'GET',
       })

       .then(response =>
           response.json())

       .then(data => {
         //Check if the response is a message or data from the database
           if ('message' in data) {
               notEl.innerHTML = data.message
           } else {
               coursesEl.innerHTML = `
        <tr>
        <th>Code</th>
        <th>Name</th>
        <th>Progression</th>
        <th>Syllabus</th>
      </tr>`
               data.forEach(course => {

                   coursesEl.innerHTML +=
                       `
        <tr id=${course.id}>
        <td>${course.code}</td>
        <td>${course.name}</td>
        <td>${course.progression}</td>
        <td><a id="linkId${course.id}" href=${course.syllabus}>Syllabus</a></td>
        <td><button onClick="editCourse(${course.id})">edit</button></td>
        <td><button onClick="deleteCourse(${course.id})">X</button></td>
        
      </tr>`

               })
           }
       })
       .catch(error => {
           console.log('Error: ', error)
       })

}

function deleteCourse(id) {

   fetch('http://studenter.miun.se/~mama2006/moment5/rest/rest.php?id=' + id, {
           method: 'DELETE',
       })

       .then(response => response.json())

       .then(data => {
           //Display the message from the response and reload the courses
           notEl.innerHTML = data.message
           setTimeout(function() {
               notEl.innerHTML = ''
           }, 3000)
           getCourses();
       })
       .catch(error => {
           console.log('Error: ', error)
       })
}

function updateCourse() {
  // Store the data from the fields in variables and put it in a JSON string
   let name = nameUpdate.value;
   let code = codeUpdate.value;
   let progression = progressionUpdate.value;
   let syllabus = syllabusUpdate.value;
   let id = updateId.value;
   let course = {
       'name': name,
       'code': code,
       'progression': progression,
       'syllabus': syllabus
   }

   fetch('http://studenter.miun.se/~mama2006/moment5/rest/rest.php?id=' + id, {
           method: 'PUT',

           body: JSON.stringify(course),
       })

       .then(response => response.json())

       .then(data => {

           notEl.innerHTML = data.message
           setTimeout(function() {
               notEl.innerHTML = ''

           }, 3000)
           getCourses();
       })
       .catch(error => {
           console.log('Error: ', error)
       })

}

function editCourse(id) {
   //Take the data from the table row and put it in the fields 
   let rowEl = document.getElementById(id);
   let columns = rowEl.children;
   let arr = Array.from(columns);
   let linkEl = document.getElementById("linkId" + id)
   let link = linkEl.href

   codeUpdate.value = arr[0].innerText;
   nameUpdate.value = arr[1].innerText
   progressionUpdate.value = arr[2].innerText
   syllabusUpdate.value = link
   updateId.value = id;
//Display the form for editing the courses
   editCon.style.display = "block"
}

function addCourse() {

   let name = nameInput.value;
   let code = codeInput.value;
   let progression = progressionInput.value;
   let syllabus = syllabusInput.value;
   let course = {
       'name': name,
       'code': code,
       'progression': progression,
       'syllabus': syllabus
   }

   fetch('http://studenter.miun.se/~mama2006/moment5/rest/rest.php', {
           method: 'POST',

           body: JSON.stringify(course),
       })
       
       .then(response => response.json())

       .then(data => {
           notEl.innerHTML = data.message
           setTimeout(function() {
               notEl.innerHTML = ''

           }, 3000)
           getCourses();
       })
       .catch(error => {
           console.log('Error: ', error)
       })

}