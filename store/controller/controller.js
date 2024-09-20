import { addToCart, deleteItem, increaseQuantity, decreaseQuantity } from "./main.js";
import { CartItem, Product } from "./modelCartItems.js";

// Hàm render danh sách sản phẩm, nhận vào mảng các đối tượng Product
export const renderListProducts = (productsArr) => {
    let contentHTML = "";
    productsArr.forEach((product) => {
        contentHTML += `
        <div class="col-12 col-sm-6 col-lg-3 mb-4">
          <div class="card shadow-sm h-100">
            <img src="${product.img}" alt="${product.name}" class="card-img-top mt-3" style="height: 100%; object-fit: cover;">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title font-weight-bold">${product.name}</h5>
              <p class="text-danger font-weight-bold"><strong>Price:</strong> $${product.price}</p>
              <p><strong>Screen:</strong> ${product.screen}</p>
              <p><strong>Back Camera:</strong> ${product.backCamera}</p>
              <p><strong>Front Camera:</strong> ${product.frontCamera}</p>
              <p><strong>Description:</strong> ${product.desc}</p>
              <p><strong>Type:</strong> ${product.type}</p>
              <button class="btn btn-success mt-auto" style="width: 100%;" id="addToCart_${product.id}">Thêm Vào Giỏ Hàng</button>
            </div>
          </div>
        </div>`;
    });

    // Thêm nội dung HTML vào phần tử có id 'tbodyPhone'
    document.getElementById('tbodyPhone').querySelector('.row').innerHTML = contentHTML;

    // Gán sự kiện click cho từng nút "Thêm Vào Giỏ Hàng"
    productsArr.forEach((product) => {
        document.getElementById(`addToCart_${product.id}`).addEventListener("click", () => addToCart(product.id));
    });
}

// Hàm tính tổng giá trị giỏ hàng
let calculateTotalPrice = (cart) => {
    let total = 0;
    // Duyệt qua từng sản phẩm trong giỏ hàng và tính tổng giá
    for (let productId in cart) {
        let product = cart[productId];
        total += product.price * product.quantity;
    }
    console.log("🚀 [ calculateTotalPrice [ total:", total);
    document.getElementById("total").innerHTML = "$" + total;
    return total;
}

// Hàm render giỏ hàng, nhận vào một đối tượng chứa các CartItem
export const renderCart = (cartObj) => {
    // Tạo bảng HTML cho giỏ hàng
    calculateTotalPrice(cartObj);
    let cartContentHTML = `
      <table class="table w-100 text-black" style="text-align: center">
        <thead>
          <tr>
            <th class="w-25">Product</th>
            <th class="w-25">Quantity</th>
            <th class="w-25">Price</th>
            <th class="w-25"></th>
          </tr>
        </thead>
        <tbody>
    `;
    // Chuyển đổi đối tượng giỏ hàng thành mảng
    const cartArr = Object.values(cartObj);
    // Tạo hàng cho từng sản phẩm trong giỏ hàng
    cartArr.forEach(
        ({
            id,
            name,
            price,
            screen,
            backCamera,
            frontCamera,
            img,
            desc,
            type,
            quantity
        }) => {
            cartContentHTML += `
          <tr class="border-bottom">
            <td class="p-4"><img src="${img}" style="width: 50px; height: 50px;" class="object-cover rounded-lg"/><span>${name}</span></td>
            <td class="p-4 d-flex align-items-center">
              <button class="text-gray-500 px-2" id="decreaseQuantity${id}">❮</button>
              <span class="px-2">${quantity}</span>
              <button class="text-gray-500 px-2" id="increaseQuantity${id}">❯</button>
            </td>
            <td class="p-4" id="price${id}}">${price}</td>
            <td class="p-4">
              <button class="btn btn-danger" id="deleteItem${id}">🗑️</button>
            </td>
          </tr>
        `;
        }
    );
    // Đóng thẻ tbody và table
    cartContentHTML += `
        </tbody>
      </table>
    `;
    // Thêm nội dung HTML vào phần tử với id 'cartItems'
    document.getElementById("cartItems").innerHTML = cartContentHTML;

    // Gán sự kiện cho các nút xóa, tăng, giảm số lượng sản phẩm
    cartArr.forEach(({ id }) => {
        document.getElementById(`deleteItem${id}`).addEventListener("click", () => deleteItem(id));
        document.getElementById(`decreaseQuantity${id}`).addEventListener("click", () => decreaseQuantity(id));
        document.getElementById(`increaseQuantity${id}`).addEventListener("click", () => increaseQuantity(id));
    });
};
