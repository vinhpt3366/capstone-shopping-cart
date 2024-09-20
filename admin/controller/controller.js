import { getDataForm } from "../model/DataForm.js";
import { validateForm } from "../model/DataForm.js";
import { resetForm, showDataForm } from "../model/DataForm.js";
import { storeService } from "../services/service.js";
import { getAndRenderItems } from "./main.js";

export let showNotify = (message, type = "success") => {
  let backgroundColor;

  switch (type) {
    case "warning":
      backgroundColor = "orange";
      break;
    case "success":
      backgroundColor = "green";
      break;
    case "danger":
      backgroundColor = "red";
      break;
    default:
      backgroundColor = "green";
  }

  Toastify({
    text: message,
    duration: 3000,
    destination: "https://tiki.vn/",
    newWindow: true,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      color: "white",
      background: backgroundColor,
      fontWeight: "bold",
    },
    onClick: function () {},
  }).showToast();
};

export const renderItems = (data) => {
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
        <button class="btn btn-primary btn-edit" data-id="${item.id}" data-bs-toggle="modal" data-bs-target="#exampleModal" id="btnEdit">Edit</button> 
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

function addItem() {
  const newItem = getDataForm();
  if (!validateForm(newItem)) {
    return;
  }
  storeService.addItem(newItem).then(() => {
    showNotify("Add successfully", "success");
    $("#exampleModal").modal("hide");
    getAndRenderItems();
  });
}

document.getElementById("btnAddPhone").addEventListener("click", addItem);

function editItem(id) {
  const item = storeService.data.find((item) => item.id === id);
  showDataForm(item);
  document.getElementById("btnUpdate").style.display = "block";
  document.getElementById("btnAddPhone").style.display = "none";
  document.getElementById("header-title").innerHTML = "Edit Phone";

  // add click event for update button
  document.getElementById("btnUpdate").addEventListener("click", () => {
    const updatedItem = {
      id: id,
      ...getDataForm(),
    };
    if (!validateForm(updatedItem)) {
      return;
    }
    storeService.updateItem(updatedItem).then(() => {
      showNotify("Update successfully", "success");
      $("#exampleModal").modal("hide");
      getAndRenderItems();
    });
  });
}

document.getElementById("exampleModal").addEventListener("hide.bs.modal", function () {
  document.getElementById("btnUpdate").style.display = "none";
  document.getElementById("btnAddPhone").style.display = "block";
  document.getElementById("header-title").innerHTML = "Add New Phone";
  resetForm();
});

function deleteItem(id) {
  storeService.deleteItem(id).then(() => {
    showNotify("Delete successfully", "success");
    getAndRenderItems();
  });
}
