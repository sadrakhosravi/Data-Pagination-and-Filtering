/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

const itemPerPage = 9;
const header = document.querySelector('.header');
const linkList = document.querySelector('.link-list');
const studentList = document.querySelector('.student-list');

/*
  Create the `showPage` function
  This function will create and insert/append the elements needed to display a "page" of nine students
*/

/*
  The showPage function will accept an array of objects and a number as parameters and will display
  a page of 9 students on the screen.
*/

const showPage = function (list, page) {
  const startIndex = page * itemPerPage - itemPerPage;
  const endIndex = page * itemPerPage;

  studentList.innerHTML = '';

  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i < endIndex) {
      const studentItem = ` 
      <li class="student-item cf">
         <div class="student-details">
            <img class="avatar" src="${list[i].picture.medium}" alt="${list[i].name.first} ${list[i].name.last} Profile Picture">
            <h3>${list[i].name.first} ${list[i].name.last}</h3>
            <span class="email">${list[i].email}</span>
         </div>
            <div class="joined-details">
            <span class="date">Joined ${list[i].registered.date}</span>
         </div>
    </li>
    `;
      studentList.insertAdjacentHTML('beforeend', studentItem);
    }
  }
};

showPage(data, 1);
/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

/*
  The addPagination function will accept an array of objects and will display pagination links
  on the page based on the total number of students divided by itemsPerPage in the list array.
*/
const addPagination = function (list) {
  const numOfPages = Math.ceil(list.length / itemPerPage);

  linkList.innerHTML = '';

  for (let i = 1; i <= numOfPages; i++) {
    const li = `<li><button type="button">${i}</button></li>`;
    linkList.insertAdjacentHTML('beforeend', li);
  }

  const firstPagBtn = document.querySelectorAll('li button')[0];
  firstPagBtn.className = 'active';

  linkList.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
      const activeBtn = document.querySelector('.active');
      activeBtn.className = '';
      e.target.classList = 'active';
      showPage(data, e.target.textContent);
    }
  });
};

addPagination(data);

/*
  The searchInputField function will display a search input and a search button on the header element
*/
const searchInputField = function () {
  const inputField = `<label for="search" class="student-search">
  <input id="search" placeholder="Search by name...">
  <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>`;
  header.insertAdjacentHTML('beforeend', inputField);
};

searchInputField();

/*
  The searchFunction will search through the list array that will be passes as a parameter and will display
  the students that match the search input value
*/
const searchFunction = function (list) {
  const search = document.querySelector('#search');

  search.addEventListener('input', e => {
    const searchedStudents = [];
    console.log(e.target.value);

    for (let i = 0; i < list.length; i++) {
      const firstNameLower = list[i].name.first.toLowerCase();
      const lastNameLower = list[i].name.last.toLowerCase();
      const inputValLower = e.target.value.toLowerCase();

      //Checks to see if the current input values matches the firt or last name of any students in the data array
      if (firstNameLower.includes(inputValLower) || lastNameLower.includes(inputValLower)) {
        searchedStudents.push(list[i]);
      }
    }
    console.log(searchedStudents);
    if (searchedStudents.length === 0) {
      const message = `<li class="student-item cf"><p class="no-results">Sorry, there are no students matching the name you entered.</p></li>`;
      studentList.innerHTML = message;
    } else {
      showPage(searchedStudents, 1);
      addPagination(searchedStudents);
    }
  });
};
searchFunction(data);
