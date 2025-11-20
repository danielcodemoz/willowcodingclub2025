document.addEventListener('DOMContentLoaded', function() {
    const foodForm = document.getElementById('food-form');
    const foodList = document.querySelector('#food-list tbody');
    const totalValue = document.getElementById('total-value');
    
    let foods = [];
    let totalAmount = 0;

    // Handle form submission
    foodForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const foodName = document.getElementById('food-name').value.trim();
        const price = parseFloat(document.getElementById('price').value);
        const unit = document.getElementById('unit').value;
        const amount = parseFloat(document.getElementById('amount').value);
        
        // Validate inputs
        if (!foodName || isNaN(price) || isNaN(amount) || price <= 0 || amount <= 0) {
            alert('Please fill in all fields with valid values.');
            return;
        }
        
        // Create food object
        const food = {
            id: Date.now(), // Unique ID for each food item
            name: foodName,
            price: price,
            unit: unit,
            amount: amount,
            totalPrice: (price * amount).toFixed(2)
        };
        
        // Add to foods array
        foods.push(food);
        
        // Add to UI
        addFoodToUI(food);
        
        // Update total
        updateTotalAmount();
        
        // Reset form
        foodForm.reset();
    });
    
    // Function to add food item to UI
    function addFoodToUI(food) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${food.name}</td>
            <td>${parseFloat(food.price).toFixed(2)} MZN</td>
            <td>${food.amount} ${food.unit}</td>
            <td>${food.totalPrice} MZN</td>
            <td>
                <button class="remove-btn" data-id="${food.id}">Remove</button>
            </td>
        `;
        
        foodList.appendChild(row);
        
        // Add event listener to the remove button
        const removeBtn = row.querySelector('.remove-btn');
        removeBtn.addEventListener('click', function() {
            removeFood(food.id);
        });
    }
    
    // Function to remove food item
    function removeFood(id) {
        // Remove from foods array
        foods = foods.filter(food => food.id !== id);
        
        // Remove from UI
        const removeBtn = document.querySelector(`[data-id="${id}"]`);
        if (removeBtn) {
            removeBtn.closest('tr').remove();
        }
        
        // Update total
        updateTotalAmount();
    }
    
    // Function to update total amount
    function updateTotalAmount() {
        totalAmount = foods.reduce((total, food) => total + parseFloat(food.totalPrice), 0);
        totalValue.textContent = totalAmount.toFixed(2);
    }
});