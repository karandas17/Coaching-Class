// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
const mobileMenuIcon = mobileMenu.querySelector('i');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Toggle icon between list and x
    if (navLinks.classList.contains('active')) {
        mobileMenuIcon.classList.replace('ph-list', 'ph-x');
    } else {
        mobileMenuIcon.classList.replace('ph-x', 'ph-list');
    }
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuIcon.classList.replace('ph-x', 'ph-list');
    });
});

// Sticky Header & Active Link styling on scroll
const header = document.getElementById('header');
const backToTopBtn = document.getElementById('backToTop');
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    // Header shadow and padding
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        backToTopBtn.classList.add('active');
    } else {
        header.classList.remove('scrolled');
        backToTopBtn.classList.remove('active');
    }

    // Active link highlighting
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Counter Animation for Achievements Section
const counters = document.querySelectorAll('.counter');
const speed = 200; // The lower the slower

const animateCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

// Intersection Observer to trigger counter animation when in view
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const achievementsSection = document.getElementById('counters');
if (achievementsSection) {
    observer.observe(achievementsSection);
}

// Form Submission Handling
const admissionForm = document.getElementById('admissionForm');
if (admissionForm) {
    admissionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic feedback
        const btn = admissionForm.querySelector('button');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = 'Sending... <i class="ph ph-spinner ph-spin"></i>';
        
        setTimeout(() => {
            alert('Thank you for your inquiry! Our counselor will contact you soon.');
            admissionForm.reset();
            btn.innerHTML = originalText;
        }, 1500);
    });
}
