const BASE_URL = "https://66d121c662816af9a4f2d21e.mockapi.io/api/v1/product";

export let storeService = {
  data: [],

  addItem: (item) => {
    
    return axios({ url: BASE_URL, method: "POST", data: item });

  },

  updateItem: (item) => {
    return axios({ url: `${BASE_URL}/${item.id}`, method: "PUT", data: item });
  },

  getItems: () => {
    return axios({ url: BASE_URL, method: "GET" });
  },

  deleteItem: (id) => {
    return axios({ url: `${BASE_URL}/${id}`, method: "DELETE" });
  },
};
