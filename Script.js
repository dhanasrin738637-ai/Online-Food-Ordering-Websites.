let cart = [];

const cartBtn = document.getElementById('cart-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');

cartBtn.addEventListener('click', () => {
    cartSidebar.classList.toggle('active');
});

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCartUI();
}

function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    let totalCount = 0;
    let totalPrice = 0;

    cart.forEach((item, index) => {
        totalCount += item.quantity;
        totalPrice += item.price * item.quantity;

        const itemDiv = document.createElement('div');
        itemDiv.style.cssText = "display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;";
        itemDiv.innerHTML = `
            <span>${item.name} (x${item.quantity})</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
            <button onclick="removeFromCart(${index})" style="background:#ff4757; color:white; border:none; padding:2px 6px; border-radius:3px; cursor:pointer;">X</button>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });

    cartCount.innerText = totalCount;
    cartTotalPrice.innerText = totalPrice.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Order placed successfully! Thank you for ordering with DeliciousBites.');
    cart = [];
    updateCartUI();
    cartSidebar.classList.remove('active');
}