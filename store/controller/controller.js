import { addToCart, deleteItem, increaseQuantity, decreaseQuantity } from "./main.js"

export const renderListProducts = (productsArr) => {
    let contentHTML = "";
    productsArr.forEach(({ id, name, price, screen, backCamera, frontCamera, img, desc, type }) => {
        contentHTML += `
        <div class="col-12 col-sm-6 col-lg-3 mb-4">
          <div class="card shadow-sm h-100">
            <img src="${img}" alt="${name}" class="card-img-top mt-3" style="height: 100%; object-fit: cover;">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title font-weight-bold">${name}</h5>
              <p class="text-danger font-weight-bold"><strong>Price:</strong> $${price}</p>
              <p><strong>Screen:</strong> ${screen}</p>
              <p><strong>Back Camera:</strong> ${backCamera}</p>
              <p><strong>Front Camera:</strong> ${frontCamera}</p>
              <p><strong>Description:</strong> ${desc}</p>
              <p><strong>Type:</strong> ${type}</p>
              <button class="btn btn-success mt-auto" style="width: 100%;" id="addToCart_${id}">Thêm Vào Giỏ Hàng</button>
            </div>
          </div>
        </div>`;
    });

    document.getElementById('tbodyPhone').querySelector('.row').innerHTML = contentHTML;
    productsArr.forEach(({ id }) => {
        document.getElementById(`addToCart_${id}`).addEventListener("click", () => addToCart(id));
    });
}

let calculateTotalPrice = (cart) => {
    let total = 0;
    // Duyệt qua từng sản phẩm trong giỏ hàng và tính tổng giá
    for (let productId in cart) {
        let product = cart[productId];
        total += product.price * product.quantity;
    }
    console.log("🚀 [ calculateTotalPrice [ total:", total)
    document.getElementById("total").innerHTML = "$" + total
    return total;
}
export const renderCart = (cartObj) => {
    // Tạo bảng HTML cho giỏ hàng
    calculateTotalPrice(cartObj)
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
            quantity,
            priceByQuantity,
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
    )
    // Đóng thẻ tbody và table
    cartContentHTML += `
        </tbody>
      </table>
    `;
    // Thêm nội dung HTML vào phần tử với id 'cart'
    document.getElementById("cartItems").innerHTML = cartContentHTML;
    cartArr.forEach(({ id }) => {
        document.getElementById(`deleteItem${id}`).addEventListener("click", () => deleteItem(id));
        document.getElementById(`decreaseQuantity${id}`).addEventListener("click", () => decreaseQuantity(id));
        document.getElementById(`increaseQuantity${id}`).addEventListener("click", () => increaseQuantity(id));

    });
};