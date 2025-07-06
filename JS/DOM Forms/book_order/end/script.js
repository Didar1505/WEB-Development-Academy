document.addEventListener('DOMContentLoaded', () => {

    // --- STATE MANAGEMENT ---
    // This array will hold the items in our shopping cart.
    let cartItems = []; 
    // This will hold a reference to the currently selected book card element.
    let selectedBook = null;

    // --- DOM ELEMENT SELECTION ---
    // We get references to all the HTML elements we'll need to interact with.
    const bookCards = document.querySelectorAll('.book-card');
    const orderForm = document.getElementById('order-form');
    const bookInput = document.getElementById('book');
    const quantityInput = document.getElementById('quantity');
    const buyBtn = document.getElementById('buy-btn');
    
    const cartSection = document.getElementById('cart-section');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartTotalSpan = document.getElementById('cart-total');

    // --- EVENT LISTENERS ---

    // 1. Listen for clicks on any of the book cards.
    bookCards.forEach(card => {
        card.addEventListener('click', handleBookSelection);
    });

    // 2. Listen for the submission of the order form.
    orderForm.addEventListener('submit', handleAddToCart);


    // --- HANDLER FUNCTIONS ---

    /**
     * Handles the logic when a user clicks on a book card to select it.
     * @param {Event} event - The click event object.
     */
    function handleBookSelection(event) {
        // The card that was clicked.
        const currentCard = event.currentTarget;

        // Remove the 'selected-card' style from any previously selected card.
        if (selectedBook) {
            selectedBook.classList.remove('selected-card');
        }

        // Add the 'selected-card' style to the newly clicked card.
        currentCard.classList.add('selected-card');
        selectedBook = currentCard; // Update our state variable.

        // Get the book's title and price from its data attributes.
        const title = selectedBook.dataset.title;

        // Populate the form's "Selected Book" input field.
        bookInput.value = title;

        // Enable the "Add to Cart" button now that a book is selected.
        buyBtn.disabled = false;
    }

    /**
     * Handles the logic when the user submits the form to add an item to the cart.
     * @param {Event} event - The form submit event object.
     */
    function handleAddToCart(event) {
        // Prevent the form from doing its default action (reloading the page).
        event.preventDefault();

        // Safety check: if no book is selected, do nothing.
        if (!selectedBook) {
            alert("Please select a book first!");
            return;
        }

        // Get the details from the selected book's data attributes and the form.
        const title = selectedBook.dataset.title;
        const price = parseFloat(selectedBook.dataset.price);
        const quantity = parseInt(quantityInput.value);

        // Check if the book is already in the cart.
        const existingItem = cartItems.find(item => item.title === title);

        if (existingItem) {
            // If it exists, just update its quantity.
            existingItem.quantity += quantity;
        } else {
            // If it's a new book, add a new object to our cartItems array.
            cartItems.push({ title, price, quantity });
        }

        // Update the shopping cart display on the page.
        renderCart();
        
        // Reset the form and selection state for the next purchase.
        cleanupAfterAddToCart();
    }


    // --- UI RENDERING & UTILITY FUNCTIONS ---

    /**
     * Renders the entire shopping cart based on the current `cartItems` array.
     */
    function renderCart() {
        // If the cart is empty, show the empty message and hide the summary.
        if (cartItems.length === 0) {
            emptyCartMessage.style.display = 'block';
            cartItemsContainer.innerHTML = ''; // Clear any existing items
            cartItemsContainer.appendChild(emptyCartMessage);
        } else {
            // If the cart has items, hide the empty message.
            emptyCartMessage.style.display = 'none';
            // Clear the container before re-rendering to avoid duplicates.
            cartItemsContainer.innerHTML = '';
        }

        let total = 0;

        // Loop through each item in the cart.
        cartItems.forEach(item => {
            const itemSubtotal = item.price * item.quantity;
            total += itemSubtotal;

            // Create the HTML elements for this cart item.
            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';
            cartItemDiv.innerHTML = `
                <div class="cart-item-details">
                    <p>${item.title}</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
                <p class="cart-item-price">$${itemSubtotal.toFixed(2)}</p>
            `;
            // Add the new element to the container on the page.
            cartItemsContainer.appendChild(cartItemDiv);
        });

        // Update the total price display, formatted to two decimal places.
        cartTotalSpan.textContent = `$${total.toFixed(2)}`;
    }
    
    /**
     * Resets the form and book selection UI after an item has been added to the cart.
     */
    function cleanupAfterAddToCart() {
        // Reset the form fields to their default values.
        orderForm.reset(); 
        
        // Specifically clear the read-only book input.
        bookInput.value = ''; 
        
        // Remove the highlight from the selected book card.
        if (selectedBook) {
            selectedBook.classList.remove('selected-card');
        }
        
        // Reset our state variables.
        selectedBook = null; 
        
        // Disable the button again, requiring a new selection.
        buyBtn.disabled = true; 
    }

    // --- INITIALIZATION ---
    // Call renderCart once when the page loads to set the initial empty state.
    renderCart();
});