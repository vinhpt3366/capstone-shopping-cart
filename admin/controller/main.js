import { storeService } from "../services/service.js";
import { renderItems } from "./controller.js";

export const getAndRenderItems = () => {
  storeService.getItems().then((response) => {
    renderItems(response.data);
    if (response.data) storeService.data = response.data;
  });
};

getAndRenderItems();

let isAscending = false;
function sortByPrice() {
  storeService.data.sort((a, b) => {
    if (isAscending) {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });
  isAscending = !isAscending;
  renderItems(storeService.data);
}

document.getElementById("sort-btn").addEventListener("click", sortByPrice);

function searchPhones() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) {
    return;
  }
  const searchTerm = searchInput.value.toLowerCase();
  const filteredPhones = storeService.data.filter(
    (phone) => (phone.name && phone.name.toLowerCase().includes(searchTerm)) || (phone.price !== undefined && phone.price.toString().includes(searchTerm))
  );
  renderItems(filteredPhones);
}
document.getElementById("searchButton").addEventListener("click", searchPhones);
document.getElementById("searchInput").addEventListener("input", searchPhones);
