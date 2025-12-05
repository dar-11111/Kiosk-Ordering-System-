
document.querySelectorAll("nav a").forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add("active");
    }
});


function goToProducts() {
    window.location.href = "product.html";
}


document.addEventListener("DOMContentLoaded", () => {
    const heroContent = document.querySelector(".hero-content");
    heroContent.style.opacity = 0;
    heroContent.style.transform = "translateY(20px)";

    setTimeout(() => {
        heroContent.style.transition = "0.7s ease-in-out";
        heroContent.style.opacity = 1;
        heroContent.style.transform = "translateY(0)";
    }, 200);
});


window.addEventListener("scroll", () => {
    const header = document.querySelector("header");

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});
