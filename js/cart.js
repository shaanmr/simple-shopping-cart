let cart = [];
let appliedPromoCode = '';

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
    if (quantity < 1) return;
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
    appliedPromoCode = '';
    document.getElementById('promo-code').value = '';  // Clear the promo code input
    document.getElementById('promo-message').textContent = '';  // Clear the promo message
    updateCartUI();
}

function applyPromoCode() {
    const promoCodeInput = document.getElementById('promo-code').value.trim();
    const promoMessage = document.getElementById('promo-message');
    let discount = 0;

    if (promoCodeInput === 'ostad10' && appliedPromoCode !== 'ostad10') {
        discount = 0.10;
        promoMessage.textContent = 'Promo code applied: 10% off!';
        appliedPromoCode = 'ostad10';
    } else if (promoCodeInput === 'ostad5' && appliedPromoCode !== 'ostad5') {
        discount = 0.05;
        promoMessage.textContent = 'Promo code applied: 5% off!';
        appliedPromoCode = 'ostad5';
    } else {
        promoMessage.textContent = 'Invalid or already applied promo code!';
        return;
    }

    updateCartUI(discount);
}

function updateCartUI(discount = 0) {
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;

    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    document.getElementById('subtotal-amount').textContent = subtotal.toFixed(2);

    const discountAmount = subtotal * discount;
    document.getElementById('discount-amount').textContent = 'Discount: ৳' + discountAmount.toFixed(2);

    const finalTotal = subtotal - discountAmount;
    document.getElementById('total-price').textContent = finalTotal.toFixed(2);

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

document.getElementById('apply-promo').addEventListener('click', applyPromoCode);

document.getElementById('checkout').addEventListener('click', () => {
    alert('Proceeding to Checkout');
});