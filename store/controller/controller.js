export const renderListProducts = (productsArr) => {
    let contentHTML = "";

    productsArr.forEach(({ id, name, price, screen, backCamera, frontCamera, img, desc, type }) => {
        contentHTML += `
        <div class="bg-white rounded-lg shadow-md p-4 relative">
          <img src="${img}" alt="${name}" style="max-width: 100%; max-height: 100%;" class=" object-cover rounded-lg mb-4">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">${name}</h3>
          <p class=text-red-600 font-bold text-xl mb-2"><strong>Price:</strong> $${price}</p>
          <p><strong>Screen:</strong> ${screen}</p>
          <p><strong>Back Camera:</strong> ${backCamera}</p>
          <p><strong>Front Camera:</strong> ${frontCamera}</p>
          <p><strong>Description:</strong> ${desc}</p>
          <p><strong>Type:</strong> ${type}</p>
          <button class="mt-auto bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300" style="width:100%" id="addToCart_${id}">Thêm Vào Giỏ Hàng</button>
        </div>`;
    });

    // Cập nhật nội dung HTML vào thẻ có id 'tbodyFood'
    document.getElementById('tbodyPhone').innerHTML = contentHTML;

    // Thêm sự kiện click cho từng nút "Thêm Vào Giỏ Hàng"
    productsArr.forEach(({ id }) => {
        document.getElementById(`addToCart_${id}`).addEventListener("click", () => addToCart(id));
    });
};
