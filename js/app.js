"use strict";

const usersTableElem = document.getElementById("table-data");
const sortSelect = document.getElementById("sort-select");

Users.forEach((user) => {
  const userTableHTML = createUsersTable(user);
  usersTableElem.insertAdjacentHTML("beforeend", userTableHTML);
});

function createUsersTable(user) {
  return `<tr class="font-medium">
    <td class="table-text">${user.name}</td>
    <td class="table-text">${user.username}</td>
    <td class="table-text">${user.email}</td>
    <td class="table-text">${user.address.street}</td>
    <td class="table-text">${user.address.suite}</td> 
    <td class="table-text">${user.address.city}</td>
    <td class="table-text">${user.address.zipCode}</td>
    <td class="table-text">${user.phone}</td>
    <td class="table-text">${user.website}</td>
    <td class="table-text">${user.company.name}</td>
</tr>`;
}

sortSelect.addEventListener('change', (event) => {
  const sortSelection = event.target.value.split("/");
  console.log(sortSelection);
  
});



