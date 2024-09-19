import { renderListProducts } from "./controller.js"

const BASE_URL = "https://66d121c662816af9a4f2d21e.mockapi.io/api/v1/product";

var products = {};
let fetchData = async () => {
    let res = await axios({
        url: BASE_URL,
        method: "GET",
    });
    products = res.data
    renderListProducts(products)
    return products
}
console.log("🚀 [ products:", products)

fetchData()