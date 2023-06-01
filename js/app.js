"use strict";
let users = [];

const URL_BASE = `http://localhost:3333`;

const usersTableElem = document.getElementById("table-data");
const sortSelect = document.getElementById("sort-select");
const searchForm = document.getElementById("searchForm");

const loadingSpinner = `<tr><td colspan="11"><div class="spinner-wrap h-[80px]"><div class="spinner"></div></div></td><tr>`;

workWithData(`users?_sort=name&_order=asc`);

// fetch(`http://localhost:3333/users?_sort=name&_order=asc`)
//   .then((res) => res.json())
//   .then((data) => {
//     users = data;
//     renderUsers(usersTableElem, users, true);
//   });

usersTableElem.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn")) {
    const agree = confirm("Are you sure?!");
    if (!agree) {
      return;
    }
    const deleteBtn = e.target;

    const deletingUserId = Number(deleteBtn.dataset.id);

    fetch(`${URL_BASE}/users/${deletingUserId}`, { method: "DELETE" }).then(
      (res) => {
        if (res.ok) {
          users = users.filter((user) => user.id !== deletingUserId);
          renderUsers(usersTableElem, users, true);
        }
      }
    );
  }
});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchQueryString = e.target.searchQuery.value
    .trim()
    .replaceAll(/\s{2,}/g, " ")
    .toLowerCase();

  workWithData(`users?q=${searchQueryString}`);

  // fetch(`http://localhost:3333/users?q=${searchQueryString}`)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     users = data;
  //     renderUsers(usersTableElem, users, true);
  //   });
  // users = Users.filter((user) => {
  //   return `${user.name} ${user.username} ${user.address.city}`
  //     .toLowerCase()
  //     .includes(searchQueryString);
  // });

  // renderUsers(usersTableElem, users, true);
});

sortSelect.addEventListener("change", (event) => {
  const [key, order] = event.target.value.split("/");

  workWithData(`users?_sort=${key}&_order=${order}`);

  // fetch(`http://localhost:3333/users?_sort=${key}&_order=${order}`)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     users = data;
  //     renderUsers(usersTableElem, users, true);
  //   });
  // smartSort(users, order, key);

  // renderUsers(usersTableElem, users, true);
});

function createUsersContent(user) {
  const { id, name, username, email, address, phone, website, company } = user;
  const { street, suite, city, zipcode } = address;
  const { name: companyName } = company;

  return `<tr class="hover:bg-amber-200 font-medium">
    <td class="table-text">${name}</td>
    <td class="table-text">${username}</td>
    <td class="table-text">${email}</td>
    <td class="table-text">${street}</td>
    <td class="table-text">${suite}</td> 
    <td class="table-text">${city}</td>
    <td class="table-text">${zipcode}</td>
    <td class="table-text">${phone}</td>
    <td class="table-text">${website}</td>
    <td class="table-text">${companyName}</td>
    <td class="table-text"><button data-id="${id}" class = "btn border bg-gray-200 p-1">Delete</button></td>
</tr>`;
}

// function smartSort(array, order, key) {
//   return array.sort((a, b) => {
//     const elem1 = key ? _.get(a, key) : a;
//     const elem2 = key ? _.get(b, key) : b;

//     return (
//       String(elem1).localeCompare(String(elem2), undefined, { numeric: true }) *
//       order
//     );
//   });
// }

function renderUsers(to, array, clear) {
  if (clear) {
    to.innerHTML = "";
  }
  array.forEach((user) => {
    const userTableHTML = createUsersContent(user);
    to.insertAdjacentHTML("beforeend", userTableHTML);
  });
}

function workWithData(path) {
  usersTableElem.innerHTML = loadingSpinner;

  fetch(`${URL_BASE}/${path}`)
    .then((res) => res.json())
    .then((data) => {
      users = data;
      renderUsers(usersTableElem, users, true);
    });
}
