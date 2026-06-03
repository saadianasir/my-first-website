// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
    }, 1500);
});

// Custom Cursor
const customCursor = document.getElementById('customCursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    customCursor.style.left = mouseX + 'px';
    customCursor.style.top = mouseY + 'px';
});

function animateFollower() {
    const dx = mouseX - followerX;
    const dy = mouseY - followerY;
    followerX += dx * 0.15;
    followerY += dy * 0.15;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .btn');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => customCursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => customCursor.classList.remove('hover'));
});

// Scroll Progress Bar
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const percentage = (scrolled / maxScroll) * 100;
    scrollProgress.style.width = percentage + '%';
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Floating Particles
const particlesContainer = document.getElementById('particlesContainer');
const particleCount = 30;

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.animationDuration = (15 + Math.random() * 10) + 's';
    particlesContainer.appendChild(particle);
}

// AOS Animation Implementation
const aosElements = document.querySelectorAll('[data-aos]');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

aosElements.forEach(el => {
    observer.observe(el);
});

// Statistics Counter Animation
const statNumbers = document.querySelectorAll('.stat-number');
const animateStats = () => {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        let count = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(count);
            }
        }, 30);
    });
};

const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        animateStats();
        statsObserver.disconnect();
    }
}, { threshold: 0.5 });

const brandStory = document.querySelector('.brand-story');
if (brandStory) {
    statsObserver.observe(brandStory);
}

// Testimonials Carousel
const carousel = document.getElementById('testimonialCarousel');
const track = document.querySelector('.testimonial-track');
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let slideInterval;

function updateCarousel() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateCarousel();
    });
});

// Auto-slide
slideInterval = setInterval(nextSlide, 5000);

// Pause on hover
carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
carousel.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
});

// Newsletter Form
const newsletterForm = document.getElementById('newsletterForm');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input').value;
    if (email) {
        newsletterForm.innerHTML = '<p class="success-message">Thank you for joining our exclusive circle!</p>';
    }
});

// Parallax Effects
const parallaxElements = document.querySelectorAll('.floating-shape, .model-image');
window.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth - e.pageX) / 100;
    const y = (window.innerHeight - e.pageY) / 100;
    parallaxElements.forEach(el => {
        el.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Scroll-Based Animations
const scrollElements = document.querySelectorAll('.product-card, .experience-card, .gallery-item, .masonry-item');
const scrollOnView = () => {
    scrollElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < window.innerHeight - 100) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('scroll', scrollOnView);

// Initialize elements with initial state
scrollElements.forEach(el => {
    if (!el.hasAttribute('data-aos')) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
    }
});

// Add micro-interactions to all buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousedown', () => {
        btn.style.transform = 'scale(0.95)';
    });
    btn.addEventListener('mouseup', () => {
        btn.style.transform = '';
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    scrollOnView();
});