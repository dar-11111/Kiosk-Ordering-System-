// -------------------------------
// UPDATE TOTALS
// -------------------------------
function updateTotals() {
    let grandTotal = 0;

    document.querySelectorAll(".cart-item").forEach(item => {
        let price = parseInt(item.getAttribute("data-price"));
        let qty = parseInt(item.querySelector(".qty").textContent);
        let total = price * qty;

        item.querySelector(".item-total").textContent = "₱" + total;
        grandTotal += total;
    });

    document.getElementById("grand-total").textContent = grandTotal;
}

// -------------------------------
// PLUS & MINUS BUTTONS
// -------------------------------
document.querySelectorAll(".plus").forEach(btn => {
    btn.addEventListener("click", function () {
        let qty = this.parentNode.querySelector(".qty");
        qty.textContent = parseInt(qty.textContent) + 1;
        updateTotals();
    });
});

document.querySelectorAll(".minus").forEach(btn => {
    btn.addEventListener("click", function () {
        let qty = this.parentNode.querySelector(".qty");
        if (parseInt(qty.textContent) > 1) {
            qty.textContent = parseInt(qty.textContent) - 1;
            updateTotals();
        }
    });
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
// GENERATE UNIQUE RECEIPT CODE
// -------------------------------
function generateReceiptCode() {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    return "PTC-" + randomNum; // Example: PTC-492884
}

// -------------------------------
// PRINT RECEIPT
// -------------------------------
function printReceipt() {
    let user = document.getElementById("userName").value;
    let email = document.getElementById("userEmail").value;
    let schoolID = document.getElementById("userSchoolID").value;
    let date = document.getElementById("scheduleDate").value;

   
    // Validate empty fields
    if (user.trim() === "" || email.trim() === "" || schoolID.trim() === "" || date === "") {
        alert("Please fill up all fields: Name, Email, School ID, and Schedule Date.");
        return;
    }

    // Validate email format
    let emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailCheck.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

  
    let receiptCode = generateReceiptCode();

    // START RECEIPT HTML
    let receiptHTML = `
        <html>
        <head>
            <title>Receipt</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                }
                .receipt-box {
                    width: 320px;
                    margin: auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 12px;
                    box-shadow: 0 0 10px rgba(0,0,0,0.25);
                }
                h2 {
                    text-align: center;
                    margin-bottom: 10px;
                    color: #28a745;
                }
                .code {
                    text-align: center;
                    font-size: 16px;
                    margin-bottom: 15px;
                    font-weight: bold;
                }
                .info {
                    font-size: 14px;
                    margin-bottom: 10px;
                }
                .item {
                    border-bottom: 1px solid #ccc;
                    padding: 8px 0;
                }
                .total {
                    margin-top: 10px;
                    font-size: 18px;
                    font-weight: bold;
                    text-align: center;
                }
                .barcode {
                    display: block;
                    margin: 15px auto;
                }
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
                <div class="info"><b>Email:</b> ${email}</div>
                <div class="info"><b>School ID:</b> ${schoolID}</div>
                <div class="info"><b>Schedule:</b> ${date}</div>

                <h3>Items:</h3>
    `;

    // ADD ITEMS ORDERED
    document.querySelectorAll(".cart-item").forEach(item => {
        let name = item.querySelector("span").textContent;
        let qty = item.querySelector(".qty").textContent;
        let price = item.querySelector(".item-total").textContent;

        receiptHTML += `
            <div class="item">
                ${name} — <b>x${qty}</b><br>
                Total: <b>${price}</b>
            </div>
        `;
    });

    // ADD TOTAL
    receiptHTML += `
                <div class="total">TOTAL: ₱${document.getElementById("grand-total").textContent}</div>
            </div>
        </body>
        </html>
    `;

    // OPEN PRINT WINDOW
    let printWindow = window.open("", "", "width=400,height=600");
    printWindow.document.write(receiptHTML);
    printWindow.document.close();
    printWindow.print();
}
