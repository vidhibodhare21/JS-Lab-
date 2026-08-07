let cartItems = [
  { id: 1, name: "Coffee Beans", price: 450, quantity: 2 },
  { id: 2, name: "Ceramic Mug", price: 650, quantity: 1 },
  { id: 3, name: "Notebook", price: 220, quantity: 3 },
];

let appliedCoupon = "";

const cartItemsContainer = document.getElementById("cart-items");
const addItemForm = document.getElementById("add-item-form");
const customerNameEl = document.getElementById("customer-name");
const customerPhoneEl = document.getElementById("customer-phone");
const customerAddressEl = document.getElementById("customer-address");
const itemNameInput = document.getElementById("item-name");
const itemPriceInput = document.getElementById("item-price");
const itemQuantityInput = document.getElementById("item-quantity");
const couponInput = document.getElementById("coupon");
const applyCouponButton = document.getElementById("apply-coupon");
const itemCountEl = document.getElementById("item-count");
const subtotalEl = document.getElementById("subtotal");
const discountEl = document.getElementById("discount");
const totalEl = document.getElementById("total");

function formatCurrency(value) {
  return `₹${value.toFixed(0)}`;
}

function renderCart() {
  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty">Your cart is empty.</p>';
    return;
  }

  cartItemsContainer.innerHTML = cartItems
    .map(
      (item) => `
        <article class="cart-item">
          <div>
            <h3>${item.name}</h3>
            <p>${formatCurrency(item.price)} each</p>
          </div>
          <div class="controls">
            <button class="qty-btn" data-action="decrease" data-id="${item.id}">−</button>
            <span>${item.quantity}</span>
            <button class="qty-btn" data-action="increase" data-id="${item.id}">+</button>
          </div>
          <button class="remove-btn" data-action="remove" data-id="${item.id}">Remove</button>
        </article>
      `
    )
    .join("");
}

function updateSummary() {
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let discountPercent = 0;
  const hasCoupon = appliedCoupon.trim().toUpperCase() === "SAVE10";

  if (subtotal >= 1000) {
    discountPercent = 0.2;
  } else if (subtotal >= 500) {
    discountPercent = 0.1;
  } else if (subtotal >= 300) {
    discountPercent = 0.05;
  }

  if (hasCoupon) {
    discountPercent = Math.max(discountPercent, 0.1);
  }

  const discount = subtotal * discountPercent;
  const total = subtotal - discount;

  itemCountEl.textContent = itemCount;
  subtotalEl.textContent = formatCurrency(subtotal);
  discountEl.textContent = formatCurrency(discount);
  totalEl.textContent = formatCurrency(total);
}

function changeQuantity(id, action) {
  const foundItem = cartItems.find((item) => item.id === id);

  if (!foundItem) return;

  if (action === "increase") {
    foundItem.quantity += 1;
  } else if (action === "decrease") {
    foundItem.quantity = Math.max(0, foundItem.quantity - 1);
  }

  if (foundItem.quantity === 0) {
    cartItems = cartItems.filter((item) => item.id !== id);
  }

  renderCart();
  updateSummary();
}

cartItemsContainer.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button) return;

  const id = Number(button.dataset.id);
  const action = button.dataset.action;

  if (action === "increase" || action === "decrease") {
    changeQuantity(id, action);
  } else if (action === "remove") {
    cartItems = cartItems.filter((item) => item.id !== id);
    renderCart();
    updateSummary();
  }
});

applyCouponButton.addEventListener("click", () => {
  appliedCoupon = couponInput.value;
  updateSummary();
});

addItemForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newItem = {
    id: Date.now(),
    name: itemNameInput.value.trim(),
    price: Number(itemPriceInput.value),
    quantity: Number(itemQuantityInput.value),
    customerName: customerNameEl.textContent.trim(),
    customerPhone: customerPhoneEl.textContent.trim(),
    customerAddress: customerAddressEl.textContent.trim(),
  };

  if (!newItem.name || !newItem.price || !newItem.quantity) {
    return;
  }

  cartItems = [...cartItems, newItem];
  addItemForm.reset();
  itemQuantityInput.value = 1;
  renderCart();
  updateSummary();
});

renderCart();
updateSummary();
