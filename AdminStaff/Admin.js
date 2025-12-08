

// PAGE SWITCHING
function showPage(pageId) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(pageId).classList.add("active");
}


/* -------------------- SAMPLE DATA ------------------------- */

let onlineOrders = [
    { id: 1, schoolid: "2020-4234", name: "Raul", email: "Raul@paterostechnologicalcollege.edu.ph",  item: "PE Uniform", status: "Pending" },
	 { id: 2, schoolid: "2021-3234", name: "Mark", email: "Snkeekers@paterostechnologicalcollege.edu.ph",  item: "Uniform", status: "Pending" },
	  { id: 3, schoolid: "2020-2132", name: "Zeus", email: "Zpip@paterostechnologicalcollege.edu.ph",  item: "NSTP", status: "Pending" },
	   { id: 4, schoolid: "2022-3213", name: "Faker", email: "fika@paterostechnologicalcollege.edu.ph",  item: "ID LACES", status: "Pending" },
	    { id: 5, schoolid: "2023-4122", name: "Huni", email: "penat@paterostechnologicalcollege.edu.ph",  item: "PE UNIFORM", status: "Pending" },
];

let kioskOrders = [
    { id: 1, schoolid: "2020-2134", name: "Mike", email: "ssd@paterostechnologicalcollege.edu.ph",  item: "Uniform", status: "Pending" },
	 { id: 2, schoolid: "2021-1123", name: "wilfredo", email: "mik@paterostechnologicalcollege.edu.ph",  item: "PE Uniform", status: "Pending" },
	  { id: 3, schoolid: "2020-1421", name: "Sani", email: "sik@paterostechnologicalcollege.edu.ph",  item: "ID LACES", status: "Pending" },
	   { id: 4, schoolid: "2022-3213", name: "Berto", email: "priks@paterostechnologicalcollege.edu.ph",  item: "NSTP", status: "Pending" },
	    { id: 5, schoolid: "2023-12321", name: "Lronar", email: "kin@paterostechnologicalcollege.edu.ph",  item: "ID LACES", status: "Pending" },
		{ id: 6, schoolid: "2020-3124", name: "Peyz", email: "pis@paterostechnologicalcollege.edu.ph",  item: "PE Uniform", status: "Pending" },
	 { id: 7, schoolid: "2021-4232", name: "Unis", email: "uns@paterostechnologicalcollege.edu.ph",  item: "ID LACES", status: "Pending" },
	  { id: 8, schoolid: "2020-4122", name: "Angel", email: "ang@paterostechnologicalcollege.edu.ph",  item: "NSTP", status: "Pending" },
	   { id: 9, schoolid: "2022-1421", name: "Sirn", email: "sn@paterostechnologicalcollege.edu.ph",  item: "ID LACES", status: "Pending" },
	    { id: 10, schoolid: "2023-1124", name: "Mark", email: "mrk@paterostechnologicalcollege.edu.ph",  item: "PE UNIFORM", status: "Pending" },
];

let items = [
    { id: 1, name: "School Uniform", price: 350, size: "L", quantity:38, details: "daj hduawh duhawu hd"},
];

let accounts = [
    { id: 1, name: "Admin 1", role: "Admin", password: "12345" }
];


let editingAccountId = null;

let salesData = [
    { id: 1, receipt: "R-1001", name: "Juan Dela Cruz", item: "School Uniform", qty: 1, price: 550, date: "2025-02-01" },
    { id: 2, receipt: "R-1002", name: "Maria Santos", item: "PE Uniform", qty: 2, price: 500, date: "2025-02-01" },
    { id: 3, receipt: "R-1003", name: "Mark Reyes", item: "ID Lace", qty: 3, price: 60, date: "2025-01-30" },
    { id: 4, receipt: "R-1004", name: "Ana Lopez", item: "T-Shirt", qty: 1, price: 250, date: "2025-01-17" }
];

let appointments = [
    { id: 1, schoolID: "2020-7654", name: "Carlo", date: "2025-12-01" },
];
/* -------------------- LOAD TABLES ------------------------- */

function loadTables() {
    loadOnlineOrders();
    loadKioskOrders();
    loadItems();
    loadAccounts();
    loadAppointments();
    updateSales();
}



function toggleGroup(id) {
    document.getElementById(id).classList.toggle("hidden");
}



// DASHBOARD
function updateDashboard() {
    document.getElementById("onlineOrdersCount").innerText = onlineOrders.length;
    document.getElementById("kioskOrdersCount").innerText = kioskOrders.length;
    document.getElementById("itemsCount").innerText = items.length;
    document.getElementById("accountsCount").innerText = accounts.length;
    document.getElementById("appointmentsCount").innerText = appointments.length;

    // Ensure price is a number
    let totalSales = salesData.reduce((sum, s) => sum + Number(s.price || 0), 0);

    // Update the correct element ID
    const totalSalesEl = document.getElementById("totalSalesDashboard");
    if (totalSalesEl) {
        totalSalesEl.innerText = `₱${totalSales}`;
    }
}

// Call on page load or when data changes
window.addEventListener("load", updateDashboard);






//  ONLINE/KIOSK ORDER
function loadOrdersSplit(type) {
    let list = type === "online" ? onlineOrders : kioskOrders;

    let pending = document.querySelector(`#${type}Pending tbody`);
    let ready = document.querySelector(`#${type}Ready tbody`);
    let completed = document.querySelector(`#${type}Completed tbody`);
    let cancelled = document.querySelector(`#${type}Cancelled tbody`);

    pending.innerHTML = "";
    ready.innerHTML = "";
    completed.innerHTML = "";
    cancelled.innerHTML = "";

    list.forEach(o => {
        let row = `
            <tr>
                <td>${o.id}</td>
                <td>${o.schoolid}</td>
                <td>${o.name}</td>
                <td>${o.email}</td>
                <td>${o.item}</td>
                <td>${o.status}</td>
                <td>
                    <button onclick="setStatus('${type}',${o.id},'Ready')">Ready</button>
                    <button onclick="setStatus('${type}',${o.id},'Completed')">Done</button>
                    <button onclick="setStatus('${type}',${o.id},'Cancelled')" class="danger">Cancel</button>
                </td>
            </tr>
        `;

        if (o.status === "Pending") pending.innerHTML += row;
        else if (o.status === "Ready") ready.innerHTML += row;
        else if (o.status === "Completed") completed.innerHTML += row;
        else if (o.status === "Cancelled") cancelled.innerHTML += row;
    });
}

function setStatus(type, id, newStatus) {
    let orders = type === "online" ? onlineOrders : kioskOrders;
    let order = orders.find(o => o.id === id);
    order.status = newStatus;
    loadTables();
}

function loadTables() {
    loadOrdersSplit("online");
    loadOrdersSplit("kiosk");
    loadItems();
    loadAccounts();
    loadAppointments();
    updateSales();
}


window.onload = loadTables;








/// MANAGE ITEMS 


function loadItems() {
    const tbody = document.querySelector("#itemsTable tbody");
    tbody.innerHTML = items.map(i =>
        `<tr>
            <td>${i.id}</td>
            <td>${i.name}</td>
            <td>₱${i.price}</td>
			<td>${i.size}</td>
			<td>${i.quantity}</td>
			<td>${i.details}</td>
            <td>
                <button onclick="editItem(${i.id})">Edit</button>
                <button class="danger" onclick="deleteItem(${i.id})">Delete</button>
            </td>
        </tr>`
    ).join("");
}


// global editingId already declared elsewhere
let editingId = null;

function openItemForm() {
  editingId = null;
  const modal = document.getElementById("itemForm");
  modal.style.display = "flex";
  document.getElementById("formTitle").innerText = "Add Item";

  document.getElementById("itemName").value = "";
  document.getElementById("itemPrice").value = "";
  document.getElementById("itemSize").value = "";
  document.getElementById("itemQuantity").value = "";
  document.getElementById("itemDetails").value = "";

  document.getElementById("itemName").focus();
}


function editItem(id) {
  editingId = Number(id);
  const item = items.find(i => Number(i.id) === editingId);

  if (!item) {
    alert("Item not found. It may have been removed.");
    return;
  }

  const modal = document.getElementById("itemForm");
  modal.style.display = "flex";
  document.getElementById("formTitle").innerText = "Edit Item";

  document.getElementById("itemName").value = item.name;
  document.getElementById("itemPrice").value = item.price;
  document.getElementById("itemSize").value = item.size;
  document.getElementById("itemQuantity").value = item.quantity;
  document.getElementById("itemDetails").value = item.details;

  document.getElementById("itemName").focus();
}


function saveItem() {
  const name = document.getElementById("itemName").value.trim();
  const price = parseFloat(document.getElementById("itemPrice").value);
  const size = document.getElementById("itemSize").value.trim();
  const quantity = parseInt(document.getElementById("itemQuantity").value);
  const details = document.getElementById("itemDetails").value.trim();

  if (!name || isNaN(price) || !size || isNaN(quantity)) {
    return alert("Please fill in all fields correctly.");
  }

  if (editingId) {
    let it = items.find(i => Number(i.id) === editingId);
    it.name = name;
    it.price = price;
    it.size = size;
    it.quantity = quantity;
    it.details = details;
  } else {
    const newId = items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;
    items.push({
      id: newId,
      name,
      price,
      size,
      quantity,
      details
    });
  }

  closeItemForm();
  loadItems();
}

function closeItemForm() {
  document.getElementById("itemForm").style.display = "none";
  editingId = null;
}

// ----------------- DELETE ITEM -----------------
function deleteItem(id) {
 
  const itemId = Number(id);

  if (!confirm("Are you sure you want to delete this item?")) return;

  items = items.filter(i => Number(i.id) !== itemId);

  if (editingId && Number(editingId) === itemId) {
    closeItemForm();
  }


  loadItems();
}










// ACCOUNTS 
function loadAccounts() {
    const tbody = document.querySelector("#accountsTable tbody");
    tbody.innerHTML = accounts.map(a =>
        `<tr>
            <td>${a.id}</td>
            <td>${a.name}</td>
            <td>${a.role}</td>
            <td>${a.password}</td>
            <td>
                <button onclick="editAccount(${a.id})">Edit</button>
                <button class="danger" onclick="deleteAccount(${a.id})">Delete</button>
            </td>
        </tr>`
    ).join("");
}

function openAccountForm() {
    editingAccountId = null;
    const modal = document.getElementById("accountForm");
    modal.style.display = "flex";

    document.getElementById("accountFormTitle").innerText = "Add Account";
    document.getElementById("accountName").value = "";
    document.getElementById("accountPassword").value = "";
    document.getElementById("accountRole").value = "";
}

function editAccount(id) {
    editingAccountId = Number(id);
    const account = accounts.find(a => a.id === editingAccountId);
    if (!account) return alert("Account not found.");

    const modal = document.getElementById("accountForm");
    modal.style.display = "flex";

    document.getElementById("accountFormTitle").innerText = "Edit Account";
    document.getElementById("accountName").value = account.name;
    document.getElementById("accountPassword").value = account.password;
    document.getElementById("accountRole").value = account.role;
}

function saveAccount() {
    const name = document.getElementById("accountName").value.trim();
    const password = document.getElementById("accountPassword").value.trim();
    const role = document.getElementById("accountRole").value;

    if (!name || !password || !role) {
        alert("Please fill all fields.");
        return;
    }

    if (editingAccountId) {
        let acc = accounts.find(a => a.id === editingAccountId);
        acc.name = name;
        acc.password = password;
        acc.role = role;
    } else {
        const newId = accounts.length ? Math.max(...accounts.map(a => a.id)) + 1 : 1;
        accounts.push({
            id: newId,
            name,
            password,
            role
        });
    }

    closeAccountForm();
    loadAccounts();
}

function closeAccountForm() {
    document.getElementById("accountForm").style.display = "none";
    editingAccountId = null;
}

function deleteAccount(id) {
    if (!confirm("Delete this account?")) return;
    accounts = accounts.filter(a => a.id !== id);
    loadAccounts();
}


// INIT 
window.onload = () => {
    loadTables();
    loadItems();
    loadAccounts();
    loadAppointments();
    updateSales();
};








// SALES 

function normalizeDate(dateString) {
    let d = new Date(dateString);
    if (isNaN(d)) return null;

    let month = String(d.getMonth() + 1).padStart(2, "0");
    let day = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${month}-${day}`;
}

// Convert all dates to correct format 
salesData = salesData.map(s => ({
    ...s,
    date: normalizeDate(s.date)
}));


// SALES TABLE 
function loadSalesTable(data = salesData) {
    const tbody = document.querySelector("#salesTable tbody");
    tbody.innerHTML = data.map(s => `
        <tr>
            <td>${s.receipt}</td>
            <td>${s.name}</td>
            <td>${s.item}</td>
            <td>${s.qty}</td>
            <td>₱${s.price}</td>
            <td>${s.date}</td>
        </tr>
    `).join("");
}


// SALES COUNTERS (Today / Week / Month / Total) 
function calculateSales(data = salesData) {
    let today = new Date().toISOString().split("T")[0];
    let now = new Date();

    // WEEK START (MONDAY) 
    let weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay() + 1);

    let month = now.getMonth() + 1;

    let todaySales = 0;
    let weekSales = 0;
    let monthSales = 0;
    let totalSales = 0;

    data.forEach(s => {
        let d = new Date(s.date);

        totalSales += s.price;

        if (s.date === today) todaySales += s.price;

        if (d >= weekStart && d <= now) weekSales += s.price;

        if (d.getMonth() + 1 === month) monthSales += s.price;
    });

    document.getElementById("todaySales").innerText = `₱${todaySales}`;
    document.getElementById("weekSales").innerText = `₱${weekSales}`;
    document.getElementById("monthSales").innerText = `₱${monthSales}`;
    document.getElementById("totalSales").innerText = `₱${totalSales}`;
}


// DATE FILTER 
function filterByDate() {
    let from = document.getElementById("dateFrom").value;
    let to = document.getElementById("dateTo").value;

    let result = salesData.filter(s => {
        let d = new Date(s.date);
        return (!from || d >= new Date(from)) &&
               (!to || d <= new Date(to));
    });

    loadSalesTable(result);
    calculateSales(result);
}

// SEARCH BAR 
document.getElementById("searchSales").addEventListener("keyup", () => {
    let keyword = document.getElementById("searchSales").value.toLowerCase();

    let result = salesData.filter(s =>
        s.receipt.toLowerCase().includes(keyword) ||
        s.name.toLowerCase().includes(keyword) ||
        s.item.toLowerCase().includes(keyword)
    );

    loadSalesTable(result);
    calculateSales(result);
});


 // FILTER BUTTON 
document.getElementById("filterBtn").addEventListener("click", filterByDate);


//PAGE LOAD 
window.onload = () => {
    loadSalesTable();
    calculateSales();
};
  
  
  

//APPOINTMENTS 
function loadAppointments() {
    const tbody = document.querySelector("#appointmentTable tbody");
    tbody.innerHTML = appointments.map(a =>
        `<tr>
            <td>${a.id}</td>
            <td>${a.schoolID}</td>
            <td>${a.name}</td>
            <td><span class="date-tag">${a.date}</span></td>
            <td class="action-buttons">
                <button class="btn-resched" onclick="resched(${a.id})">Reschedule</button>
                <button class="btn-postpone" onclick="postpone(${a.id})">Postpone</button>
            </td>
        </tr>`
    ).join("");
}

function resched(id) {
    let newDate = prompt("Enter new date (YYYY-MM-DD):");
    if (newDate) {
        appointments.find(a => a.id === id).date = newDate;
        loadAppointments();
    }
}

function postpone(id) {
    alert("Appointment postponed!");
}

// INIT 
loadTables();
