document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('view-cart').addEventListener('click', () => {
        document.getElementById('cart-modal').style.display = 'flex';
        setTimeout(() => {
            document.getElementById('cart-modal').style.opacity = '1';
        }, 10);
    });

    document.getElementById('close-cart').addEventListener('click', () => {
        document.getElementById('cart-modal').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('cart-modal').style.display = 'none';
        }, 300);
    });

    document.getElementById('clear-cart').addEventListener('click', () => {
        clearCart();
    });

    document.getElementById('checkout').addEventListener('click', () => {
        alert('Proceeding to Checkout');
    });
});