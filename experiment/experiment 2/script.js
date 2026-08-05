const form = document.getElementById('billingForm');
const addProductButton = document.getElementById('addProductButton');
const productsContainer = document.getElementById('productsContainer');
const resultSection = document.getElementById('result');
const summaryText = document.getElementById('summaryText');
const subtotalValue = document.getElementById('subtotalValue');
const taxValue = document.getElementById('taxValue');
const totalValue = document.getElementById('totalValue');

let productIndex = 1;

function formatMoney(amount) {
  return `$${amount.toFixed(2)}`;
}

function createProductRow() {
  productIndex += 1;
  const row = document.createElement('div');
  row.className = 'product-row';

  row.innerHTML = `
    <label>
      Item Description
      <input type="text" class="productDescription" placeholder="Product ${productIndex}" required />
    </label>

    <label>
      Price per Item ($)
      <input type="number" class="productPrice" min="0" step="0.01" value="0.00" required />
    </label>

    <label>
      Quantity
      <input type="number" class="productQuantity" min="1" step="1" value="1" required />
    </label>
  `;

  return row;
}

addProductButton.addEventListener('click', function handleAddProduct() {
  const productRow = createProductRow();
  productsContainer.appendChild(productRow);
});

form.addEventListener('submit', function handleSubmit(event) {
  event.preventDefault();

  const customerName = document.getElementById('customerName').value.trim();
  const taxRate = Number(document.getElementById('taxRate').value);

  const descriptions = Array.from(document.querySelectorAll('.productDescription')).map((input) => input.value.trim());
  const prices = Array.from(document.querySelectorAll('.productPrice')).map((input) => Number(input.value));
  const quantities = Array.from(document.querySelectorAll('.productQuantity')).map((input) => Number(input.value));

  const productLines = descriptions.map((description, index) => {
    const price = prices[index];
    const quantity = quantities[index];
    return { description, price, quantity };
  });

  let subtotal = 0;
  productLines.forEach(({ price, quantity }) => {
    subtotal += price * quantity;
  });

  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;

  const lineList = productLines.map(({ description, price, quantity }) => {
    return `${quantity} × ${description} @ ${formatMoney(price)}`;
  }).join(', ');

  summaryText.textContent = `Hi ${customerName || 'Customer'}, your bill includes ${productLines.length} product${productLines.length === 1 ? '' : 's'}: ${lineList}.`;
  subtotalValue.textContent = formatMoney(subtotal);
  taxValue.textContent = formatMoney(tax);
  totalValue.textContent = formatMoney(total);

  resultSection.classList.remove('hidden');
});
