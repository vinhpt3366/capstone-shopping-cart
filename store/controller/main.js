import { renderListProducts, renderCart } from "./controller.js";
import { CartItem, Product } from "./modelCartItems.js";

const BASE_URL = "https://66d121c662816af9a4f2d21e.mockapi.io/api/v1/product";

var products = [];
let fetchData = async () => {
    let res = await axios({
        url: BASE_URL,
        method: "GET",
    });
    products = res.data.map(item => new Product(
        item.id,
        item.name,
        item.price,
        item.screen,
        item.backCamera,
        item.frontCamera,
        item.img,
        item.desc,
        item.type
    ));
    renderListProducts(products);
    return products;
};

console.log("🚀 [ products:", products);
fetchData();

var Cart = {};

// Hàm để thêm sản phẩm vào giỏ hàng
export const addToCart = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (!product) {
        console.error("Product not found!");
        return;
    }

    // Kiểm tra nếu sản phẩm đã có trong giỏ hàng, tăng số lượng nếu có
    if (Cart[productId]) {
        Cart[productId].quantity += 1;
    } else {
        // Thêm sản phẩm vào giỏ hàng dưới dạng đối tượng CartItem với số lượng ban đầu là 1
        Cart[productId] = new CartItem(
            product.id,
            product.name,
            product.price,
            product.screen,
            product.backCamera,
            product.frontCamera,
            product.img,
            product.desc,
            product.type,
            1 // Số lượng ban đầu là 1
        );
    }
    // Thêm vào local storage
    var dataJson = JSON.stringify(Cart);
    console.log("📦 [dataJson:", dataJson);
    localStorage.setItem("cartItems_JSON", dataJson);
    // Hiển thị giỏ hàng trong console để kiểm tra
    console.log("Giỏ hàng hiện tại:", Cart);
    // Gọi hàm render để cập nhật giỏ hàng trên giao diện
    alert("Thêm Thành Công");
    renderCart(Cart);
};

// Lấy dữ liệu từ local storage
var dataJson = localStorage.getItem("cartItems_JSON");
if (dataJson !== null) {
    var savedCart = JSON.parse(dataJson);
    for (const productId in savedCart) {
        const item = savedCart[productId];
        Cart[productId] = new CartItem(
            item.id,
            item.name,
            item.price,
            item.screen,
            item.backCamera,
            item.frontCamera,
            item.img,
            item.desc,
            item.type,
            item.quantity
        );
    }
    // Hiển thị giỏ hàng
    renderCart(Cart);
}

// Hàm lọc sản phẩm theo loại
const filterProducts = async (type) => {
    try {
        const response = await axios.get(BASE_URL);
        const filteredProducts = response.data
            .map(item => new Product(
                item.id,
                item.name,
                item.price,
                item.screen,
                item.backCamera,
                item.frontCamera,
                item.img,
                item.desc,
                item.type
            ))
            .filter((product) => product.type.toLowerCase() === type.toLowerCase());
        renderListProducts(filteredProducts);
    } catch (error) {
        console.error("Error filtering products:", error);
    }
};

// Gán sự kiện click cho nút tìm kiếm
document.getElementById("search").addEventListener("click", () => {
    const type = document.getElementById("selLoai").value;
    console.log("🚀 [ type:", type);
    if (type !== "all") {
        filterProducts(type);
    } else {
        renderListProducts(products); // Hiển thị tất cả sản phẩm nếu chọn "all"
    }
});

// Hàm xóa item trong cart
export const deleteItem = (itemID) => {
    delete Cart[itemID];
    var dataJson = JSON.stringify(Cart);
    localStorage.setItem("cartItems_JSON", dataJson);
    renderCart(Cart);
};

// Tăng số lượng
export const increaseQuantity = (itemID) => {
    console.log(`Tăng số lượng sản phẩm với ID: ${itemID}`);
    Cart[itemID].quantity = Cart[itemID].quantity + 1;
    // Thêm vào local storage
    var dataJson = JSON.stringify(Cart);
    console.log("📦 [dataJson:", dataJson);
    localStorage.setItem("cartItems_JSON", dataJson);
    renderCart(Cart);
};

// Giảm số lượng
export const decreaseQuantity = (itemID) => {
    console.log(`Giảm số lượng sản phẩm với ID: ${itemID}`);
    Cart[itemID].quantity = Cart[itemID].quantity - 1;
    if (Cart[itemID].quantity <= 0) {
        deleteItem(itemID);
    }
    // Thêm vào local storage
    var dataJson = JSON.stringify(Cart);
    console.log("📦 [dataJson:", dataJson);
    localStorage.setItem("cartItems_JSON", dataJson);
    renderCart(Cart);
};

// Làm rỗng giỏ hàng
let emptyCart = () => {
    Cart = {};
    var dataJson = JSON.stringify(Cart);
    console.log("📦 [dataJson:", dataJson);
    localStorage.setItem("cartItems_JSON", dataJson);
    alert("Đã Làm Trống Giỏ Hàng");
    renderCart(Cart);
};

// Làm rỗng giỏ hàng bằng thanh toán
let checkout = () => {
    Cart = {};
    var dataJson = JSON.stringify(Cart);
    console.log("📦 [dataJson:", dataJson);
    localStorage.setItem("cartItems_JSON", dataJson);
    alert("Thanh Toán Thành Công");
    renderCart(Cart);
};

document.getElementById("emptyCart").addEventListener("click", () => emptyCart());
document.getElementById("checkout").addEventListener("click", () => checkout());
