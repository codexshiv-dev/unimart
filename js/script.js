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