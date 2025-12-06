// --- SELECTORS ---
const formBox = document.querySelector('.form-box');
const inputs = formBox.querySelectorAll('input');
const proceedBtn = document.querySelector('.btn');

// --- AUTO-FILL FROM LOCALSTORAGE ---
window.addEventListener('load', () => {
    inputs.forEach((input, index) => {
        const key = `walkin_input_${index}`;
        const savedValue = localStorage.getItem(key);
        if (savedValue !== null) {
            input.value = savedValue;
        }
    });
});

// --- SAVE INPUTS TO LOCALSTORAGE ---
inputs.forEach((input, index) => {
    input.addEventListener('input', () => {
        localStorage.setItem(`walkin_input_${index}`, input.value);
    });
});

// --- VALIDATE INPUT FIELDS ---
function validateInputs() {
    const name = inputs[0].value.trim();
    const schoolID = inputs[1].value.trim();
    const email = inputs[2].value.trim();
    const contact = inputs[3].value.trim();

    // Required fields check
    if (!name || !schoolID || !email || !contact) {
        alert("Please fill up all fields.");
        return false;
    }

    // Email format
    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailCheck.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // Contact number: 7–12 digits
    const contactCheck = /^\d{7,12}$/;
    if (!contactCheck.test(contact)) {
        alert("Please enter a valid contact number (7-12 digits).");
        return false;
    }

    // School ID: letters, numbers, hyphen only
    const schoolIDCheck = /^[A-Za-z0-9\-]+$/;
    if (!schoolIDCheck.test(schoolID)) {
        alert("Please enter a valid School ID (letters, numbers, and hyphen only).");
        return false;
    }

    return true;
}

// --- PROCEED BUTTON CLICK ---
proceedBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    // Fade-out animation
    formBox.style.transition = 'opacity 0.5s ease-out';
    formBox.style.opacity = '0';

    setTimeout(() => {
        window.location.href = proceedBtn.getAttribute("href");
    }, 500);
});

// --- LOGOUT FUNCTION ---
function logout() {
    if (confirm("Are you sure you want to logout?")) {
        // Clear all stored data
        localStorage.clear();
        sessionStorage.clear();

        // Redirect back to walk-in page
        window.location.href = "walkin.html";
    }
}
