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

// Particle Network Animation (Disabled on Mobile)
const isMobile = window.innerWidth <= 768;
const canvas = document.getElementById('particle-network');
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
setInterval(createParticle, 300);

// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinksContainer = document.querySelector('.nav-links');
mobileMenu.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Back to Top Button
const backToTop = document.querySelector('.back-to-top');
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
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const filter = button.getAttribute('data-filter');
        document.querySelectorAll('.project-card').forEach(card => {
            card.classList.remove('hidden');
            if (filter !== 'all' && !card.querySelector('.project-tech').innerHTML.toLowerCase().includes(filter)) {
                card.classList.add('hidden');
            }
        });
    });
});

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

// Form Validation and Submission
document.querySelector('form.contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    if (!this.elements.name || !this.elements.email || !this.elements.subject || !this.elements.message) {
        const button = this.querySelector('button[type="submit"]');
        button.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Form fields missing';
        button.style.background = '#ef4444';
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
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
    const button = this.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;

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

// Ripple Effect for Social Links (Footer Only)
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function (e) {
        const ripple = this.querySelector('.ripple');
        ripple.style.left = `${e.offsetX}px`;
        ripple.style.top = `${e.offsetY}px`;
        ripple.style.animation = 'none';
        ripple.offsetHeight; // Trigger reflow
        ripple.style.animation = 'ripple 0.6s linear';
    });
});
