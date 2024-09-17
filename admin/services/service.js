const BASE_URL = "https://66d121c662816af9a4f2d21e.mockapi.io/api/v1/product";

export let storeService = {
  getItems: () => {
    return axios({ url: BASE_URL, method: "GET" });
  },

  deleteItem: (id) => {
    return axios({ url: `${BASE_URL}/${id}`, method: "DELETE" });
  },
};
