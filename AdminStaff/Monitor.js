function loadMonitorOrders() {
    const container = document.getElementById("orderList");
    container.innerHTML = "";

    // Get orders from localStorage (saved by staff panel)
    let ordersData = JSON.parse(localStorage.getItem('orders')) || [];

    // Sort by priority: Pending -> Ready -> Completed -> Cancelled
    const priority = { "Pending": 1, "Ready": 2, "Completed": 3, "Cancelled": 4 };
    ordersData.sort((a, b) => priority[a.status] - priority[b.status]);

    ordersData.forEach(o => {
        const card = document.createElement("div");
        card.className = `card ${o.status.toLowerCase()}`;
        card.innerHTML = `
            <h2>Order #${o.id}</h2>
            <p><strong>Source:</strong> ${o.source}</p>
            <p><strong>Item:</strong> ${o.item}</p>
            <p><strong>Qty:</strong> ${o.qty}</p>
            <p><strong>Status:</strong> ${o.status}</p>
        `;
        container.appendChild(card);
    });
}

// Refresh orders every second
setInterval(loadMonitorOrders, 1000);

// Initial load
loadMonitorOrders();


function updateStatus(id, newStatus) {
    const order = orders.find(o => o.id === id);
    if (order) order.status = newStatus;

    // Save updated orders to localStorage
    localStorage.setItem('orders', JSON.stringify(orders));

    loadOrders();
    updateReports();
}
