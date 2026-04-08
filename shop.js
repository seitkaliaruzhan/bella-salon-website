// ===== Black Friday global discount (for banner text only) =====
const DISCOUNT_PERCENT = 20;

// ===== Products =====
const products = [
  { id: 1, title: "Hair Styling", basePrice: 6000, image: "Zhanna.jpeg", category: "Hair", inStock: true, discountPercent: 20 },
  { id: 2, title: "Manicure", basePrice: 7000, image: "Ainur2.jpeg", category: "Nails", inStock: true, discountPercent: 10 },
  { id: 3, title: "Makeup", basePrice: 10000, image: "Elena.jpeg", category: "Makeup", inStock: false, discountPercent: 25 },
  { id: 4, title: "Skincare", basePrice: 8000, image: "skincare2.jpeg", category: "Skin", inStock: true, discountPercent: 15 },
  { id: 5, title: "Eyebrow Architecture", basePrice: 5000, image: "brows7.jpeg", category: "Brows", inStock: true, discountPercent: 20 },
  { id: 6, title: "Lash Lamination", basePrice: 6500, image: "lashes1.jpeg", category: "Lashes", inStock: false, discountPercent: 30 }
];

// ===== Sale state (таймер біткенде false болады) =====
let saleActive = true;

// ===== Discount helper (ONE function only) =====
function calcDiscounted(price, discountPercent){
  return Math.round(price * (1 - discountPercent / 100));
}

// ===== Cart =====
let cart = []; // each item: { id, title, oldPrice, price }

// DOM elements
const catalogEl = document.getElementById("catalog");
const cartItemsEl = document.getElementById("cart-items");
const totalEl = document.getElementById("total");

// DOM Elements - Filters and Sorting
const filterCategory = document.getElementById("filterCategory");
const filterStock = document.getElementById("filterStock");
const filterDiscount = document.getElementById("filterDiscount");
const sortBy = document.getElementById("sortBy");

// ===== Populate Categories Dynamically =====
function initCategories() {
    const categories = [...new Set(products.map(p => p.category))];
    // Добавляем уникальные категории из массива в select
    categories.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        filterCategory.appendChild(option);
    });
}

// ===== Render catalog (принимает массив) =====
function renderCatalog(itemsToRender) {
  catalogEl.innerHTML = "";

  if (itemsToRender.length === 0) {
      catalogEl.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #777;">No services match your filters.</p>`;
      return;
  }

  itemsToRender.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";

    const oldPrice = product.basePrice;
    const discount = saleActive ? product.discountPercent : 0;
    const newPrice = calcDiscounted(oldPrice, discount);

    const discountHTML = (saleActive && discount > 0) ? `<div class="badge">-${discount}%</div>` : "";

    const priceHTML = (saleActive && discount > 0)
      ? `
        <div class="price-row">
          <span class="old-price">${oldPrice} ₸</span>
          <span class="new-price">${newPrice} ₸</span>
        </div>
      `
      : `
        <div class="price-row">
          <span class="new-price">${oldPrice} ₸</span>
        </div>
      `;

    // Индикатор наличия на складе
    const stockStatus = product.inStock ? "" : `<p style="color: #e14076; font-size: 13px; margin: 5px 0; font-weight: bold;">Out of Stock</p>`;

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      ${stockStatus}
      ${discountHTML}
      ${priceHTML}
      <a href="#" class="card-btn" data-id="${product.id}">Add to cart</a>
    `;

    catalogEl.appendChild(card);
  });
}

// ===== MAIN: Filtering and Sorting Logic =====
function applyFiltersAndSort() {
    let filtered = [...products];

    // 1. Category Filter
    const catValue = filterCategory.value;
    if (catValue !== "all") {
        filtered = filtered.filter(p => p.category === catValue);
    }

    // 2. Stock Filter
    const stockValue = filterStock.value;
    if (stockValue === "in") {
        filtered = filtered.filter(p => p.inStock === true);
    } else if (stockValue === "out") {
        filtered = filtered.filter(p => p.inStock === false);
    }

    // 3. Discount Filter
    const discountValue = parseInt(filterDiscount.value);
    if (discountValue > 0) {
        filtered = filtered.filter(p => p.discountPercent >= discountValue);
    }

    // 4. Sorting
    const sortValue = sortBy.value;
    if (sortValue === "priceAsc") {
        filtered.sort((a, b) => {
            const priceA = saleActive ? calcDiscounted(a.basePrice, a.discountPercent) : a.basePrice;
            const priceB = saleActive ? calcDiscounted(b.basePrice, b.discountPercent) : b.basePrice;
            return priceA - priceB; // Low to High
        });
    } else if (sortValue === "priceDesc") {
        filtered.sort((a, b) => {
            const priceA = saleActive ? calcDiscounted(a.basePrice, a.discountPercent) : a.basePrice;
            const priceB = saleActive ? calcDiscounted(b.basePrice, b.discountPercent) : b.basePrice;
            return priceB - priceA; // High to Low
        });
    } else if (sortValue === "discountDesc") {
        filtered.sort((a, b) => b.discountPercent - a.discountPercent); // Discount High to Low
    }

    renderCatalog(filtered);
}

// Слушатели событий для фильтров (вызывают applyFiltersAndSort при каждом изменении)
filterCategory.addEventListener("change", applyFiltersAndSort);
filterStock.addEventListener("change", applyFiltersAndSort);
filterDiscount.addEventListener("change", applyFiltersAndSort);
sortBy.addEventListener("change", applyFiltersAndSort);

// ===== Add to cart =====
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  // Проверка на наличие (чтобы не покупали то, чего нет)
  if (!product.inStock) {
      alert("Sorry, this service is currently out of stock!");
      return;
  }

  const oldPrice = product.basePrice;
  const discount = saleActive ? product.discountPercent : 0;
  const newPrice = calcDiscounted(oldPrice, discount);

  cart.push({
    id: product.id,
    title: product.title,
    oldPrice: oldPrice,
    price: newPrice
  });

  renderCart();
}

// ===== Remove from cart =====
function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

// ===== Render cart =====
function renderCart() {
  cartItemsEl.innerHTML = "";

  if (cart.length === 0) {
    cartItemsEl.innerHTML = `<p style="color:#777;">Cart is empty</p>`;
    totalEl.textContent = "0";
    return;
  }

  cart.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "cart-item";

    row.innerHTML = `
      <div style="display:flex; justify-content:space-between; width:100%; align-items:center;">
        <div>
          <div class="cart-item-title" style="font-weight:bold;">${item.title}</div>
          <div class="cart-item-prices">
            ${saleActive && item.oldPrice > item.price ? `<span class="old-price" style="text-decoration:line-through; font-size:12px; color:#888;">${item.oldPrice} ₸</span>` : ""}
            <span class="new-price" style="color:#7a1f3d; font-weight:bold;">${item.price} ₸</span>
          </div>
        </div>
        <button class="remove-btn" data-index="${index}">Remove</button>
      </div>
    `;

    cartItemsEl.appendChild(row);
  });

  updateTotal();
}

// ===== Total calculation =====
function updateTotal() {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  totalEl.textContent = total.toString();
}

// ===== Event delegation for buttons =====
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("card-btn")) {
    e.preventDefault();
    const id = Number(e.target.dataset.id);
    addToCart(id);
  }

  if (e.target.classList.contains("remove-btn")) {
    const index = Number(e.target.dataset.index);
    removeFromCart(index);
  }
});

// ===== Clear cart =====
const clearCartBtn = document.getElementById("clearCartBtn");
if (clearCartBtn) {
  clearCartBtn.addEventListener("click", () => {
    cart = [];
    renderCart();
  });
}

// ===== Black Friday Timer =====
const BF_END = new Date("2026-03-02T15:26:00");

const dEl = document.getElementById("d");
const hEl = document.getElementById("h");
const mEl = document.getElementById("m");
const sEl = document.getElementById("s");
const bfStatus = document.getElementById("bf-status");

function pad(n){ return String(n).padStart(2,"0"); }

function updateTimer(){
  if (!dEl || !hEl || !mEl || !sEl) return;

  const now = new Date();
  const diff = BF_END - now;

  if (diff <= 0){
    if (saleActive) {
        saleActive = false; // Отключаем скидки
        dEl.textContent = "00";
        hEl.textContent = "00";
        mEl.textContent = "00";
        sEl.textContent = "00";

        if (bfStatus) bfStatus.textContent = "Sale ended.";
        
        // каталог без скидок
        applyFiltersAndSort(); 
    }
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  dEl.textContent = pad(days);
  hEl.textContent = pad(hours);
  mEl.textContent = pad(mins);
  sEl.textContent = pad(secs);

  if (bfStatus) bfStatus.textContent = `Hurry up! ${DISCOUNT_PERCENT}% OFF is active.`;
}

// ===== Init Everything =====
initCategories(); 
applyFiltersAndSort(); // Рендерим каталог с учетом стартовых фильтров
renderCart(); 

setInterval(updateTimer, 1000);
updateTimer();