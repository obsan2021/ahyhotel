// Main JavaScript for Ahy Hotel
// Mobile Navigation Toggle
const navToggle = document.createElement('button');
navToggle.className = 'nav-toggle';
navToggle.innerHTML = '☰';
document.querySelector('.nav-container')?.appendChild(navToggle);
const navMenu = document.querySelector('.nav-menu');
navToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('active');
});
// Dark Mode Toggle
const darkModeToggle = () => {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
    }
    const toggle = document.createElement('button');
    toggle.className = 'dark-mode-toggle';
    toggle.innerHTML = '🌙';
    document.querySelector('.nav-container')?.appendChild(toggle);
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            toggle.innerHTML = '☀️';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            toggle.innerHTML = '🌙';
        }
    });
};
// Scroll Reveal
const scrollReveal = () => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;
        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('active');
        }
    });
};
// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
// Lazy Loading Images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});
lazyImages.forEach(img => imageObserver.observe(img));
// Initialize
document.addEventListener('DOMContentLoaded', () => {
    darkModeToggle();
    window.addEventListener('scroll', scrollReveal);
    scrollReveal();
});
// Header Scroll Effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.main-header');
    const currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll && currentScroll > 100) {
        header?.classList.add('header-hidden');
    } else {
        header?.classList.remove('header-hidden');
    }
    lastScroll = currentScroll;
});
