let products = [];

const addProductBtn = document.getElementById('addProductBtn');
const productModal = document.getElementById('productModal');
const closeButton = document.querySelector('.close-button');
const productForm = document.getElementById('productForm');
const productIndexInput = document.getElementById('productIndex');
const productNameInput = document.getElementById('productName');
const productQuantityInput = document.getElementById('productQuantity');
const productPriceInput = document.getElementById('productPrice');

addProductBtn.addEventListener('click', () => {
  productForm.reset();
  productIndexInput.value = '';
  productModal.style.display = 'block';
});

closeButton.addEventListener('click', () => {
  productModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === productModal) {
    productModal.style.display = 'none';
  }
});

productForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = productNameInput.value;
  const quantity = parseInt(productQuantityInput.value);
  const price = parseFloat(productPriceInput.value);
  const total = (price * quantity).toFixed(2);

  if (productIndexInput.value === '') {
    // Add product
    products.push({ name, quantity, price, total });
  } else {
    // Edit product
    const index = parseInt(productIndexInput.value);
    products[index] = { name, quantity, price, total };
  }
  renderTable();
  productModal.style.display = 'none';
});

function renderTable() {
  const tbody = document.querySelector("#productTable tbody");
  tbody.innerHTML = "";

  products.forEach((product, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.quantity}</td>
      <td>$${product.price}</td>
      <td>$${product.total}</td>
      <td class="actions">
        <button class="btn" onclick="editProduct(${index})">✏️ Edit</button>
        <button class="btn" style="background-color:#ef4444" onclick="deleteProduct(${index})">🗑️ Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function editProduct(index) {
  const product = products[index];
  productNameInput.value = product.name;
  productQuantityInput.value = product.quantity;
  productPriceInput.value = product.price;
  productIndexInput.value = index;
  productModal.style.display = 'block';
}

function deleteProduct(index) {
  if (confirm("Are you sure you want to delete this product?")) {
    products.splice(index, 1);
    renderTable();
  }
}

renderTable(); // Initial render when the page loads
