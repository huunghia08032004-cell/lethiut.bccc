// Mobile Menu Toggle
const menuOpenButton = document.querySelector('#menu-open-button');

menuOpenButton.addEventListener('click', () => {
    document.body.classList.toggle('show-mobile-menu');
});

// Close mobile menu when clicking close button
const menuCloseButton = document.querySelector('#menu-close-button');

menuCloseButton.addEventListener('click', () => menuOpenButton.click
());

// Close mobile menu when clicking any nav link
const navLinks = document.querySelectorAll('.nav-menu .nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => menuOpenButton.click());
});

// Initialize Swiper
const swiper = new Swiper('.slider-wrapper', {
  loop: true,
  grabCursor: true,
  spaceBetween: 25,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    }
  }
});