/* ═══════════════════════════════════════════
   LeadFlow CRM — script.js
   ═══════════════════════════════════════════ */

const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navActions = document.querySelector('.nav-actions');
const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}

// Mobile menu toggle
if (toggle && navLinks && navActions) {
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navActions.classList.toggle('open');
  });

  // Close menu when a link is clicked
  document.querySelectorAll('.nav-links a, .nav-actions a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navActions.classList.remove('open');
    });
  });
}

// Modal functions
function openModal(modalId) {
  document.getElementById(modalId).style.display = 'flex';
}

function closeModal(event, modalId) {
  const modal = document.getElementById(modalId);
  if (event && event.target !== modal) return;
  modal.style.display = 'none';
}

function openDemoModal() {
  openModal('demoModal');
}

function openContactForm() {
  openModal('contactModal');
}

// Form submission handlers
function submitDemoForm(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company'),
    date: formData.get('date')
  };
  console.log('Demo booking submitted:', data);
  showToast('Demo scheduled! We\'ll contact you soon.', 'success');
  closeModal(null, 'demoModal');
  event.target.reset();
}

function submitContactForm(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company'),
    message: formData.get('message')
  };
  console.log('Contact form submitted:', data);
  showToast('Message sent! We\'ll get back to you soon.', 'success');
  closeModal(null, 'contactModal');
  event.target.reset();
}

// Toast notification
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Scroll animations for cards
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll('.feature-card, .step-card, .insight-box, .testimonial-card, .cta-card').forEach((el) => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Stats counter animation
function animateCounter(element, target, duration = 1500) {
  if (element.dataset.animated) return;
  element.dataset.animated = 'true';

  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Trigger stats animation on scroll
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const stat = entry.target;
        const value = parseInt(stat.dataset.value || stat.textContent);
        animateCounter(stat, value);
        statsObserver.unobserve(stat);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('.stat-value').forEach((el) => {
  if (el.textContent.includes('%') || el.textContent.match(/^\d+$/)) {
    const numValue = parseInt(el.textContent);
    el.dataset.value = numValue;
    statsObserver.observe(el);
  }
});

// Feature card hover effect
document.querySelectorAll('.feature-card, .step-card, .insight-box').forEach((card) => {
  card.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-4px)';
  });
  card.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0)';
  });
});

// Update button click handlers
document.querySelectorAll('[onclick*="#contact"]').forEach((btn) => {
  if (btn.textContent.includes('Get Started')) {
    btn.onclick = () => openDemoModal();
  }
});

// Book Demo button
document.querySelectorAll('.nav-btn-dark').forEach((btn) => {
  if (btn.textContent.includes('Book Demo')) {
    btn.onclick = (e) => {
      e.preventDefault();
      openDemoModal();
    };
  }
});

// Smooth scroll behavior for navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ═══════════════════════════════════════════
   NEW FEATURES
   ═══════════════════════════════════════════ */

// Newsletter subscription
function submitNewsletter(event) {
  event.preventDefault();
  const email = event.target.querySelector('input[name="email"]').value;
  console.log('Newsletter subscription:', email);
  showToast('✓ Thank you for subscribing! Check your email for confirmation.', 'success');
  event.target.reset();
}

// FAQ toggle functionality
function toggleFAQ(button) {
  const faqItem = button.closest('.faq-item');
  const answer = faqItem.querySelector('.faq-answer');
  const isOpen = faqItem.classList.contains('open');

  // Close all other FAQs
  document.querySelectorAll('.faq-item').forEach((item) => {
    if (item !== faqItem) {
      item.classList.remove('open');
      item.querySelector('.faq-answer').style.display = 'none';
    }
  });

  // Toggle current FAQ
  if (isOpen) {
    faqItem.classList.remove('open');
    answer.style.display = 'none';
  } else {
    faqItem.classList.add('open');
    answer.style.display = 'block';
  }
}

// Testimonial carousel scrolling
function scrollTestimonials(direction) {
  const carousel = document.querySelector('.testimonials-carousel');
  const scrollAmount = 320; // Card width + gap
  carousel.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}

// Auto-scroll testimonials on load
window.addEventListener('load', () => {
  const carousel = document.querySelector('.testimonials-carousel');
  if (carousel) {
    // Optional: Auto-rotate testimonials every 8 seconds
    // setInterval(() => {
    //   scrollTestimonials(1);
    // }, 8000);
  }
});

// Keyboard navigation for FAQ
document.querySelectorAll('.faq-question').forEach((button) => {
  button.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFAQ(button);
    }
  });
});


