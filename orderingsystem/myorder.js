
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer = document.getElementById("cart-container");
const totalAmountElement = document.getElementById("total-amount");


function displayCart() {
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalAmountElement.textContent = "0";
    return;
  }

  let totalPrice = 0;
  cartContainer.innerHTML = "";

  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");

    itemDiv.innerHTML = `
      <div class="cart-item-info">
        <img src="${item.image}" alt="${item.name}" width="50">
        <h3>${item.name}</h3>
        <p>₱${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
      </div>
      <div class="cart-item-actions">
        <button class="remove-item" data-index="${index}">Remove</button>
      </div>
    `;

    cartContainer.appendChild(itemDiv);

    totalPrice += parseFloat(item.price.replace("₱","")) * item.quantity;
  });

  totalAmountElement.textContent = totalPrice.toFixed(2);


  document.querySelectorAll(".remove-item").forEach(button => {
    button.addEventListener("click", e => {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
    });
  });
}


document.getElementById("clear-cart").addEventListener("click", () => {
  localStorage.removeItem("cart");
  displayCart();
});


function generateOrderNumber() {
  return 'ORD-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
}


document.getElementById("checkout-button").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  let total = parseFloat(totalAmountElement.textContent);
  const orderNumber = generateOrderNumber();
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString();

  let receiptWindow = window.open("", "Receipt", "width=500,height=600");

  let receiptHTML = `
    <html>
      <head>
        <title>Receipt</title>
        <style>
          body { font-family: 'Poppins', sans-serif; padding: 20px; }
          h2, h3 { text-align: center; color: #003300; }
          img { display: block; margin: 0 auto 10px; width: 80px; height: 80px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #003300; padding: 8px; text-align: center; }
          th { background-color: #00c853; color: white; }
          tfoot td { font-weight: bold; }
          button { margin-top: 20px; padding: 10px 20px; background: #00c853; color: white; border: none; cursor: pointer; border-radius: 5px; }
          p { text-align: center; margin-top: 10px; }
        </style>
      </head>
      <body>
        <img src="image/ptclog-removebg-preview.png" alt="Logo">
        <h2>CampusMart Receipt</h2>
        <h3>Order Number: ${orderNumber}</h3>
        <p>Date: ${formattedDate}</p>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${cart.map(item => {
              const subtotal = (parseFloat(item.price.replace("₱","")) * item.quantity).toFixed(2);
              return `<tr>
                        <td>${item.name}</td>
                        <td>₱${item.price}</td>
                        <td>${item.quantity}</td>
                        <td>₱${subtotal}</td>
                      </tr>`;
            }).join('')}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3">Total</td>
              <td>₱${total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
        <div style="text-align:center;">
          <button onclick="window.print()">Print Receipt</button>
        </div>
        <p>Thank you for ordering from CampusMart!</p>
      </body>
    </html>
  `;

  receiptWindow.document.write(receiptHTML);
  receiptWindow.document.close();


  localStorage.removeItem("cart");
  displayCart();
});


displayCart();
