function openTab(tabId) {
    document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
    document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));

    document.getElementById(tabId).classList.add("active");
    event.target.classList.add("active");
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

// LOAD PROFILE FROM LOGIN
window.onload = function() {
    const name = localStorage.getItem("userName");
    const id = localStorage.getItem("userID");
    const email = localStorage.getItem("userEmail");
    const contact = localStorage.getItem("userContact");

    if (name) document.getElementById("profileName").textContent = name;
    if (email) document.getElementById("profileEmail").textContent = email;
    if (id) document.getElementById("profileID").textContent = id;
    if (contact) document.getElementById("profileContact").textContent = contact;
};

// LOGOUT FUNCTION
function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}
