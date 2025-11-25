

var swiper = new Swiper(".mySwiper", {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});


const cartIcon = document.querySelector('.cart-icon');
const cartTab = document.querySelector('.cart-tab');
const cartClose = document.querySelector('.close-btn');
const cardList = document.querySelector('.card-list');
const cartList = document.querySelector('.cart-list');
const cartTotal = document.querySelector('.cart-total');
const cartValue = document.querySelector('.cart-value');
const hamBurger =document.querySelector('.hamburger')
const mobileMenu = document.querySelector('.mobile-menu')
const bars=document.querySelector('.fa-bars');


hamBurger.addEventListener('click',()=>mobileMenu.classList.toggle('mobile-menu-active'));
hamBurger.addEventListener('click',()=>bars.classList.toggle('fa-xmark'));



cartIcon.addEventListener('click', () => {
    cartTab.classList.add('cart-tab-active');
});

cartClose.addEventListener('click', () => {
    cartTab.classList.remove('cart-tab-active');
});



let productList = [];
let cartProduct = [];

const updateTotals = () => {
    let totalPrice = 0;
    let totalQuantity = 0;
    document.querySelectorAll('.item').forEach(item => {
        const quantity = parseInt(item.querySelector('.quantity-value').textContent);
        const price = parseFloat(item.querySelector('.item-total').textContent.replace('Rs', ''))
        totalPrice += price;
        totalQuantity += quantity;
    });
    cartTotal.textContent = `Rs${totalPrice.toFixed(2)}`
    cartValue.textContent = totalQuantity;
}

const showCards = () => {


    productList.forEach(product => {
        const orderCard = document.createElement('div');
        orderCard.classList.add('order-card');

        orderCard.innerHTML = `
            <div class="card-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <h4>${product.name}</h4>
            <h4 class="price">${product.price}</h4>
            <a href="#" class="btn cart-btn">Add to Cart</a>
        `;

        cardList.appendChild(orderCard);


        const cartBtn = orderCard.querySelector('.cart-btn');
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();

            addToCart(product);

        });


    });
};

const addToCart = (product) => {
    const existingProduct = cartProduct.find(item => item.id === product.id);

    if (existingProduct) {
        alert("Item already in cart");
        return;
    }

    cartProduct.push(product);
    let quantity = 1;
    let price = parseFloat(product.price.replace('Rs', ''))


    const CartItem = document.createElement('div');
    CartItem.classList.add('item');

    CartItem.innerHTML = `
        <div class="item-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="detail">
            <h4>${product.name}</h4>
            <h4 class="item-total">${product.price}</h4>
        </div>
        <div class="flex">
            <a href="#" class="quantity-btn minus">
                <i class="fa-solid fa-minus"></i>
            </a>
            <h4 class="quantity-value">${quantity}</h4>
            <a href="#" class="quantity-btn plus">
                <i class="fa-solid fa-plus"></i>
            </a>
        </div>
    `;

    cartList.appendChild(CartItem);
    updateTotals();

    const plusBtn = CartItem.querySelector('.plus')
    const quantityvalue = CartItem.querySelector('.quantity-value');
    const itemTotal = CartItem.querySelector('.item-total');
    const minusBtn = CartItem.querySelector('.minus');
    plusBtn.addEventListener('click', (e) => {
        e.preventDefault()
        quantity++;
        quantityvalue.textContent = quantity;
        itemTotal.textContent = `Rs${(price * quantity).toFixed(2)}`
        updateTotals();


    })
    minusBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (quantity > 1) {
            quantity--;
            quantityvalue.textContent = quantity;
            itemTotal.textContent = `Rs${(price * quantity).toFixed(2)}`
            updateTotals();


        }
        else {
            CartItem.classList.add('slide-out');
            setTimeout(() => {
                CartItem.remove();
                cartProduct = cartProduct.filter(item => item.id !== product.id);
                updateTotals();
            }, 300);
        }

    })
};

const init = () => {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            productList = data;
            showCards();
        });
};

init();

