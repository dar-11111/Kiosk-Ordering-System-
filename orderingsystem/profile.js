function openTab(tabId) {
    document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
    document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));

    document.getElementById(tabId).classList.add("active");
    event.target.classList.add("active");
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}