// Select the form
const form = document.getElementById("contact-form");

form.addEventListener("submit", function(event) {
    event.preventDefault(); // prevent page reload

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Simple validation
    if (name === "" || email === "" || message === "") {
        alert("Please fill out all fields.");
        return;
    }

    // Validate email format
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Simulate sending message
    alert(`Thank you, ${name}! Your message has been sent.`);

    // Reset form
    form.reset();
});
