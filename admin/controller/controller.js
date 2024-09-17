import { storeService } from "../services/service.js";

export const renderItems = (data) => {
  console.log(data);
  const tableBody = document.getElementById("tablePhone");

  const html = data
    .map(
      (item) => `
    <tr>
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.price}</td>
      <td><img src="${item.img}" alt="${item.name}" width="100" height="100"></td>
      <td>${item.desc}</td>
      <td>
        <button class="btn btn-primary btn-edit" data-id="${item.id}" id="btnEdit">Edit</button> 
        <button class="btn btn-danger btn-delete" data-id="${item.id}" id="btnDelete">Delete</button>
      </td>
    </tr>
  `
    )
    .join("");

  tableBody.innerHTML = html;

  tableBody.querySelectorAll(".btn-edit").forEach((button) => {
    button.addEventListener("click", () => editItem(button.dataset.id));
  });

  tableBody.querySelectorAll(".btn-delete").forEach((button) => {
    button.addEventListener("click", () => deleteItem(button.dataset.id));
  });
};

function editItem(id) {
  console.log(`Edit item with id: ${id}`);
  // Implement edit functionality here
}

function deleteItem(id) {
  console.log(`Delete item with id: ${id}`);
  storeService.deleteItem(id).then(() => {
    console.log("Item deleted successfully");
    storeService.getItems().then((response) => {
      renderItems(response.data);
    });
  });
}
