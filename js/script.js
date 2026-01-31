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

document.querySelectorAll("#navMenu a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    menuBtn.classList.remove("open"); // 👈 reset hamburger icon
  });
});
// const menuBtn = document.getElementById("menuBtn");
// const navMenu = document.getElementById("navMenu");

// // Hamburger toggle
// menuBtn.addEventListener("click", () => {
//   navMenu.classList.toggle("active");
//    menuBtn.classList.toggle("open");
// });


// Close menu when clicking a link (mobile UX)
// document.querySelectorAll("#navMenu a").forEach(link => {
//   link.addEventListener("click", () => {
//     navMenu.classList.remove("active");
//   });
// });


// Scroll animation
const sections = document.querySelectorAll(".section");

window.addEventListener("scroll", () => {
  sections.forEach(sec => {
    const pos = sec.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;

    if (pos < screenPos) {
      sec.classList.add("show");
    }
  });
});


// Dark/Light mode Js
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  if (document.body.classList.contains("light-theme")) {
    themeBtn.textContent = "☀️";
  } else {
    themeBtn.textContent = "🌙";
  }
});


//Testimonial section
const track = document.getElementById("testimonialTrack");
const dotsContainer = document.getElementById("testimonialDots");
const cards = document.querySelectorAll(".testimonial-card");

let index = 0;
let interval;

// Create dots dynamically
cards.forEach((_, i) => {
  const dot = document.createElement("span");
  if (i === 0) dot.classList.add("active");
  dotsContainer.appendChild(dot);
  dot.addEventListener("click", () => moveToSlide(i));
});

const dots = document.querySelectorAll(".testimonial-dots span");

function moveToSlide(i) {
  index = i;
  track.style.transform = `translateX(-${index * 100}%)`;
  updateDots();
}

function updateDots() {
  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

// Auto slide
function startAutoSlide() {
  interval = setInterval(() => {
    index = (index + 1) % cards.length;
    moveToSlide(index);
  }, 4000);
}

// Pause on hover
document.querySelector(".testimonial-slider").addEventListener("mouseenter", () => {
  clearInterval(interval);
});

document.querySelector(".testimonial-slider").addEventListener("mouseleave", () => {
  startAutoSlide();
});

startAutoSlide();

//End testimonial section
//filter bar
const heroSearch = document.getElementById("heroSearch");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const products = document.querySelectorAll(".products .card");
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

  products.forEach(card => {
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


///product modeal detailed js 
// PRODUCT MODAL
// PRODUCT MODAL
const cardss = document.querySelectorAll(".products .card");
const modal = document.getElementById("productModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalSave = document.getElementById("modalSave");
const modalDesc = document.getElementById("modalDesc");
const whatsappBtn = document.getElementById("whatsappBtn");
const closeModal = document.getElementById("closeModal");

// open modal on card click
cardss.forEach(card => {
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

  const message = `Hi, I want to order:\n${name}\nPrice: Rs.${price}`;
  whatsappBtn.href = `https://wa.me/9779700013011?text=${encodeURIComponent(message)}`;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
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
