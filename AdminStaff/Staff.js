// STAFF PANEL JS

// ----------- PAGE SWITCHER ---------
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');

  document.querySelectorAll('.sidebar ul li').forEach(li => li.classList.remove('active'));
  event.target.classList.add('active');
}
// ===== SEARCH FUNCTION =====
document.getElementById("searchInput").addEventListener("keyup", function() {
    let filter = this.value.toLowerCase();
    let rows = document.querySelectorAll(".orders-table tbody tr");

    rows.forEach(row => {
        let schoolId = row.children[1].textContent.toLowerCase();
        let name = row.children[2].textContent.toLowerCase();
        let item = row.children[4].textContent.toLowerCase();

        if (schoolId.includes(filter) || name.includes(filter) || item.includes(filter)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});


// ===== BARCODE / QR SCANNER =====
const scanBtn = document.getElementById("scanBtn");
const scannerPopup = document.getElementById("scannerPopup");
const closeScanner = document.getElementById("closeScanner");
const video = document.getElementById("scannerCamera");

const codeReader = new ZXing.BrowserBarcodeReader();

scanBtn.addEventListener("click", () => {
    scannerPopup.style.display = "block";

    codeReader.decodeFromVideoDevice(null, "scannerCamera", (result, err) => {
        if (result) {
            document.getElementById("searchInput").value = result.text;
            document.getElementById("searchInput").dispatchEvent(new Event("keyup"));
            scannerPopup.style.display = "none";
            codeReader.reset();
        }
    });
});

closeScanner.addEventListener("click", () => {
    scannerPopup.style.display = "none";
    codeReader.reset();
});


// ------- SAMLPE DEMO DATA (replace with DB/API later) ---------
let orders = [
  { id: 1, source: "Online", item: "PE Uniform", qty: 1, price: 900, status: "Pending" },
  { id: 2, source: "Kiosk", item: "ID Lace", qty: 2, price: 300, status: "Pending" },
  { id: 3, source: "Online", item: "NSTP", qty: 1, price: 500, status: "Pending" },
  { id: 4, source: "Online", item: "PE Uniform", qty: 1, price: 900, status: "Pending" },
  { id: 5, source: "Kiosk", item: "ID Lace", qty: 2, price: 300, status: "Pending" },
  { id: 6, source: "Online", item: "NSTP", qty: 1, price: 500, status: "Pending" },
  { id: 7, source: "Online", item: "PE Uniform", qty: 1, price: 900, status: "Pending" },
  { id: 8, source: "Kiosk", item: "ID Lace", qty: 2, price: 300, status: "Pending" },
  { id: 9, source: "Online", item: "NSTP", qty: 1, price: 500, status: "Pending" },
  { id: 10, source: "Online", item: "SCHOOL UNIFORM", qty: 1, price: 500, status: "Pending" },
  { id: 11, source: "Online", item: "NSTP", qty: 1, price: 500, status: "Pending" },
];

let schedule = [
  { id: 1, name: "John Cruz", time: "10:30 AM", date: "2025-01-23" },
  { id: 2, name: "Maria Lopez", time: "1:00 PM", date: "2025-01-23" }
];

let inventory = [
  { id: 1, name: "Uniform", stock: 23 },
  { id: 2, name: "PE T-shirt", stock: 8 },
  { id: 3, name: "ID Lace", stock: 50 }
];

// -------- DISPLAY FUNCTIONS ----------
function loadOrders() {
  const container = document.getElementById("orderList");
  container.innerHTML = "";

  // Sort orders by priority: Ready > Completed > Pending >Cancelled
  const priority = { "Ready": 1, "Completed": 2, "Pending": 3, "Cancelled": 4 };
  orders.sort((a, b) => priority[a.status] - priority[b.status]);

  orders.forEach(o => {
    const card = document.createElement("div");
    card.className = "card animate-card"; // add animation class

    // Add color class based on status
    let statusClass = "";
    if (o.status === "Pending") statusClass = "pending";
    if (o.status === "Ready") statusClass = "ready";
    if (o.status === "Completed") statusClass = "completed";
    if (o.status === "Cancelled") statusClass = "cancelled";

    card.classList.add(statusClass);

    card.innerHTML = `
        <h3>Order #${o.id}</h3>
        <p><strong>Source:</strong> ${o.source}</p>
        <p><strong>Item:</strong> ${o.item}</p>
        <p><strong>Qty:</strong> ${o.qty}</p>
        <p><strong>Status:</strong> ${o.status}</p>

        <button class="btn" onclick="updateStatus(${o.id}, 'Ready')">Ready</button>
        <button class="btn" onclick="updateStatus(${o.id}, 'Completed')">Completed</button>
        <button class="btn" onclick="updateStatus(${o.id}, 'Cancelled')">Cancel</button>
    `;
    container.appendChild(card);
  });
}


function loadSchedule() {
  const container = document.getElementById("scheduleList");
  container.innerHTML = "";

  schedule.forEach(s => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${s.name}</h3>
      <p><strong>Date:</strong> ${s.date}</p>
      <p><strong>Time:</strong> ${s.time}</p>
      <button class="btn" onclick="resched(${s.id})">Reschedule</button>
      <button class="btn" onclick="postpone(${s.id})">Postpone</button>
    `;
    container.appendChild(card);
  });
}

function loadInventory() {
  const container = document.getElementById("inventoryList");
  container.innerHTML = "";

  inventory.forEach(i => {
    const card = document.createElement("div");
    card.className = "card";

    let warn = i.stock < 10 ? "<span style='color:red'>⚠ Low Stock!</span>" : "";

    card.innerHTML = `
      <h3>${i.name}</h3>
      <p><strong>Stock:</strong> ${i.stock} ${warn}</p>
    `;
    container.appendChild(card);
  });
}

// -------- ORDER STATUS UPDATE ----------
function updateStatus(id, newStatus) {
  const order = orders.find(o => o.id === id);
  if (order) order.status = newStatus;
  loadOrders();
  updateReports();
}

// -------- APPOINTMENT FUNCTIONS ----------
function resched(id) {
  let newDate = prompt("Enter new date (YYYY-MM-DD):");
  let newTime = prompt("Enter new time (ex. 2:00 PM):");

  const s = schedule.find(x => x.id === id);
  if (s && newDate && newTime) {
    s.date = newDate;
    s.time = newTime;
  }
  loadSchedule();
}

function postpone(id) {
  alert("Appointment postponed by 1 day.");
  const s = schedule.find(x => x.id === id);
  if (s) {
    let nextDay = new Date(s.date);
    nextDay.setDate(nextDay.getDate() + 1);
    s.date = nextDay.toISOString().slice(0, 10);
  }
  loadSchedule();
}

// -------- REPORTS ----------
// Dummy data
const reportData = [
    { id: 1, type: "Online", user: "Juan Dela Cruz", amount: 250, status: "Completed", date: "2025-11-01" },
    { id: 2, type: "Kiosk", user: "Maria Santos", amount: 150, status: "Completed", date: "2025-11-02" },
    { id: 3, type: "Online", user: "Ana Reyes", amount: 300, status: "Completed", date: "2025-11-03" }
];

// Load to table
function loadReportTable() {
    const tbody = document.getElementById("reportTableBody");
    tbody.innerHTML = "";

    reportData.forEach(r => {
        const row = `
            <tr>
                <td>${r.id}</td>
                <td>${r.type}</td>
                <td>${r.user}</td>
                <td>₱${r.amount}</td>
                <td>${r.status}</td>
                <td>${r.date}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Update cards
function updateCards() {
    let totalSales = 0;
    let onlineOrders = 0;
    let kioskOrders = 0;

    reportData.forEach(r => {
        totalSales += r.amount;
        if (r.type === "Online") onlineOrders++;
        if (r.type === "Kiosk") kioskOrders++;
    });
    document.getElementById("salesCard").querySelector(".value").textContent = "₱" + totalSales;
    document.getElementById("onlineCard").querySelector(".value").textContent = onlineOrders;
    document.getElementById("kioskCard").querySelector(".value").textContent = kioskOrders;
    document.getElementById("appointmentCard").querySelector(".value").textContent = "3"; // sample
}

window.onload = () => {
    loadReportTable();
    updateCards();
};


// -------- INITIAL LOAD ----------
loadOrders();
loadSchedule();
loadInventory();
updateReports();