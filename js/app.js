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
  const { name, username, email, address, phone, website, company } = user;
  const { street, suite, city, zipcode } = address;
  const { name: companyName } = company;

  return `<tr class="font-medium">
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
