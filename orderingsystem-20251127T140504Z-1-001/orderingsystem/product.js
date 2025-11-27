// FILTER FUNCTION
const filter = document.getElementById("category-filter");
const cards = document.querySelectorAll(".product-card");

filter.addEventListener("change", () => {
  const selected = filter.value;

  cards.forEach(card => {
    if (selected === "all" || card.dataset.category === selected) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
});

// QUANTITY BUTTON LOGIC
document.querySelectorAll(".product-card").forEach(card => {
  const minus = card.querySelector(".minus");
  const plus = card.querySelector(".plus");
  const input = card.querySelector("input");

  minus.addEventListener("click", () => {
    if (input.value > 1) input.value--;
  });

  plus.addEventListener("click", () => {
    input.value++;
  });

  // ADD TO CART BUTTON LOGIC
  const addCartButton = card.querySelector(".add-cart");

  addCartButton.addEventListener("click", () => {
    const product = {
      name: card.querySelector("h3").textContent,
      price: card.querySelector(".price").textContent,
      quantity: parseInt(input.value),
      image: card.querySelector("img").src
    };

    // Get the current cart from localStorage or initialize an empty array
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if product already exists in cart, if yes, update the quantity
    const existingProductIndex = cart.findIndex(item => item.name === product.name);
    if (existingProductIndex >= 0) {
      cart[existingProductIndex].quantity += product.quantity;
    } else {
      cart.push(product);
    }

    // Save updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Optionally, alert the user that the item has been added
    alert(`${product.name} has been added to your cart.`);
  });
});



