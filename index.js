import { menuArray } from "./data.js";

const items = document.getElementById('items');
const order = document.getElementById('order');
const modalOverlay = document.getElementById('modal-overlay');

const cart = [];

document.querySelector('.modal-pay-btn').addEventListener('click', (e) => {
    e.preventDefault();

    const nameInput = document.querySelector('.modal form input[name="name"]');
    const cardInput = document.querySelector('.modal input[name="card-number"]');
    const ccvInput = document.querySelector('.modal input[name="ccv"]');

    if (!nameInput.value.trim() || !cardInput.value.trim() || !ccvInput.value.trim()) {
        alert('Please fill all fields!');
        return;
    }
    
    const userName = nameInput.value.trim();

    modalOverlay.style.display = "none";

    order.innerHTML = `
        <div class="order-container">
            <h1 class="thank-msg">Thanks, ${userName}! Your order is on it's way.</h1>
        </div>
    `;
});

order.addEventListener('click', (e) => {
    if (e.target.classList.contains('order-btn')) {
        modalOverlay.style.display = 'flex';
    }
});

document.getElementById('close-modal-btn').addEventListener('click', () => {
    modalOverlay.style.display = 'none'
});

function renderItems() {

    items.innerHTML = menuArray.map(item => `
            <div class="item-container">
                <div class="emoji-container">
                    <h2 class="emoji">${item.emoji}</h2>
                </div>
                <div class="information-container">
                    <li class="name">${item.name}</li>
                    <p class="ingredients">${item.ingredients}</p>
                    <p class="price">$${item.price}</p>
                </div>
                <div class="button-container">
                    <button class="addBtn">+</button>
                </div>
            </div>
        `).join("");

        addItemListeners();
}

function addItemListeners() {

    const addButtons = document.querySelectorAll('.addBtn');
    addButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            cart.push(menuArray[index]);
            renderOrder();
        });
    });
}

function renderOrder() {

    if (cart.length === 0) {
        order.innerHTML = '';
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0)

    order.innerHTML = `
        <div class="order-container">
            <h1 class="order-title">Your Order</h1>
            <div class="order-items">
                ${cart.map((item, index) => `
                        <div class="order-item">
                            <div class="items-left">
                                <span class="item-name">${item.name}</span>
                                <button class="rm-btn" data-index="${index}">remove</button>
                            </div>
                            <span class="order-price">$${item.price}</span>
                        </div>
                    `).join('')}
            </div>

            <h2 class="total-price">Total price: $${total}</h2>

            <button class="order-btn">Complete order</button>
        </div>
    `;

    const removeButtons = document.querySelectorAll('.rm-btn');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const index = btn.dataset.index;
            cart.splice(index, 1);
            renderOrder();
        });
    });
}



renderItems();