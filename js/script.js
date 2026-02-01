// ==========================
// NAVBAR TOGGLE FUNCTIONALITY
// ==========================
function toggleMenu() {
  const nav = document.getElementById("navMenu");
  const menuBtn = document.querySelector(".menu-btn");

  nav.classList.toggle("active");
  menuBtn.classList.toggle("open");
  document.body.classList.toggle("no-scroll");
}
/* Close menu when clicking a link */
const navMenu = document.getElementById("navMenu");
const menuBtn = document.querySelector(".menu-btn");

document.querySelectorAll("#navMenu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    menuBtn.classList.remove("open"); // 👈 reset hamburger icon
  });
});

// ==========================
// SCROLL ANIMATION FOR SECTIONS
// ==========================
const sections = document.querySelectorAll(".section");

window.addEventListener("scroll", () => {
  sections.forEach((sec) => {
    const pos = sec.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;

    if (pos < screenPos) {
      sec.classList.add("show");
    }
  });
});

// ==========================
// DARK/LIGHT MODE TOGGLE
// ==========================
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  if (document.body.classList.contains("light-theme")) {
    themeBtn.textContent = "☀️";
  } else {
    themeBtn.textContent = "🌙";
  }
});

// ==========================
// TESTIMONIAL SLIDER FUNCTIONALITY
// ==========================
const track = document.getElementById("testimonialTrack");
const dotsContainer = document.getElementById("testimonialDots");
const cards = document.querySelectorAll(".testimonial-card");

let index = 0;
let interval;

// Create dots
cards.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dotsContainer.appendChild(dot);

  dot.addEventListener("click", () => {
    moveToSlide(i);
    resetAutoSlide();
  });
});

const dots = document.querySelectorAll(".testimonial-dots span");

function moveToSlide(i) {
  index = i;
  track.style.transform = `translateX(-${i * 100}%)`;
  updateDots();
}

function updateDots() {
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

// Auto slide
function startAutoSlide() {
  interval = setInterval(() => {
    index = (index + 1) % cards.length;
    moveToSlide(index);
  }, 4000);
}

function resetAutoSlide() {
  clearInterval(interval);
  startAutoSlide();
}

// Pause on hover
const slider = document.querySelector(".testimonial-slider");

slider.addEventListener("mouseenter", () => clearInterval(interval));
slider.addEventListener("mouseleave", startAutoSlide);

startAutoSlide();

// ==========================
// PRODUCT FILTER FUNCTIONALITY
// ==========================
const heroSearch = document.getElementById("heroSearch");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const products = document.querySelectorAll(".products .product-card");
const noResult = document.getElementById("noResult");

// Scroll to products from hero search
function scrollToProducts() {
  document.getElementById("new").scrollIntoView({ behavior: "smooth" });
  searchInput.value = heroSearch.value;
  filterProducts();
}

// Main filter function
function filterProducts() {
  const searchText = searchInput.value.toLowerCase();
  const category = categoryFilter.value;
  let found = false;

  products.forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    const cardCategory = card.dataset.category;

    const matchSearch = title.includes(searchText);
    const matchCategory = category === "all" || cardCategory === category;

    if (matchSearch && matchCategory) {
      card.classList.remove("hide");
      found = true;
    } else {
      card.classList.add("hide");
    }
  });

  noResult.style.display = found ? "none" : "block";
}

// Events
searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);

// ==========================
// PRODUCT MODAL FUNCTIONALITY
// ==========================
const cardss = document.querySelectorAll(".products .product-card");
const modal = document.getElementById("productModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalSave = document.getElementById("modalSave");
const modalDesc = document.getElementById("modalDesc");
const whatsappBtn = document.getElementById("whatsappBtn");
const closeModal = document.getElementById("closeModal");

// open modal on card click
cardss.forEach((card) => {
  card.addEventListener("click", () => openModal(card));
});

function openModal(card) {
  const name = card.dataset.name;
  const price = Number(card.dataset.price);
  const oldPrice = Number(card.dataset.oldprice);
  const desc = card.dataset.desc;
  const img = card.dataset.img;

  modalImg.src = img;
  modalTitle.textContent = name;
  modalDesc.textContent = desc;

  // price + discount
  if (!isNaN(price) && !isNaN(oldPrice) && oldPrice > price) {
    const save = oldPrice - price;
    const percent = Math.round((save / oldPrice) * 100);

    modalPrice.innerHTML = `
      Rs.${price} 
      <span class="old-price">Rs.${oldPrice}</span>
    `;
    modalSave.textContent = `You save Rs.${save} (${percent}% OFF)`;
  } else {
    modalPrice.textContent = `Rs.${price}`;
    modalSave.textContent = "";
  }

  // message for order
  const message = `Hello 👋 Unimart Team,

      I would like to order this product:

     📦 Product: ${name}
     💰 Price: Rs.${price}

      Kindly confirm stock and delivery process.

      Thanks you!`;

  whatsappBtn.href = `https://wa.me/9779700013011?text=${encodeURIComponent(message)}`;
  // end ------
  modal.classList.add("active");
  document.body.style.overflow = "hidden"; //scroll hidden
}

// Close modal
closeModal.addEventListener("click", closeModalFn);

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModalFn();
});

function closeModalFn() {
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// ==========================
// CATEGORY FILTER FUNCTIONALITY
// ==========================
const cats = document.querySelectorAll(".category-card");

function setCategory(category) {
  categoryFilter.value = category;
  searchInput.value = "";
  filterProducts();

  cats.forEach((cat) => cat.classList.remove("active"));
  event.target.classList.add("active");

  document.getElementById("new").scrollIntoView({ behavior: "smooth" });
}
