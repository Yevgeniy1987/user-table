"use strict";

const usersTableElem = document.getElementById("table-data");
const sortSelect = document.getElementById("sort-select");
const searchForm = document.getElementById("searchForm");

render(usersTableElem, Users, true);

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchQueryString = e.target.searchQuery.value
    .trim()
    .replaceAll(/\s{2,}/g, " ")
    .toLowerCase();

  const filteredUsers = Users.filter((user) => {
    return `${user.name} ${user.username} ${user.address.city}`
      .toLowerCase()
      .includes(searchQueryString);
  });
  console.log(filteredUsers);
  usersTableElem.innerHTML = "";

  filteredUsers.forEach((user) => {
    const userTableHTML = createUsersTable(user);
    usersTableElem.insertAdjacentHTML("beforeend", userTableHTML);
  });
});

function createUsersTable(user) {
  return `<tr class="font-medium">
    <td class="table-text">${user.name}</td>
    <td class="table-text">${user.username}</td>
    <td class="table-text">${user.email}</td>
    <td class="table-text">${user.address.street}</td>
    <td class="table-text">${user.address.suite}</td> 
    <td class="table-text">${user.address.city}</td>
    <td class="table-text">${user.address.zipcode}</td>
    <td class="table-text">${user.phone}</td>
    <td class="table-text">${user.website}</td>
    <td class="table-text">${user.company.name}</td>
</tr>`;
}

sortSelect.addEventListener("change", (event) => {
  const [key, order] = event.target.value.split("/");

  console.log(key, order);

  smartSort(Users, order, key);

  render(usersTableElem, Users, true);
});

function smartSort(array, order = 1, key) {
  return array.sort((a, b) => {
    const elem1 = key ? _.get(a, key) : a;
    const elem2 = key ? _.get(b, key) : b;

    return (
      String(elem1).localeCompare(String(elem2), undefined, { numeric: true }) *
      order
    );
  });
}

function render(to, array, clear) {
  if (clear) {
    to.innerHTML = "";
  }
  array.forEach((user) => {
    const userTableHTML = createUsersTable(user);
    to.insertAdjacentHTML("beforeend", userTableHTML);
  });
}
