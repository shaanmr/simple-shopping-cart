let cart = [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingProductIndex = cart.findIndex(item => item.product.id === productId);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity++;
    } else {
        cart.push({ product, quantity: 1 });
    }

    updateCartUI();
}

function updateQuantity(productId, quantity) {
    if (quantity < 1) return; // Prevent negative or zero quantities
    const cartItem = cart.find(item => item.product.id === productId);
    if (cartItem) {
        cartItem.quantity = quantity;
        if (cartItem.quantity <= 0) {
            cart = cart.filter(item => item.product.id !== productId);
        }
    }

    updateCartUI();
}

function clearCart() {
    cart = [];
    updateCartUI();
}

function updateCartUI() {
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;

    const totalPrice = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    document.getElementById('total-price').textContent = '৳' + totalPrice.toFixed(2);

    renderCartItems();
}

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.innerHTML = `
            <div>${item.product.name} x ${item.quantity}</div>
            <div>৳${(item.product.price * item.quantity).toFixed(2)}</div>
            <input type="number" value="${item.quantity}" min="1" 
                onchange="updateQuantity(${item.product.id}, this.value)" />
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });
}