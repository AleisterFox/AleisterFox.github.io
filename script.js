/**
 * General UI Scripts (Hamburger Menu, Dynamic Year)
 */

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const menuOverlay = document.querySelector('.menu-overlay');
  const menuLinks = document.querySelectorAll('.menu-link');

  // Toggle Menu
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('is-active');
    menuOverlay.classList.toggle('is-active');
  });

  // Close Menu on Link Click
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('is-active');
      menuOverlay.classList.remove('is-active');
    });
  });

  // Dynamic Year in Footer
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
