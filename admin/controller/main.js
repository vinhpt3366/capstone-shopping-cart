import { storeService } from "../services/service.js";
import { renderItems } from "./controller.js";

storeService.getItems().then((response) => {
  renderItems(response.data);
});
