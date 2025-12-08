
const form = document.getElementById("contact-form");

form.addEventListener("submit", function(event) {
    event.preventDefault(); 

  
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || message === "") {
        alert("Please fill out all fields.");
        return;
    }

 
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

  
    alert(`Thank you, ${name}! Your message has been sent.`);

    form.reset();
});
