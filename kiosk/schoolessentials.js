/* ============================================================
   DROPDOWN MENU
============================================================ */
function toggleDropdown() {
    document.getElementById("dropdown-menu").classList.toggle("show");
}

/* ============================================================
   SLIDESHOW
============================================================ */
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

function showSlides() {
    slides.forEach(s => s.classList.remove("active"));
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].classList.add("active");
}

setInterval(showSlides, 3000);

/* ============================================================
   CAROUSEL + FILTERING
============================================================ */
const filterButtons = document.querySelectorAll(".filter-btn");
const carousel = document.querySelector(".carousel");
let items = Array.from(document.querySelectorAll(".carousel-item"));
let filteredItems = items;
let currentIndex = 0;

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;

        filteredItems = items.filter(item =>
            filter === "all" ? true : item.dataset.type === filter
        );

        items.forEach(i => i.style.display = "none");
        filteredItems.forEach(i => i.style.display = "flex");

        currentIndex = 0;
        updateCarousel();
    });
});

function updateCarousel() {
    filteredItems.forEach((item, idx) => {
        item.style.transform = `translateX(${(idx - currentIndex) * 320}px)`;
    });
}

document.querySelector(".next").addEventListener("click", () => {
    if (currentIndex < filteredItems.length - 1) currentIndex++;
    updateCarousel();
});

document.querySelector(".prev").addEventListener("click", () => {
    if (currentIndex > 0) currentIndex--;
    updateCarousel();
});

/* ============================================================
   QUANTITY BUTTONS
============================================================ */
document.querySelectorAll(".carousel-item").forEach(item => {
    const minus = item.querySelector(".minus");
    const plus = item.querySelector(".plus");
    const qtyDisplay = item.querySelector(".qty");

    minus.addEventListener("click", () => {
        let q = parseInt(qtyDisplay.textContent);
        if (q > 1) qtyDisplay.textContent = q - 1;
    });

    plus.addEventListener("click", () => {
        let q = parseInt(qtyDisplay.textContent);
        qtyDisplay.textContent = q + 1;
    });
});

/* ============================================================
   MINI CART SYSTEM (localStorage)
============================================================ */
let cartData = JSON.parse(localStorage.getItem("cartData") || "[]");

function updateMiniCart() {
    const countSpan = document.getElementById("cart-count");
    countSpan.textContent = cartData.reduce((sum, item) => sum + item.qty, 0);

    const cartItemsDiv = document.querySelector("#mini-cart .cart-items");
    const totalEl = document.getElementById("cart-total");

    cartItemsDiv.innerHTML = "";
    let total = 0;

    cartData.forEach((item, index) => {
        const row = document.createElement("div");
        row.className = "cart-row";
        row.innerHTML = `
            <img src="${item.img}" alt="${item.name}" class="cart-img">
            <span>${item.name} x${item.qty}</span>
            <span>₱${item.qty * item.price}</span>
            <button class="remove-item" data-index="${index}">✕</button>
        `;
        cartItemsDiv.appendChild(row);

        total += item.qty * item.price;
    });

    totalEl.textContent = total;

    // Remove button
    document.querySelectorAll(".remove-item").forEach(btn => {
        btn.addEventListener("click", () => {
            cartData.splice(btn.dataset.index, 1);
            localStorage.setItem("cartData", JSON.stringify(cartData));
            updateMiniCart();
        });
    });
}

/* ============================================================
   ADD TO CART BUTTONS
============================================================ */
document.querySelectorAll(".add-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const itemDiv = btn.closest(".carousel-item");
        const name = itemDiv.querySelector(".item-name").textContent;
        const price = parseFloat(itemDiv.querySelector(".item-price").textContent.replace("₱",""));
        const qty = parseInt(itemDiv.querySelector(".qty").textContent);
        const img = itemDiv.querySelector("img").src;

        // Check if item already exists
        const existing = cartData.find(i => i.name === name);
        if (existing) {
            existing.qty += qty;
        } else {
            cartData.push({ name, price, qty, img });
        }

        localStorage.setItem("cartData", JSON.stringify(cartData));
        updateMiniCart();
        alert(`${name} added to cart!`);
    });
});

/* ============================================================
   MINI CART OPEN/CLOSE
============================================================ */
document.getElementById("cart-toggle").addEventListener("click", () => {
    document.getElementById("mini-cart").classList.add("open");
});

document.getElementById("close-cart").addEventListener("click", () => {
    document.getElementById("mini-cart").classList.remove("open");
});

/* ============================================================
   INIT
============================================================ */
filterButtons[0].click();   // Default "All"
updateMiniCart();
showSlides();
