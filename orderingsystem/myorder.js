// -------------------------------
// CART SETUP
// -------------------------------
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer = document.getElementById("cart-container");
const totalAmountElement = document.getElementById("total-amount");

// -------------------------------
// DISPLAY CART
// -------------------------------
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

    totalPrice += parseFloat(item.price.replace("₱", "")) * item.quantity;
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

// -------------------------------
// CLEAR CART
// -------------------------------
document.getElementById("clear-cart").addEventListener("click", () => {
  localStorage.removeItem("cart");
  displayCart();
});

// -------------------------------
// POPUP SHOW & HIDE
// -------------------------------
function openPopup() {
  document.getElementById("popupPanel").style.display = "flex";
}

function closePopup() {
  document.getElementById("popupPanel").style.display = "none";
}

// -------------------------------
// CHECKOUT BUTTON
// -------------------------------
document.getElementById("checkout-button").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }
  openPopup();
});

// -------------------------------
// GENERATE RECEIPT CODE
// -------------------------------
function generateReceiptCode() {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return "PTC-" + randomNum;
}

// -------------------------------
// PRINT RECEIPT
// -------------------------------
function printReceipt() {
  let user = document.getElementById("userName").value;
  let email = document.getElementById("userEmail").value;
  let schoolID = document.getElementById("userSchoolID").value;
  let scheduleDate = document.getElementById("scheduleDate").value;

  // Validate inputs
  if (user.trim() === "" || email.trim() === "" || schoolID.trim() === "" || scheduleDate === "") {
    alert("Please fill up all fields: Name, Email, School ID, and Schedule Date.");
    return;
  }

  // Email validation
  const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailCheck.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Current date and time
  const now = new Date();
  const fullDate = now.toLocaleDateString();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const receiptCode = generateReceiptCode();

  // -------------------------------
  // RECEIPT HTML
  // -------------------------------
  let receiptHTML = `
    <html>
    <head>
      <title>Receipt</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .receipt-box { width: 320px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 12px; box-shadow: 0 0 10px rgba(0,0,0,0.25); }
        h2 { text-align: center; margin-bottom: 10px; color: #28a745; }
        .code { text-align: center; font-size: 16px; margin-bottom: 15px; font-weight: bold; }
        .info { font-size: 14px; margin-bottom: 10px; }
        .item { border-bottom: 1px solid #ccc; padding: 8px 0; }
        .total { margin-top: 10px; font-size: 18px; font-weight: bold; text-align: center; }
        .barcode { display: block; margin: 15px auto; }
        button { margin-top: 15px; padding: 10px 20px; background: #00c853; color: white; border: none; cursor: pointer; border-radius: 5px; display: block; margin-left: auto; margin-right: auto; }
      </style>
    </head>
    <body>
      <div class="receipt-box">
        <h2>RECEIPT</h2>
        <div class="code">Receipt Code: ${receiptCode}</div>
        <img class="barcode" src="https://barcode.tec-it.com/barcode.ashx?data=${receiptCode}&code=Code128&dpi=96" alt="Barcode">

        <div class="info"><b>Name:</b> ${user}</div>
        <div class="info"><b>Email:</b> ${email}</div>
        <div class="info"><b>School ID:</b> ${schoolID}</div>
        <div class="info"><b>Schedule:</b> ${scheduleDate}</div>
        <div class="info"><b>Date Printed:</b> ${fullDate}</div>
        <div class="info"><b>Time Printed:</b> ${time}</div>

        <h3>Items:</h3>
        ${cart.map(item => {
          const subtotal = (parseFloat(item.price.replace("₱","")) * item.quantity).toFixed(2);
          return `<div class="item">${item.name} — <b>x${item.quantity}</b><br>Total: <b>₱${subtotal}</b></div>`;
        }).join('')}

        <div class="total">TOTAL: ₱${parseFloat(totalAmountElement.textContent).toFixed(2)}</div>

        <button onclick="window.print()">Print Receipt</button>
      </div>
    </body>
    </html>
  `;

  const receiptWindow = window.open("", "Receipt", "width=400,height=600");
  receiptWindow.document.write(receiptHTML);
  receiptWindow.document.close();

  // Clear cart after checkout
  localStorage.removeItem("cart");
  displayCart();
  closePopup();
}

// -------------------------------
// INIT
// -------------------------------
displayCart();
