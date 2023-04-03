"use strict";

const usersTableElem = document.getElementById("table-data");

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

function smartSort(array, order = 1, key) {
    array.sort((a,b) => {
        const elem1 =key ? a[key]:a;
        const elem2 =key ? b[key]:b;
        return String(elem1).localeCompare(String(elem2), undefined, {numeric:true})*order
    })
}


