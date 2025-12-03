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

  const addCartButton = card.querySelector(".add-cart");

  addCartButton.addEventListener("click", () => {

    // SIZE HANDLING
    const sizeSelect = card.querySelector(".size-select");
    const size = sizeSelect ? sizeSelect.value : "N/A";

    const product = {
      name: card.querySelector("h3").textContent,
      price: card.querySelector(".price").textContent,
      quantity: parseInt(input.value),
      size: size,
      image: card.querySelector("img").src
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if same product + same size exists
    const existingProductIndex = cart.findIndex(
      item => item.name === product.name && item.size === size
    );

    if (existingProductIndex >= 0) {
      cart[existingProductIndex].quantity += product.quantity;
    } else {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${product.name} (Size: ${size}) added to cart.`);
  });
});
