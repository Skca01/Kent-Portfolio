<<<<<<< HEAD
/**
 * Kent Carlo B. Amante Portfolio - Scripts
 * 
 * @author: Kent Carlo B. Amante
 * @email: carloamante125@gmail.com
 * @github: https://github.com/Skca01
 * @description: Main JavaScript functionality for personal portfolio website
 * @copyright: © 2025 Kent Carlo B. Amante. All rights reserved.
 */

// Smooth Scrolling
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

// Navbar Scroll Effects
const navbar = document.getElementById('navbar');
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    if (currentScroll > lastScroll && currentScroll > 500) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
});

// Active Nav Link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + window.innerHeight / 3;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Scroll Reveal for Sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);
document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
});

// Typewriter Effect
const subtitle = document.querySelector('.hero-subtitle');
if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    setTimeout(typeWriter, 1000);
}

// Particle Network Animation (Disabled on Mobile)
const isMobile = window.innerWidth <= 768;
const canvas = document.getElementById('particle-network');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.radius = 2;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'var(--primary)';
            ctx.fill();
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
        }
    }

    if (!isMobile) {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function drawLines() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(37, 99, 235, ${1 - distance / 100})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            drawLines();
            requestAnimationFrame(animateParticles);
        }

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        animateParticles();
    }
}

// Particle Animation
const createParticle = () => {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--primary);
        border-radius: 50%;
        pointer-events: none;
        opacity: 0.7;
        animation: particleFloat 3s linear infinite;
    `;
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    document.querySelector('.hero').appendChild(particle);
    setTimeout(() => {
        particle.remove();
    }, 3000);
};
if (!isMobile) {
    setInterval(createParticle, 300);
}

// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinksContainer = document.querySelector('.nav-links');
if (mobileMenu && navLinksContainer) {
    mobileMenu.addEventListener('click', () => {
        const isActive = navLinksContainer.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        mobileMenu.setAttribute('aria-expanded', isActive);
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileMenu.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!navLinksContainer.contains(e.target) && !mobileMenu.contains(e.target) && navLinksContainer.classList.contains('active')) {
            navLinksContainer.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileMenu.setAttribute('aria-expanded', 'false');
        }
    });
}

// Back to Top Button
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Project Carousel Functionality
const projectsTrack = document.querySelector('.projects-track');
const projectCards = Array.from(document.querySelectorAll('.project-card'));
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
const dotsContainer = document.querySelector('.carousel-dots');

let currentIndex = 0;
const totalSlides = projectCards.length;
let isAnimating = false;
let autoplayInterval;
const AUTOPLAY_DELAY = 5000;

// Create dots for carousel
projectCards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => !isAnimating && goToSlide(index));
    dotsContainer.appendChild(dot);
});

// Carousel animations
function updateCarousel(animate = true) {
    if (isAnimating) return;
    isAnimating = true;

    const card = projectCards[0];
    const cardWidth = card.offsetWidth;
    const cardMargin = parseInt(window.getComputedStyle(card).marginLeft) + 
                      parseInt(window.getComputedStyle(card).marginRight);
    const slideWidth = cardWidth + cardMargin;
    const containerWidth = projectsTrack.parentElement.offsetWidth;
    const offset = (containerWidth - cardWidth) / 2;
    
    if (animate) {
        projectsTrack.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    } else {
        projectsTrack.style.transition = 'none';
    }
    
    const translateX = offset - (currentIndex * slideWidth);
    projectsTrack.style.transform = `translateX(${translateX}px)`;
    
    // Staggered animations
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.toggle('active', index === currentIndex);
        }, animate ? index * 50 : 0);
    });
    
    // Dots with animation
    document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
    
    // Button states
    prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
    prevButton.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
    
    nextButton.style.opacity = currentIndex === totalSlides - 1 ? '0.5' : '1';
    nextButton.style.pointerEvents = currentIndex === totalSlides - 1 ? 'none' : 'auto';

    // Reset animation lock after transition
    setTimeout(() => {
        isAnimating = false;
    }, animate ? 600 : 0);
}

// Navigation functions with debouncing
function goToSlide(index, animate = true) {
    if (isAnimating) return;
    currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
    updateCarousel(animate);
    resetAutoplay();
}

function nextSlide() {
    if (isAnimating || currentIndex >= totalSlides - 1) return;
    currentIndex++;
    updateCarousel();
    resetAutoplay();
}

function prevSlide() {
    if (isAnimating || currentIndex <= 0) return;
    currentIndex--;
    updateCarousel();
    resetAutoplay();
}

// Autoplay functionality
function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(() => {
        if (currentIndex < totalSlides - 1) {
            nextSlide();
        } else {
            goToSlide(0);
        }
    }, AUTOPLAY_DELAY);
}

function stopAutoplay() {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
    }
}

function resetAutoplay() {
    if (autoplayInterval) {
        startAutoplay();
    }
}

// Event listeners with improved touch handling
prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

// Enhanced touch/swipe support with better sensitivity
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;
let isSwiping = false;

projectsTrack.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    isSwiping = true;
    stopAutoplay();
}, { passive: true });

projectsTrack.addEventListener('touchmove', e => {
    if (!isSwiping) return;
    
    touchEndX = e.touches[0].clientX;
    touchEndY = e.touches[0].clientY;
    
    // Calculate vertical scroll
    const deltaY = Math.abs(touchEndY - touchStartY);
    
    // If vertical scroll is detected, stop swipe handling
    if (deltaY > 50) {
        isSwiping = false;
        return;
    }
    
    // Prevent page scroll during swipe
    e.preventDefault();
}, { passive: false });

projectsTrack.addEventListener('touchend', () => {
    if (!isSwiping) return;
    
    const swipeDistance = touchStartX - touchEndX;
    const swipeThreshold = window.innerWidth * 0.15; 
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
    
    isSwiping = false;
    startAutoplay();
});

// Keyboard navigation with focus management
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

// Mouse enter/leave handlers for autoplay
const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', stopAutoplay);
carouselContainer.addEventListener('mouseleave', startAutoplay);

// Filter functionality update for carousel with smooth transitions
function filterProjects(filter) {
    projectsTrack.classList.add('filtering');
    
    setTimeout(() => {
        const visibleCards = projectCards.filter(card => {
            const techList = Array.from(card.querySelectorAll('.tech-tag'))
                .map(tag => tag.textContent);
            
            if (filter === 'all') {
                return true;
            }
            
            return techList.some(tech => tech.toLowerCase().includes(filter.toLowerCase()));
        });
        
        // Hide non-matching cards
        projectCards.forEach(card => {
            card.style.display = 'none';
        });
        
        // Show matching cards
        visibleCards.forEach(card => {
            card.style.display = 'block';
        });
        
        // Reset carousel
        currentIndex = 0;
        updateCarousel(false);
        
        setTimeout(() => {
            projectsTrack.classList.remove('filtering');
        }, 300);
    }, 300);
}

// Initialize carousel and handle window resize
function initializeCarousel() {
    updateCarousel(false);
}

// Add resize handler for responsive behavior
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        initializeCarousel();
    }, 100);
});

// Initialize carousel with autoplay
initializeCarousel();
startAutoplay();

// Page Load Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Skill Item Animation
const skillItems = document.querySelectorAll('.skill-item');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.transform = 'scale(1.05)';
                entry.target.style.background = 'var(--primary)';
                setTimeout(() => {
                    entry.target.style.transform = 'scale(1)';
                    entry.target.style.background = 'var(--bg-secondary)';
                }, 200);
            }, index * 50);
        }
    });
}, { threshold: 0.5 });
skillItems.forEach(item => {
    skillObserver.observe(item);
});

// Project Filters
const filterButtons = document.querySelectorAll('.filter-btn');

function filterProjects(filter) {
    projectCards.forEach(card => {
        // Get all technology tags from the card
        const techTags = card.querySelectorAll('.tech-tag');
        const techList = Array.from(techTags).map(tag => tag.textContent.toLowerCase());
        
        // Get project title for ESP32 check
        const projectTitle = card.querySelector('.project-title').textContent.toLowerCase();
        
        // Show all projects if filter is 'all'
        if (filter === 'all') {
            card.style.display = 'block';
            return;
        }

        // Special handling for ESP32 filter
        if (filter === 'esp32' && projectTitle.includes('esp32')) {
            card.style.display = 'block';
            return;
        }

        // Check if any of the tech tags match the filter
        const matchesFilter = techList.some(tech => tech.toLowerCase().includes(filter.toLowerCase()));
        card.style.display = matchesFilter ? 'block' : 'none';
    });
}

// Add click event listeners to filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        // Get filter value and apply filtering
        const filter = button.getAttribute('data-filter').toLowerCase();
        filterProjects(filter);
        
        // Trigger layout animations
        projectCards.forEach(card => {
            if (card.style.display !== 'none') {
                card.classList.add('fade-in');
                setTimeout(() => card.classList.remove('fade-in'), 500);
            }
        });
    });
});

// Initialize with 'all' filter
filterProjects('all');

// Project Card Entrance Animation
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 150);
        }
    });
}, { threshold: 0.2 });
document.querySelectorAll('.project-card').forEach(card => {
    projectObserver.observe(card);
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('light');
        const isLight = document.documentElement.classList.contains('light');
        themeToggle.innerHTML = `<i class="fas fa-${isLight ? 'sun' : 'moon'}"></i>`;
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
    // Load saved theme
    if (localStorage.getItem('theme') === 'light') {
        document.documentElement.classList.add('light');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Contact Form Handler
const contactForm = document.querySelector('form.contact-form');

// Function to get the correct base URL
function getBaseUrl() {
    if (window.location.hostname === 'skca01.github.io') {
        return '/Kent-Portfolio/';
    }
    return '/';
}

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const button = this.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;

        if (!this.elements.name || !this.elements.email || !this.elements.subject || !this.elements.message) {
            button.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Form fields missing';
            button.style.background = '#ef4444';
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
            }, 5000);
            return;
        }

        const constraints = {
            name: { presence: { allowEmpty: false }, format: { pattern: /^[A-Za-z .'-]+$/, message: 'must be a valid name' } },
            email: { presence: { allowEmpty: false }, email: true },
            subject: { presence: { allowEmpty: false }, length: { minimum: 5, message: 'must be at least 5 characters' } },
            message: { presence: { allowEmpty: false }, length: { minimum: 10, message: 'must be at least 10 characters' } }
        };

        const formValues = {
            name: this.elements.name.value,
            email: this.elements.email.value,
            subject: this.elements.subject.value,
            message: this.elements.message.value
        };

        const errors = validate(formValues, constraints);

        if (errors) {
            const errorMessage = Object.values(errors).join('<br>');
            button.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${errorMessage}`;
            button.style.background = '#ef4444';
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
                button.style.background = '';
                button.style.cursor = '';
            }, 5000);
            return;
        }

        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        button.disabled = true;
        button.style.background = '#6b7280';
        button.style.cursor = 'not-allowed';

        try {
            const formData = new FormData(this);
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                window.location.href = './thanks.html';
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            button.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Submission failed';
            button.style.background = '#ef4444';
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
                button.style.background = '';
                button.style.cursor = '';
            }, 5000);
        }
    });
}

// Ripple Effect for Social Links
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function (e) {
        const ripple = this.querySelector('.ripple');
        ripple.style.left = `${e.offsetX}px`;
        ripple.style.top = `${e.offsetY}px`;
        ripple.style.animation = 'none';
        ripple.offsetHeight;
        ripple.style.animation = 'ripple 0.6s linear';
    });
});

// Keyboard Accessibility for Mobile Menu
if (mobileMenu) {
    mobileMenu.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const isActive = navLinksContainer.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            mobileMenu.setAttribute('aria-expanded', isActive);
            if (isActive) {
                navLinksContainer.querySelector('a').focus();
            }
        }
    });
}

// Visitor Counter Fallback
const visitorCounterImg = document.getElementById('visitor-counter');
if (visitorCounterImg) {
    visitorCounterImg.addEventListener('error', () => {
        visitorCounterImg.parentElement.parentElement.textContent = 'Visitors: N/A';
    });
}

// Resume Download Handler
const resumeButton = document.querySelector('a[href="resume.pdf"]');
if (resumeButton) {
    resumeButton.addEventListener('click', function(e) {
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
        setTimeout(() => {
            this.innerHTML = originalText;
        }, 2000);
    });
}

// Service Worker Registration
if ('serviceWorker' in navigator && 
    (window.location.protocol === 'https:' || window.location.hostname === 'localhost')) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Cookie Consent Handler
const cookieConsent = document.getElementById('cookieConsent');
const acceptCookies = document.getElementById('acceptCookies');
const declineCookies = document.getElementById('declineCookies');

const COOKIE_CONSENT_KEY = 'cookie-consent-status';

// Check if user has already made a choice
const cookieChoice = localStorage.getItem(COOKIE_CONSENT_KEY);
if (!cookieChoice) {
    setTimeout(() => {
        cookieConsent.classList.add('show');
    }, 2000);
}

acceptCookies.addEventListener('click', () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    cookieConsent.classList.remove('show');
    // Enable analytics or other cookie-dependent features here
});

declineCookies.addEventListener('click', () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
    cookieConsent.classList.remove('show');
    // Disable analytics or other cookie-dependent features here
});

// Toast notification function
function showToast(message, type = 'success') {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    // Create new toast
    const toast = document.createElement('div');
    toast.className = `toast-notification ${type}`;
    
    // Add icon based on type
    const icon = type === 'success' ? 'check-circle' : 'exclamation-circle';
    toast.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;

    // Add toast to body
    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Helper function to escape HTML and prevent XSS
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Function to display feedback
function displayFeedback(feedbackData) {
    const feedbackList = document.getElementById('feedbackList');
    if (!feedbackList) {
        console.error('Feedback list element not found');
        return;
    }
    feedbackList.innerHTML = '';

    if (!feedbackData) {
        console.log('No feedback data to display');
        feedbackList.innerHTML = '<p class="no-feedback">No feedback yet. Be the first to share your thoughts!</p>';
        return;
    }

    const feedbacks = Object.values(feedbackData || {}).sort((a, b) => b.timestamp - a.timestamp);
    const recentFeedbacks = feedbacks.slice(0, 5);

    if (recentFeedbacks.length === 0) {
        feedbackList.innerHTML = '<p class="no-feedback">No feedback yet. Be the first to share your thoughts!</p>';
        return;
    }

    recentFeedbacks.forEach(feedback => {
        const date = new Date(feedback.timestamp);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        const feedbackItem = document.createElement('div');
        feedbackItem.className = 'feedback-item';
        feedbackItem.innerHTML = `
            <div class="feedback-header">
                <span class="feedback-name">${escapeHtml(feedback.name)}</span>
                <span class="feedback-rating">${'★'.repeat(feedback.rating)}${'☆'.repeat(5 - feedback.rating)}</span>
            </div>
            <div class="feedback-message">${escapeHtml(feedback.message)}</div>
            <div class="feedback-date">${formattedDate}</div>
        `;
        feedbackList.appendChild(feedbackItem);
    });
}

// Function to update star rating display
function updateStars(stars, rating, permanent = false) {
    stars.forEach(star => {
        const starRating = parseInt(star.getAttribute('data-rating'));
        if (starRating <= rating) {
            star.classList.remove('far');
            star.classList.add('fas');
        } else {
            star.classList.remove('fas');
            star.classList.add('far');
        }
        if (permanent) {
            star.classList.add('active');
        } else if (!permanent && starRating > currentRating) {
            star.classList.remove('active');
        }
    });
}

// Firebase Configuration and Initialization
const firebaseConfig = {
    apiKey: "AIzaSyA1RX5oQH8ZcoQcgajSBrNabkqXwYlGPlA",
    authDomain: "my-portfolio-feedback.firebaseapp.com",
    databaseURL: "https://my-portfolio-feedback-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "my-portfolio-feedback",
    storageBucket: "my-portfolio-feedback.firebasestorage.app",
    messagingSenderId: "226873771346",
    appId: "1:226873771346:web:adfb553ec0b6d145cd668b",
    measurementId: "G-1FPWJ75Z2P"
};

// Initialize Firebase with better error handling
async function initializeFirebase() {
    try {
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        const database = firebase.database();
        console.log('Firebase initialized successfully');

        // Test database connection
        const connectedRef = database.ref(".info/connected");
        connectedRef.on("value", (snap) => {
            if (snap.val() === true) {
                console.log("Connected to Firebase");
            } else {
                console.log("Not connected to Firebase");
            }
        });

        // Load initial feedback
        const feedbackRef = database.ref('feedback');
        const snapshot = await feedbackRef.once('value');
        console.log('Initial feedback data:', snapshot.val());
        
        if (!snapshot.val()) {
            console.log('No feedback data found in database');
        }

        // Set up real-time listener
        feedbackRef.on('value', (snapshot) => {
            console.log('Received feedback update:', snapshot.val());
            displayFeedback(snapshot.val());
        }, (error) => {
            console.error('Error fetching feedback:', error);
            showToast('Error loading feedback. Please try again later.', 'error');
        });

        return database;
    } catch (error) {
        console.error('Error initializing Firebase:', error);
        showToast('Error connecting to the feedback system. Please try again later.', 'error');
        throw error;
    }
}

// Initialize Firebase and set up feedback system
let currentRating = 0;

initializeFirebase().then(database => {
    // Star rating functionality
    const stars = document.querySelectorAll('.stars i');
    const ratingText = document.querySelector('.rating-text');

    stars.forEach(star => {
        star.addEventListener('mouseover', () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            updateStars(stars, rating, false);
        });

        star.addEventListener('mouseout', () => {
            updateStars(stars, currentRating, false);
        });

        star.addEventListener('click', () => {
            currentRating = parseInt(star.getAttribute('data-rating'));
            updateStars(stars, currentRating, true);
            ratingText.textContent = `You rated ${currentRating} star${currentRating !== 1 ? 's' : ''}`;
        });
    });

    // Handle feedback form submission
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        console.log('Feedback form found');
        feedbackForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('Form submitted');

            if (currentRating === 0) {
                showToast('Please select a rating before submitting your feedback.', 'error');
                return;
            }

            const name = document.getElementById('visitorName').value.trim() || 'Anonymous';
            const message = document.getElementById('feedbackMessage').value.trim();

            if (!message) {
                showToast('Please enter your feedback message.', 'error');
                return;
            }

            const feedback = {
                name,
                rating: currentRating,
                message,
                timestamp: firebase.database.ServerValue.TIMESTAMP
            };

            console.log('Attempting to submit feedback:', feedback);

            try {
                await database.ref('feedback').push(feedback);
                console.log('Feedback submitted successfully');
                feedbackForm.reset();
                currentRating = 0;
                updateStars(stars, 0);
                ratingText.textContent = 'Click to rate';
                showToast('Thank you for your feedback! 🌟', 'success');
            } catch (error) {
                console.error('Error submitting feedback:', error);
                showToast('Sorry, there was an error submitting your feedback. Please try again.', 'error');
            }
        });
    } else {
        console.error('Feedback form not found in the DOM');
    }
}).catch(error => {
    console.error('Failed to initialize feedback system:', error);
});

// Add modal overlay to the body
document.body.insertAdjacentHTML('beforeend', '<div class="modal-overlay"></div>');
const modalOverlay = document.querySelector('.modal-overlay');

// Feedback Modal Functionality
const feedbackModal = document.getElementById('feedbackModal');
const feedbackLink = document.querySelector('a[href="#feedback"]');
const closeModal = document.querySelector('.close-modal');

function openFeedbackModal(e) {
    if (e) e.preventDefault();
    feedbackModal.classList.add('active');
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeFeedbackModal() {
    feedbackModal.classList.remove('active');
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (feedbackLink) {
    feedbackLink.addEventListener('click', openFeedbackModal);
}

if (closeModal) {
    closeModal.replaceWith(closeModal.cloneNode(true));
    const newCloseModal = document.querySelector('.close-modal');
    newCloseModal.addEventListener('click', (e) => {
        e.stopPropagation();
        closeFeedbackModal();
    });
}

// Close modal when clicking outside
modalOverlay.addEventListener('click', closeFeedbackModal);

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeFeedbackModal();
    }
});

// Prevent modal content clicks from closing the modal
feedbackModal.addEventListener('click', (e) => {
    e.stopPropagation();
});
=======
/**
 * Kent Carlo B. Amante Portfolio - Scripts
 * 
 * @author: Kent Carlo B. Amante
 * @email: carloamante125@gmail.com
 * @github: https://github.com/Skca01
 * @description: Main JavaScript functionality for personal portfolio website
 * @copyright: © 2025 Kent Carlo B. Amante. All rights reserved.
 */

// Smooth Scrolling
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

// Navbar Scroll Effects
const navbar = document.getElementById('navbar');
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    if (currentScroll > lastScroll && currentScroll > 500) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
});

// Active Nav Link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Scroll Reveal for Sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);
document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
});

// Typewriter Effect
const subtitle = document.querySelector('.hero-subtitle');
if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    setTimeout(typeWriter, 1000);
}

// Particle Network Animation (Disabled on Mobile)
const isMobile = window.innerWidth <= 768;
const canvas = document.getElementById('particle-network');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.radius = 2;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'var(--primary)';
            ctx.fill();
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
        }
    }

    if (!isMobile) {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function drawLines() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(37, 99, 235, ${1 - distance / 100})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            drawLines();
            requestAnimationFrame(animateParticles);
        }

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        animateParticles();
    }
}

// Particle Animation (Existing)
const createParticle = () => {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--primary);
        border-radius: 50%;
        pointer-events: none;
        opacity: 0.7;
        animation: particleFloat 3s linear infinite;
    `;
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    document.querySelector('.hero').appendChild(particle);
    setTimeout(() => {
        particle.remove();
    }, 3000);
};
if (!isMobile) {
    setInterval(createParticle, 300);
}

// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinksContainer = document.querySelector('.nav-links');
if (mobileMenu && navLinksContainer) {
    mobileMenu.addEventListener('click', () => {
        const isActive = navLinksContainer.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        mobileMenu.setAttribute('aria-expanded', isActive);
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileMenu.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!navLinksContainer.contains(e.target) && !mobileMenu.contains(e.target) && navLinksContainer.classList.contains('active')) {
            navLinksContainer.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileMenu.setAttribute('aria-expanded', 'false');
        }
    });
}

// Back to Top Button
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Project Card Hover Effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        if (!isMobile) {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        }
    });
    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Page Load Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Skill Item Animation
const skillItems = document.querySelectorAll('.skill-item');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.transform = 'scale(1.05)';
                entry.target.style.background = 'var(--primary)';
                setTimeout(() => {
                    entry.target.style.transform = 'scale(1)';
                    entry.target.style.background = 'var(--bg-secondary)';
                }, 200);
            }, index * 50);
        }
    });
}, { threshold: 0.5 });
skillItems.forEach(item => {
    skillObserver.observe(item);
});

// Project Filters
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

function filterProjects(filter) {
    projectCards.forEach(card => {
        // Get all technology tags from the card
        const techTags = card.querySelectorAll('.tech-tag');
        const techList = Array.from(techTags).map(tag => tag.textContent.toLowerCase());
        
        // Get project title for ESP32 check
        const projectTitle = card.querySelector('.project-title').textContent.toLowerCase();
        
        // Show all projects if filter is 'all'
        if (filter === 'all') {
            card.style.display = 'block';
            return;
        }

        // Special handling for ESP32 filter
        if (filter === 'esp32' && projectTitle.includes('esp32')) {
            card.style.display = 'block';
            return;
        }

        // Check if any of the tech tags match the filter
        const matchesFilter = techList.some(tech => tech.toLowerCase().includes(filter.toLowerCase()));
        card.style.display = matchesFilter ? 'block' : 'none';
    });
}

// Add click event listeners to filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        // Get filter value and apply filtering
        const filter = button.getAttribute('data-filter').toLowerCase();
        filterProjects(filter);
        
        // Trigger layout animations
        projectCards.forEach(card => {
            if (card.style.display !== 'none') {
                card.classList.add('fade-in');
                setTimeout(() => card.classList.remove('fade-in'), 500);
            }
        });
    });
});

// Initialize with 'all' filter
filterProjects('all');

// Project Card Entrance Animation
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 150);
        }
    });
}, { threshold: 0.2 });
document.querySelectorAll('.project-card').forEach(card => {
    projectObserver.observe(card);
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('light');
        const isLight = document.documentElement.classList.contains('light');
        themeToggle.innerHTML = `<i class="fas fa-${isLight ? 'sun' : 'moon'}"></i>`;
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
    // Load saved theme
    if (localStorage.getItem('theme') === 'light') {
        document.documentElement.classList.add('light');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Contact Form Handler
const contactForm = document.querySelector('form.contact-form');

// Function to get the correct base URL
function getBaseUrl() {
    // Check if we're on GitHub Pages
    if (window.location.hostname === 'skca01.github.io') {
        return '/Kent-Portfolio/';
    }
    // Local environment
    return '/';
}

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const button = this.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;

        if (!this.elements.name || !this.elements.email || !this.elements.subject || !this.elements.message) {
            button.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Form fields missing';
            button.style.background = '#ef4444';
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
            }, 5000);
            return;
        }

        const constraints = {
            name: { presence: { allowEmpty: false }, format: { pattern: /^[A-Za-z .'-]+$/, message: 'must be a valid name' } },
            email: { presence: { allowEmpty: false }, email: true },
            subject: { presence: { allowEmpty: false }, length: { minimum: 5, message: 'must be at least 5 characters' } },
            message: { presence: { allowEmpty: false }, length: { minimum: 10, message: 'must be at least 10 characters' } }
        };

        const formValues = {
            name: this.elements.name.value,
            email: this.elements.email.value,
            subject: this.elements.subject.value,
            message: this.elements.message.value
        };

        const errors = validate(formValues, constraints);

        if (errors) {
            const errorMessage = Object.values(errors).join('<br>');
            button.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${errorMessage}`;
            button.style.background = '#ef4444';
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
                button.style.background = '';
                button.style.cursor = '';
            }, 5000);
            return;
        }

        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        button.disabled = true;
        button.style.background = '#6b7280';
        button.style.cursor = 'not-allowed';

        try {
            const formData = new FormData(this);
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                window.location.href = './thanks.html';
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            button.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Submission failed';
            button.style.background = '#ef4444';
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
                button.style.background = '';
                button.style.cursor = '';
            }, 5000);
        }
    });
}

// Ripple Effect for Social Links
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function (e) {
        const ripple = this.querySelector('.ripple');
        ripple.style.left = `${e.offsetX}px`;
        ripple.style.top = `${e.offsetY}px`;
        ripple.style.animation = 'none';
        ripple.offsetHeight;
        ripple.style.animation = 'ripple 0.6s linear';
    });
});

// Keyboard Accessibility for Mobile Menu
if (mobileMenu) {
    mobileMenu.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const isActive = navLinksContainer.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            mobileMenu.setAttribute('aria-expanded', isActive);
            if (isActive) {
                navLinksContainer.querySelector('a').focus();
            }
        }
    });
}

// Visitor Counter Fallback
const visitorCounterImg = document.getElementById('visitor-counter');
if (visitorCounterImg) {
    visitorCounterImg.addEventListener('error', () => {
        visitorCounterImg.parentElement.parentElement.textContent = 'Visitors: N/A';
    });
}

// Resume Download Handler
const resumeButton = document.querySelector('a[href="resume.pdf"]');
if (resumeButton) {
    resumeButton.addEventListener('click', function(e) {
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
        setTimeout(() => {
            this.innerHTML = originalText;
        }, 2000);
    });
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Cookie Consent Handler
const cookieConsent = document.getElementById('cookieConsent');
const acceptCookies = document.getElementById('acceptCookies');
const declineCookies = document.getElementById('declineCookies');

const COOKIE_CONSENT_KEY = 'cookie-consent-status';

// Check if user has already made a choice
const cookieChoice = localStorage.getItem(COOKIE_CONSENT_KEY);
if (!cookieChoice) {
    setTimeout(() => {
        cookieConsent.classList.add('show');
    }, 2000);
}

acceptCookies.addEventListener('click', () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    cookieConsent.classList.remove('show');
    // Enable analytics or other cookie-dependent features here
});

declineCookies.addEventListener('click', () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
    cookieConsent.classList.remove('show');
    // Disable analytics or other cookie-dependent features here
});
>>>>>>> ded355adb829069656590118c2e835b854c5acad
