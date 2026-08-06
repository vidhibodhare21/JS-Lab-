const form = document.getElementById('billForm');
const resultBox = document.getElementById('result');
const addProductBtn = document.getElementById('addProductBtn');
const productRows = document.getElementById('productRows');

function createProductRow() {
  const row = document.createElement('div');
  row.className = 'product-row';
  row.innerHTML = `
    <label>
      Product Name
      <input type="text" class="product-no" placeholder="Enter product name" />
    </label>
    <label>
      Quantity (kg)
      <input type="number" class="quantity" min="0" step="0.1" value="1" />
    </label>
    <label>
      Rate per kg (₹)
      <input type="number" class="rate" min="0" step="0.01" value="0" />
    </label>
    <label>
      Discount (%)
      <input type="number" class="item-discount" min="0" step="0.01" value="0" />
    </label>
    <button type="button" class="remove-product-btn">Remove</button>
  `;
  productRows.appendChild(row);
}

function getProducts() {
  return Array.from(productRows.querySelectorAll('.product-row')).map((row) => ({
    productName: row.querySelector('.product-no').value.trim() || 'Unnamed Product',
    quantity: parseFloat(row.querySelector('.quantity').value) || 0,
    rate: parseFloat(row.querySelector('.rate').value) || 0,
    discount: parseFloat(row.querySelector('.item-discount').value) || 0,
  }));
}

addProductBtn.addEventListener('click', createProductRow);

productRows.addEventListener('click', function (event) {
  if (event.target.classList.contains('remove-product-btn')) {
    event.target.closest('.product-row').remove();
  }
});

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const customerName = document.getElementById('customerName').value.trim();
  const mobile = document.getElementById('mobile').value.trim();
  const invoiceNo = document.getElementById('invoiceNo').value.trim();
  const discountPercent = parseFloat(document.getElementById('discount').value) || 0;
  const gstPercent = parseFloat(document.getElementById('gst').value) || 0;
  const packing = parseFloat(document.getElementById('packing').value) || 0;
  const paymentMode = document.getElementById('paymentMode').value;
  const membership = document.querySelector('input[name="membership"]:checked').value;

  const products = getProducts();

  if (products.length === 0 || products.every((item) => item.quantity === 0 && item.rate === 0)) {
    resultBox.innerHTML = `
      <h2>Invoice Summary</h2>
      <p>Add at least one product with quantity and rate.</p>
    `;
    return;
  }

  const subtotal = products.reduce((sum, item) => sum + item.quantity * item.rate, 0);
  const discountAmount = subtotal * (discountPercent / 100);
  const taxableAmount = subtotal - discountAmount;
  const gstAmount = taxableAmount * (gstPercent / 100);
  const totalAmount = taxableAmount + gstAmount + packing;

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(value);

  const productList = products
    .map((item) => {
      const lineSubtotal = item.quantity * item.rate;
      const lineDiscount = lineSubtotal * (item.discount / 100);
      const lineTotal = lineSubtotal - lineDiscount;
      return `<li><strong>${item.productName}</strong> — Qty: ${item.quantity.toFixed(2)} kg, Rate: ${formatCurrency(item.rate)}, Line Total: ${formatCurrency(lineTotal)}</li>`;
    })
    .join('');

  resultBox.innerHTML = `
    <h2>Invoice Summary</h2>
    <ul>
      <li><strong>Customer Name:</strong> ${customerName}</li>
      <li><strong>Mobile No:</strong> ${mobile}</li>
      <li><strong>Invoice No:</strong> ${invoiceNo}</li>
      <li><strong>Discount:</strong> ${discountPercent.toFixed(2)}%</li>
      <li><strong>GST:</strong> ${gstPercent.toFixed(2)}%</li>
      <li><strong>Packing Charges:</strong> ${formatCurrency(packing)}</li>
      <li><strong>Payment Mode:</strong> ${paymentMode}</li>
      <li><strong>Membership:</strong> ${membership}</li>
    </ul>
    <h3>Products</h3>
    <ul>${productList}</ul>
    <p><strong>Subtotal:</strong> ${formatCurrency(subtotal)}</p>
    <p><strong>Discount Amount:</strong> ${formatCurrency(discountAmount)}</p>
    <p><strong>GST Amount:</strong> ${formatCurrency(gstAmount)}</p>
    <p><strong>Total Payable:</strong> ${formatCurrency(totalAmount)}</p>
  `;
});

createProductRow();
