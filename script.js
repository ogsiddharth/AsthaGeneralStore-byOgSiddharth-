const fallbackImg = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400";

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ---------------- PRODUCT CARD ---------------- */

function createProductCard(p) {
    const imgUrl = p.img || fallbackImg;

    return `
        <div class="p-card">
            <img src="${imgUrl}" onerror="this.src='${fallbackImg}'" alt="${p.name}">
            <h4>${p.name}</h4>
            <div class="p-price">
                <strong>₹${p.price}</strong>
                <button class="add-btn" onclick="addToCart(${p.id})">ADD</button>
            </div>
        </div>
    `;
}

/* ---------------- RENDER PRODUCTS ---------------- */

function renderProducts() {
    const featuredGrid = document.getElementById('featured-products');
    const shopGrid = document.getElementById('all-products');

    if (!productsData) return;

    const bestSellers = productsData.filter(p => p.bestseller);

    if (featuredGrid) {
        featuredGrid.innerHTML = bestSellers.map(createProductCard).join('');
    }

    if (shopGrid) {
        shopGrid.innerHTML = productsData.map(createProductCard).join('');
    }
}

/* ---------------- ADD TO CART ---------------- */

function addToCart(id) {
    const product = productsData.find(p => p.id === id);
    if (!product) return;

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    renderCart();
    showToast(product.name + " added to cart");
}

/* ---------------- RENDER CART ---------------- */

function renderCart() {
    const cartContainer = document.getElementById("cart-items");
    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = `<p style="text-align:center;color:#888;">Bag is empty</p>`;
        return;
    }

    cartContainer.innerHTML = cart.map((item, index) => `
        <div class="p-card" style="margin-bottom:10px;">
            <h4>${item.name}</h4>
            <div class="p-price">
                <strong>₹${item.price}</strong>
                <button class="add-btn" onclick="removeFromCart(${index})">Remove</button>
            </div>
        </div>
    `).join('');
}

/* ---------------- REMOVE ---------------- */

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

/* ---------------- CART COUNT ---------------- */

function updateCartCount() {
    const countEl = document.getElementById("cart-count");
    if (countEl) countEl.innerText = cart.length;
}

/* ---------------- PAGE SWITCH ---------------- */

function showPage(pageId){

    document.querySelectorAll(".page").forEach(p=>{
        p.classList.remove("active");
    });

    document.getElementById(pageId)?.classList.add("active");

    // nav highlight
    document.querySelectorAll(".nav-item").forEach(n=>{
        n.classList.remove("active");
        if(n.innerText.toLowerCase().includes(pageId)){
            n.classList.add("active");
        }
    });

    window.scrollTo({
        top:0,
        behavior:"instant"
    });

    if(pageId==="cart") renderCart();
}



/* ---------------- MODERN TOAST ---------------- */

function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    setTimeout(() => {
        toast.remove();
    }, 2500);
}

/* ---------------- INIT ---------------- */

window.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    renderCart();
    updateCartCount();
});

/* ---------------- FAQ TOGGLE ---------------- */

function toggleFAQ(element) {
    element.classList.toggle("active");
}
