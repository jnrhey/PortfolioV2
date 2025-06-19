// Theme Toggle Functionality
function initTheme() {
    const html = document.documentElement;
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Check for saved theme preference, otherwise use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    } else {
        const initialTheme = systemPrefersDark ? 'dark' : 'light';
        html.setAttribute('data-theme', initialTheme);
    }

    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Scroll Animation Functionality
function initScrollAnimation() {
    const sections = document.querySelectorAll('section');
    const skillItems = document.querySelectorAll('.skill-item');

    // animation order 
    skillItems.forEach((item, index) => {
        item.style.setProperty('--animation-order', index);
    });

    // Intersection Observer for sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Mobile Menu Functionality
function initMobileMenu() {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    // Create and append mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    nav.insertBefore(mobileMenuBtn, navLinks);

    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '☰';
        }
    });

    // Close mobile menu when window is resized to desktop view
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '☰';
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '☰';
        }
    });
}

// Image slider functionality
class ImageSlider {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.slides = this.container.getElementsByClassName('slide');
        this.currentSlide = 0;
        this.initSlider();
    }

    initSlider() {
        // Hide all slides except the first one
        Array.from(this.slides).forEach((slide, index) => {
            if (index !== 0) slide.style.display = 'none';
        });

        // Add navigation buttons
        const prevBtn = document.createElement('button');
        prevBtn.innerHTML = '❮';
        prevBtn.className = 'slider-btn prev';
        prevBtn.setAttribute('aria-label', 'Previous slide');
        prevBtn.onclick = () => this.changeSlide(-1);

        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = '❯';
        nextBtn.className = 'slider-btn next';
        nextBtn.setAttribute('aria-label', 'Next slide');
        nextBtn.onclick = () => this.changeSlide(1);

        this.container.appendChild(prevBtn);
        this.container.appendChild(nextBtn);

        // Add keyboard navigation
        this.container.tabIndex = 0;
        this.container.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.changeSlide(-1);
            if (e.key === 'ArrowRight') this.changeSlide(1);
        });
    }

    changeSlide(direction) {
        this.slides[this.currentSlide].style.display = 'none';
        this.currentSlide = (this.currentSlide + direction + this.slides.length) % this.slides.length;
        this.slides[this.currentSlide].style.display = 'block';
    }
}

// Project Popup Functionality (if needed)
function createProjectPopup(projectId) {
    // Implementation for project popup
    console.log(`Opening project: ${projectId}`);
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    initScrollAnimation();
    
    // Initialize image slider if it exists
    const slider = document.getElementById('image-slider');
    if (slider) {
        new ImageSlider('image-slider');
    }

    // click listeners to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            createProjectPopup(card.id);
        });
    });

    // Add smooth scrolling for anchor links
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
}); 