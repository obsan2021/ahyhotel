// Advanced Animations for Ahy Hotel
// Scroll-based animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .zoom-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translate(0, 0) scale(1)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    elements.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
};
// Parallax effect
const parallaxEffect = () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = 	ranslateY(px);
        });
    });
};
// Counter animation
const animateCounter = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.innerText = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};
// Initialize counters
const initCounters = () => {
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                animateCounter(counter, 0, target, 2000);
                counterObserver.unobserve(counter);
            }
        });
    });
    counters.forEach(counter => counterObserver.observe(counter));
};
// Typing animation
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.innerHTML = '';
    const type = () => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    type();
};
// Hover animations
const addHoverAnimations = () => {
    const cards = document.querySelectorAll('.room-card, .facility-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
};
// Page transition
const pageTransition = () => {
    const links = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"])');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.href;
            document.body.style.opacity = '0';
            setTimeout(() => {
                window.location.href = target;
            }, 500);
        });
    });
};
// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    parallaxEffect();
    initCounters();
    addHoverAnimations();
    // Typing animation for hero text
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle && heroTitle.dataset.text) {
        typeWriter(heroTitle, heroTitle.dataset.text);
    }
    // Add reveal class to elements
    document.querySelectorAll('.room-card, .facility-card, .testimonial').forEach(el => {
        el.classList.add('reveal');
    });
});
// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    }
});
