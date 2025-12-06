/* ============================
     DROPDOWN MENU
============================ */
function toggleDropdown() {
    document.getElementById("dropdown-menu").classList.toggle("show");
}

/* ============================
     CART DATA
============================ */
let cartData = [];

function loadCart() {
    const saved = localStorage.getItem("cartData");
    cartData = saved ? JSON.parse(saved) : [];
    displayCart();
}

function saveCart() {
    localStorage.setItem("cartData", JSON.stringify(cartData));
}

/* ============================
     DISPLAY CART
============================ */
function displayCart() {
    const cartItemsDiv = document.getElementById("cart-items");
    const totalPriceSpan = document.getElementById("total-price");

    cartItemsDiv.innerHTML = "";
    let total = 0;

    if (cartData.length === 0) {
        cartItemsDiv.innerHTML = `<p class="empty-msg">Your cart is empty.</p>`;
        totalPriceSpan.textContent = "0";
        return;
    }

    cartData.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-info">
                <span>${item.name}</span>
                <div class="actions">
                    <button class="minus" data-index="${index}">−</button>
                    <input type="number" value="${item.qty}" min="1" data-index="${index}">
                    <button class="plus" data-index="${index}">+</button>
                    <span class="item-total">₱${item.qty * item.price}</span>
                    <button class="remove-btn" data-index="${index}">×</button>
                </div>
            </div>
        `;

        cartItemsDiv.appendChild(div);
        total += item.qty * item.price;
    });

    totalPriceSpan.textContent = total;

    attachCartEvents();
}

/* ============================
     CART BUTTONS ACTIONS
============================ */
function attachCartEvents() {
    // REMOVE ITEM
    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const index = btn.dataset.index;
            cartData.splice(index, 1);
            saveCart();
            displayCart();
        });
    });

    // MINUS
    document.querySelectorAll(".minus").forEach(btn => {
        btn.addEventListener("click", () => {
            const index = btn.dataset.index;
            if (cartData[index].qty > 1) {
                cartData[index].qty--;
                saveCart();
                displayCart();
            }
        });
    });

    // PLUS
    document.querySelectorAll(".plus").forEach(btn => {
        btn.addEventListener("click", () => {
            const index = btn.dataset.index;
            cartData[index].qty++;
            saveCart();
            displayCart();
        });
    });

    // INPUT CHANGE
    document.querySelectorAll("input[type='number']").forEach(inp => {
        inp.addEventListener("change", () => {
            const index = inp.dataset.index;
            const qty = parseInt(inp.value);
            if (qty > 0) {
                cartData[index].qty = qty;
                saveCart();
                displayCart();
            }
        });
    });
}

/* ============================
     GENERATE UNIQUE RECEIPT CODE
============================ */
function generateReceiptCode() {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    return "PTC-" + randomNum; 
}

/* ============================
     PRINT RECEIPT
============================ */
function printReceipt() {
    if (cartData.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Get Walk-In credentials from localStorage
    let user = localStorage.getItem("walkin_input_0") || "Unknown";
    let schoolID = localStorage.getItem("walkin_input_1") || "Unknown";
    let email = localStorage.getItem("walkin_input_2") || "Unknown";
    let contact = localStorage.getItem("walkin_input_3") || "Unknown";

    let receiptCode = generateReceiptCode();
    let dateTime = new Date().toLocaleString();

    // Start receipt HTML
    let receiptHTML = `
        <html>
        <head>
            <title>Receipt</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .receipt-box { width: 360px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 12px; box-shadow: 0 0 10px rgba(0,0,0,0.25); }
                h2 { text-align: center; margin-bottom: 10px; color: #28a745; }
                .code { text-align: center; font-size: 16px; margin-bottom: 15px; font-weight: bold; }
                .info { font-size: 14px; margin-bottom: 5px; }
                .item { border-bottom: 1px solid #ccc; padding: 8px 0; font-size: 14px; }
                .total { margin-top: 10px; font-size: 18px; font-weight: bold; text-align: center; }
                .barcode { display: block; margin: 15px auto; }
            </style>
        </head>
        <body>
            <div class="receipt-box">
                <h2>RECEIPT</h2>
                <div class="code">Receipt Code: ${receiptCode}</div>
                <img class="barcode"
                     src="https://barcode.tec-it.com/barcode.ashx?data=${receiptCode}&code=Code128&dpi=96"
                     alt="Barcode">
                <div class="info"><b>Name:</b> ${user}</div>
                <div class="info"><b>School ID:</b> ${schoolID}</div>
                <div class="info"><b>Email:</b> ${email}</div>
                <div class="info"><b>Contact:</b> ${contact}</div>
                <div class="info"><b>Date/Time:</b> ${dateTime}</div>
                <h3>Items:</h3>
    `;

    // Add items
    cartData.forEach(item => {
        receiptHTML += `
            <div class="item">
                ${item.name} — <b>x${item.qty}</b><br>
                Total: <b>₱${item.qty * item.price}</b>
            </div>
        `;
    });

    let totalAmount = cartData.reduce((a, b) => a + b.qty * b.price, 0);

    receiptHTML += `
                <div class="total">TOTAL: ₱${totalAmount}</div>
            </div>
        </body>
        </html>
    `;

    let printWindow = window.open("", "", "width=400,height=600");
    printWindow.document.write(receiptHTML);
    printWindow.document.close();
    printWindow.print();

    // Clear cart after checkout
    cartData = [];
    saveCart();
    displayCart();
}

/* ============================
     CHECKOUT BUTTON
============================ */
document.querySelector(".checkout-btn").addEventListener("click", () => {
    printReceipt();
});

/* ============================
         INIT
============================ */
loadCart();
