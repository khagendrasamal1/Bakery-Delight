const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active'); // Toggles the 'active' class on nav-links
});


    // Get the button
    var scrollToTopBtn = document.getElementById("scrollToTopBtn");

    // When the user scrolls down 100px from the top of the document, show the button
    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    }

    // When the user clicks on the button, scroll to the top of the document
    scrollToTopBtn.onclick = function() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };


    // Add this JavaScript to handle the dropdown functionality
    const dropdown = document.querySelector('.dropdown');
    const dropbtn = dropdown.querySelector('.dropbtn');
    const dropdownContent = dropdown.querySelector('.dropdown-content');

    dropbtn.addEventListener('click', () => {
    dropdownContent.classList.toggle('show');
    });


   // Initialize cart array to store items
let cart = [];

// Function to add item to cart
function addToCart(itemId, itemName, itemPrice) {
    // Check if item already exists in the cart
    const existingItem = cart.find(cartItem => cartItem.id === itemId);

    // If item exists, increment its quantity; otherwise, add it to the cart
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: itemId,
            name: itemName,
            price: parseFloat(itemPrice),
            quantity: 1
        });
    }

    updateCart();
    showNotification(`${itemName} added to cart!`);
}

// Function to remove item from cart
function removeFromCart(itemId) {
    cart = cart.filter(cartItem => cartItem.id !== itemId); // Remove item based on ID
    updateCart();
    showNotification(`Item removed from cart!`);
}

// Function to update the cart display
function updateCart() {
    const cartContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Clear current cart display
    cartContainer.innerHTML = '';
    let totalPrice = 0;

    // Create cart items display
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty</p>'; // Display empty message
    } else {
        cart.forEach(item => {
            const itemRow = document.createElement('div');
            itemRow.classList.add('cart-item');

            itemRow.innerHTML = `
                <span class="item-name">${item.name}</span>
                <span class="item-quantity">Qty: ${item.quantity}</span>
                <span class="item-price">₹${(item.price * item.quantity).toFixed(2)}</span>
                <button class="remove-from-cart" data-item-id="${item.id}">Remove</button>
            `;

            cartContainer.appendChild(itemRow);
            totalPrice += item.price * item.quantity;
        });
    }

    // Update total price display
    cartTotal.textContent = `Total: ₹${totalPrice.toFixed(2)}`;

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', () => {
            const itemId = button.getAttribute('data-item-id');
            removeFromCart(itemId);
        });
    });
}

// Function to clear the cart
function clearCart() {
    cart = [];
    updateCart();
}

// Add event listeners to "Add to Bag" buttons
document.querySelectorAll('.add-to-bag').forEach(button => {
    button.addEventListener('click', () => {
        const itemId = button.getAttribute('data-item-id');
        const itemName = button.getAttribute('data-item-name');
        const itemPrice = button.getAttribute('data-item-price');

        addToCart(itemId, itemName, itemPrice);
    });
});


// Function to show the notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;

    // Make the notification visible
    notification.classList.remove('hidden');
    notification.style.opacity = '1'; // Set opacity to visible

    // Fade out after 2 seconds
    setTimeout(() => {
        notification.style.opacity = '0'; // Fade out
        setTimeout(() => {
            notification.classList.add('hidden'); // Add hidden class after fade out
        }, 500); // Wait for transition to complete before hiding
    }, 2000); // Show for 2 seconds
}


// Function to handle payment method selection
document.getElementById('payment-method').addEventListener('change', function() {
    const selectedMethod = this.value;

    // Hide all payment options
    document.querySelectorAll('.payment-option').forEach(option => {
        option.classList.add('hidden');
    });

    // Show selected payment option
    if (selectedMethod === 'credit-card') {
        document.getElementById('card-details').classList.remove('hidden');
    } else if (selectedMethod === 'upi') {
        document.getElementById('upi-details').classList.remove('hidden');
    } else if (selectedMethod === 'qr-code') {
        document.getElementById('qr-code-details').classList.remove('hidden');
    } else if (selectedMethod === 'net-banking') {
        document.getElementById('net-banking-details').classList.remove('hidden');
    }
});

// Function to handle payment submission
document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const selectedMethod = document.getElementById('payment-method').value;

    if (selectedMethod === 'credit-card') {
        const cardName = document.getElementById('card-name').value;
        const cardNumber = document.getElementById('card-number').value;
        const expiryDate = document.getElementById('expiry-date').value;
        const cvv = document.getElementById('cvv').value;

        // Add further validation for credit card details here...
        showNotification('Payment processed successfully using Card!');
    } else if (selectedMethod === 'upi') {
        const upiId = document.getElementById('upi-id').value;

        // Add validation for UPI ID here...
        showNotification('Payment processed successfully using UPI!');
    } else if (selectedMethod === 'qr-code') {
        showNotification('Payment processed successfully using QR Code!');
    } else if (selectedMethod === 'net-banking') {
        const bankSelect = document.getElementById('bank-select').value;

        // Add validation for Net Banking here...
        showNotification('Payment processed successfully using Net Banking!');
    }

    clearCart(); // Clear the cart after successful payment
    document.getElementById('payment-form').reset(); // Reset the form
});


window.addEventListener('scroll', function() {
    const chatbotIcon = document.getElementById('chatbot-icon');
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    // Show the chatbot icon after scrolling down 100px
    if (scrollTop > 100) {
        chatbotIcon.style.opacity = 1;
    } else {
        chatbotIcon.style.opacity = 0;
    }
});

// Toggle chatbot container visibility when the icon is clicked
document.getElementById('chatbot-icon').addEventListener('click', function() {
    const chatbotContainer = document.getElementById('chatbot-container');
    chatbotContainer.style.display = 'block'; // Show the chatbot container
});

// Minimize the chatbot back to the icon
document.getElementById('minimize-chatbot').addEventListener('click', function() {
    const chatbotContainer = document.getElementById('chatbot-container');
    chatbotContainer.style.display = 'none'; // Hide the chatbot container
});

// Hide splash screen after 3 seconds
setTimeout(function() {
    document.getElementById('splash-screen').style.display = 'none';
    document.querySelector('.main-content').style.display = 'block'; // Show main content
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}, 3000);


  