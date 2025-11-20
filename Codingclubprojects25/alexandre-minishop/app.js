// Products array to store all products
let products = [];

// DOM Elements
const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList');
const productListContainer = document.getElementById('productListContainer');
const emptyState = document.getElementById('emptyState');
const totalDisplay = document.getElementById('totalDisplay');
const grandTotalElement = document.getElementById('grandTotal');
const toast = document.getElementById('toast');

// Initialize app
function init() {
    productForm.addEventListener('submit', handleSubmit);
    updateUI();
}

// Handle form submission
function handleSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const price = parseFloat(document.getElementById('price').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    
    // Validation
    if (!name) {
        showToast('Please enter a product name', 'error');
        return;
    }
    
    if (isNaN(price) || price <= 0) {
        showToast('Please enter a valid price greater than 0', 'error');
        return;
    }
    
    if (isNaN(quantity) || quantity <= 0) {
        showToast('Please enter a valid quantity greater than 0', 'error');
        return;
    }
    
    // Add product
    const newProduct = {
        id: generateId(),
        name,
        price,
        quantity
    };
    
    products.push(newProduct);
    
    // Reset form
    productForm.reset();
    
    // Update UI
    updateUI();
    
    // Show success message
    showToast('Product added successfully!', 'success');
}

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Delete product
function deleteProduct(id) {
    products = products.filter(product => product.id !== id);
    updateUI();
    showToast('Product deleted', 'success');
}

// Calculate grand total
function calculateGrandTotal() {
    return products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
}

// Update UI
function updateUI() {
    if (products.length === 0) {
        // Show empty state
        emptyState.style.display = 'block';
        productListContainer.style.display = 'none';
        totalDisplay.style.display = 'none';
    } else {
        // Show products
        emptyState.style.display = 'none';
        productListContainer.style.display = 'block';
        totalDisplay.style.display = 'block';
        
        // Render products
        renderProducts();
        
        // Update total
        const total = calculateGrandTotal();
        grandTotalElement.textContent = `$${total.toFixed(2)}`;
    }
}

// Render products
function renderProducts() {
    productList.innerHTML = products.map(product => {
        const total = product.price * product.quantity;
        
        return `
            <div class="product-card">
                <div class="product-header">
                    <div class="product-info">
                        <div class="product-title-wrapper">
                            <div class="product-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M16.5 9.4l-9-5.19"/>
                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                                    <line x1="12" y1="22.08" x2="12" y2="12"/>
                                </svg>
                            </div>
                            <h3 class="product-name">${escapeHtml(product.name)}</h3>
                        </div>
                        
                        <div class="product-details">
                            <div>
                                <p class="detail-label">Price</p>
                                <p class="detail-value">$${product.price.toFixed(2)}</p>
                            </div>
                            <div>
                                <p class="detail-label">Quantity</p>
                                <p class="detail-value">${product.quantity}</p>
                            </div>
                        </div>
                        
                        <div class="product-total">
                            <p class="total-label">Total Value</p>
                            <p class="total-value">$${total.toFixed(2)}</p>
                        </div>
                    </div>
                    
                    <button class="btn btn-ghost" onclick="deleteProduct('${product.id}')" aria-label="Delete product">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M3 6h18"/>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                            <line x1="10" y1="11" x2="10" y2="17"/>
                            <line x1="14" y1="11" x2="14" y2="17"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Show toast notification
function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Start the app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
