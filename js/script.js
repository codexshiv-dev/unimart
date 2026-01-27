function toggleMenu() {
  const nav = document.getElementById("navMenu");
  const menuBtn = document.querySelector(".menu-btn");

  nav.classList.toggle("active");
  menuBtn.classList.toggle("open");
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

