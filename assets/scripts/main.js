document.addEventListener('DOMContentLoaded', function() {
  // Get all modal elements
  const modals = document.querySelectorAll('.investment-modal');
  const openButtons = document.querySelectorAll('.open-modal');
  const closeButtons = document.querySelectorAll('.modal-close, .modal-backdrop');

  // Open modal function
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'block';
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      // Focus on close button
      const closeBtn = modal.querySelector('.modal-close');
      if (closeBtn) {
        setTimeout(() => closeBtn.focus(), 100);
      }

      console.log('Modal opened:', modalId);
    }
  }

  // Close modal function
  function closeModal(modal) {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }

  // Add click event to all open buttons
  openButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const modalId = this.getAttribute('data-modal');
      if (modalId) {
        openModal(modalId);
      }
    });
  });

  // Add click event to close buttons
  closeButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const modal = this.closest('.investment-modal');
      if (modal) {
        closeModal(modal);
      }
    });
  });

  // Close modal on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        if (modal.style.display === 'block') {
          closeModal(modal);
        }
      });
    }
  });

  // Close modal when clicking outside content (on backdrop)
  modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
      // Check if click is directly on the modal backdrop
      if (e.target === this || e.target.classList.contains('modal-backdrop')) {
        closeModal(this);
      }
    });
  });

  // FAQ toggle functionality
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const faqItem = this.closest('.faq-item');
      const answer = this.nextElementSibling;

      // Toggle active class
      faqItem.classList.toggle('active');

      // Toggle answer display
      if (faqItem.classList.contains('active')) {
        answer.style.display = 'block';
        this.querySelector('span:last-child').textContent = '−';
      } else {
        answer.style.display = 'none';
        this.querySelector('span:last-child').textContent = '+';
      }
    });
  });

  // Investment button click handlers
  document.querySelectorAll('.btn-invest-primary').forEach(btn => {
    btn.addEventListener('click', function() {
      const modal = this.closest('.investment-modal');
      const modalId = modal ? modal.id : 'unknown';
      console.log('Investment button clicked for:', modalId);
      alert('Investment flow would start here in production');
    });
  });

  console.log('All investment modals initialized successfully');
});

// Modal Animation
const style = document.createElement('style');
style.textContent = `
      @keyframes modalFadeUp {
        from {
          opacity: 0;
          transform: translateY(40px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* Hover Effects */
      .document-link:hover {
        background: rgba(255,255,255,0.08) !important;
        border-color: rgba(255,255,255,0.2) !important;
        transform: translateY(-2px);
      }

      .btn-invest-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
      }

      .btn-secondary:hover {
        background: rgba(255,255,255,0.1) !important;
        border-color: rgba(255,255,255,0.2) !important;
      }

      .modal-close:hover {
        background: rgba(255,255,255,0.2) !important;
      }

      /* FAQ Animation */
      .faq-item.active .faq-answer {
        display: block !important;
        animation: fadeIn 0.3s ease;
      }

      .faq-item.active .faq-question span:last-child {
        transform: rotate(45deg);
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      /* Responsive */
      @media (max-width: 768px) {
        .investment-modal .modal-content {
          max-height: 95vh !important;
          margin: 10px !important;
        }

        .modal-body {
          padding: 24px !important;
        }

        .modal-header h2 {
          font-size: 2rem !important;
        }

        .modal-body > div[style*="grid-template-columns"] {
          grid-template-columns: 1fr !important;
        }
      }
    `;
document.head.appendChild(style);

// Filter functionality for investment cards
document.addEventListener('DOMContentLoaded', function() {
  const categoryButtons = document.querySelectorAll('.category-btn');
  const investmentCards = document.querySelectorAll('.investment-card');

  // Add data-tooltip attributes for metric items
  document.querySelectorAll('.metric-item').forEach(item => {
    if (item.querySelector('div:first-child').textContent.trim() === 'ROI') {
      item.setAttribute('data-tooltip', 'Projected total return based on pro forma estimates. Not guaranteed.');
    } else if (item.querySelector('div:first-child').textContent.trim() === 'Tenure') {
      item.setAttribute('data-tooltip', 'Estimated holding period. Liquidity subject to terms.');
    }
  });

  // Category filter functionality
  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      const category = this.getAttribute('data-category');

      // Update active button
      categoryButtons.forEach(btn => {
        if (btn === this) {
          btn.classList.add('active');
          btn.style.background = category === 'all'
              ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
              : 'rgba(255,255,255,0.1)';
          btn.style.color = category === 'all' ? '#0f172a' : '#fff';
          btn.style.border = category === 'all' ? 'none' : '1px solid rgba(255,255,255,0.2)';
        } else {
          btn.classList.remove('active');
          btn.style.background = 'rgba(255,255,255,0.05)';
          btn.style.color = 'var(--slate-300)';
          btn.style.border = '1px solid rgba(255,255,255,0.1)';
        }
      });

      // Filter cards
      investmentCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'block';
          card.style.animation = 'cardFadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Add hover effects for buttons
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
      if (this.classList.contains('btn-primary')) {
        this.style.boxShadow = '0 10px 25px rgba(245, 158, 11, 0.3)';
      } else {
        this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
      }
    });

    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = 'none';
    });
  });
});

// --- Merged: original_main.js (start) ---

// assets/scripts/main.js
// ASRD Website JavaScript - Unified for all pages

// ========== GLOBAL UTILITIES ==========

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ========== TAB FUNCTIONALITY FOR PROBLEM SECTION ==========
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  if (tabBtns.length === 0 || tabContents.length === 0) {
    console.log('No tabs found to initialize');
    return;
  }

  console.log('Initializing compact tabs...');

  // Set initial active state
  tabContents[0].classList.add('active');
  tabContents[0].style.display = 'block';
  if (tabContents[1]) {
    tabContents[1].style.display = 'none';
  }

  // Add click handlers to all tab buttons
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');

      console.log('Tab clicked:', tabId);

      // Remove active class from all buttons
      tabBtns.forEach(b => {
        b.classList.remove('active');
        if (b.getAttribute('data-tab') === 'tab1') {
          b.style.background = 'rgba(100, 116, 139, 0.1)';
          b.style.color = 'var(--slate-400)';
          b.style.border = '1px solid rgba(255,255,255,0.1)';
        }
      });

      // Hide all tab contents
      tabContents.forEach(c => {
        c.classList.remove('active');
        c.style.display = 'none';
      });

      // Style the active button
      this.classList.add('active');
      if (tabId === 'tab1') {
        this.style.background = 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
        this.style.color = '#0f172a';
        this.style.border = 'none';
      } else {
        this.style.background = 'rgba(100, 116, 139, 0.3)';
        this.style.color = '#fff';
        this.style.border = '1px solid rgba(255,255,255,0.2)';
      }

      // Show the selected content
      const targetContent = document.getElementById(tabId);
      if (targetContent) {
        targetContent.classList.add('active');
        targetContent.style.display = 'block';
      }
    });
  });

  console.log('Compact tabs initialized successfully');
}

// ========== MODAL FUNCTIONALITY ==========
function initInvestmentModals() {
  // Get all modal elements
  const modals = document.querySelectorAll('.investment-modal');
  const openButtons = document.querySelectorAll('.open-modal');
  const closeButtons = document.querySelectorAll('.modal-close, .modal-backdrop');

  if (modals.length === 0) {
    console.log('No investment modals found');
    return;
  }

  console.log(`Found ${modals.length} investment modals`);

  // Open modal function
  // when binding openButtons
  openButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const modalId = this.getAttribute('data-modal') || (this.getAttribute('href') || '').substring(1);

      // copy card img into modal hero so modal always shows the same image as the card
      try {
        const card = this.closest('.investment-card');
        const cardImg = card ? card.querySelector('img') : null;
        const modal = modalId ? document.getElementById(modalId) : null;
        if (cardImg && modal) {
          const heroImg = modal.querySelector('.modal-content img') || modal.querySelector('img');
          if (heroImg) {
            // only set src if different to avoid unnecessary reload
            if (heroImg.src !== cardImg.src) heroImg.src = cardImg.src;
          }
        }
      } catch (err) { console.warn('image copy to modal failed', err); }

      if (modalId) {
        openModal(modalId);
      }
    });
  });

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) {
      console.error('Modal not found:', modalId);
      return;
    }

    // Analytics event based on modal ID
    const analyticsEvents = {
      'hotel_lux_waterfront_01_modal': {
        name: "offer_modal_open",
        props: {
          offer_id: "hotel_lux_waterfront_01",
          category: "Hotel chains",
          roi: 34,
          tenure_months: 48,
          min_invest_usd: 100,
          funding_percent: 85
        }
      },
      'transport_petrol_pumps_01_modal': {
        name: "offer_modal_open",
        props: {
          offer_id: "transport_petrol_pumps_01",
          category: "Transportation",
          roi: 28,
          tenure_months: 60,
          min_invest_usd: 100,
          funding_percent: 72
        }
      },
      'healthcare_hospital_campus_01_modal': {
        name: "offer_modal_open",
        props: {
          offer_id: "healthcare_hospital_campus_01",
          category: "Health Care",
          roi: 26,
          tenure_months: 84,
          min_invest_usd: 100,
          funding_percent: 85
        }
      },
      'education_k12_campus_01_modal': {
        name: "offer_modal_open",
        props: {
          offer_id: "education_k12_campus_01",
          category: "Education",
          roi: 22,
          tenure_months: 60,
          min_invest_usd: 100,
          funding_percent: 60
        }
      }
    };

    const eventData = analyticsEvents[modalId];
    if (eventData) {
      console.log(JSON.stringify(eventData));
    }

    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus on close button
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
      setTimeout(() => closeBtn.focus(), 100);
    }
  }

  // Close modal function
  function closeModal(modal) {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
  }

  // Add click event to all open buttons
  openButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const modalId = this.getAttribute('data-modal') || this.getAttribute('href').substring(1);
      if (modalId) {
        openModal(modalId);
      }
    });
  });

  // Add click event to close buttons
  closeButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const modal = this.closest('.investment-modal');
      if (modal) {
        closeModal(modal);
      }
    });
  });

  // Close modal on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        if (modal.style.display === 'block') {
          closeModal(modal);
        }
      });
    }
  });

  // Close modal when clicking outside content
  modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
      // Check if click is on the modal backdrop (outside content)
      if (e.target === this || e.target.classList.contains('modal-backdrop')) {
        closeModal(this);
      }
    });
  });

  // FAQ toggle functionality for all modals
  modals.forEach(modal => {
    const faqQuestions = modal.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
      question.addEventListener('click', function() {
        const faqItem = this.closest('.faq-item');
        const isActive = faqItem.classList.contains('active');

        // Close all FAQ items in this modal
        faqQuestions.forEach(q => {
          const item = q.closest('.faq-item');
          item.classList.remove('active');
          const answer = item.querySelector('.faq-answer');
          const icon = q.querySelector('span:last-child');
          if (answer) answer.style.display = 'none';
          if (icon) icon.textContent = '+';
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
          faqItem.classList.add('active');
          const answer = faqItem.querySelector('.faq-answer');
          const icon = this.querySelector('span:last-child');
          if (answer) answer.style.display = 'block';
          if (icon) icon.textContent = '×';
        }
      });
    });

    // Investment button analytics for each modal
    const investBtn = modal.querySelector('.btn-invest-primary');
    if (investBtn) {
      investBtn.addEventListener('click', function() {
        const modalId = modal.id;
        const investEvents = {
          'hotel_lux_waterfront_01_modal': {
            name: "cta_click_invest",
            props: {
              offer_id: "hotel_lux_waterfront_01",
              amount_selected: 100,
              user_id: "user_placeholder"
            }
          },
          'transport_petrol_pumps_01_modal': {
            name: "cta_click_invest",
            props: {
              offer_id: "transport_petrol_pumps_01",
              amount_selected: 100,
              user_id: "user_placeholder"
            }
          },
          'healthcare_hospital_campus_01_modal': {
            name: "cta_click_invest",
            props: {
              offer_id: "healthcare_hospital_campus_01",
              amount_selected: 100,
              user_id: "user_placeholder"
            }
          },
          'education_k12_campus_01_modal': {
            name: "cta_click_invest",
            props: {
              offer_id: "education_k12_campus_01",
              amount_selected: 100,
              user_id: "user_placeholder"
            }
          }
        };

        const eventData = investEvents[modalId];
        if (eventData) {
          console.log(JSON.stringify(eventData));
        }
        // In production, this would trigger the investment flow
        alert('Investment flow would start here in production');
      });
    }
  });

  console.log('All investment modals initialized successfully');
}

// ========== DEMOCRATIZING SECTION STYLES ==========
function initDemocratizingSection() {
  // Add CSS for democratizing section if not already in CSS file
  const style = document.createElement('style');
  style.textContent = `
    .democratizing-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      margin-bottom: 3rem;
    }
    
    .democratizing-card {
      background: rgba(15, 23, 42, 0.7);
      border-radius: 16px;
      padding: 1.5rem;
      border: 1px solid rgba(255,255,255,0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .democratizing-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      border-color: rgba(255,255,255,0.2);
    }
    
    .democratizing-card-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      margin-bottom: 1rem;
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    }
    
    .democratizing-card h4 {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: #fff;
    }
    
    .democratizing-card-subtitle {
      font-size: 0.875rem;
      color: #f59e0b;
      margin-bottom: 1rem;
      font-weight: 600;
    }
    
    .democratizing-card p {
      color: var(--slate-300);
      line-height: 1.6;
    }
    
    @media (max-width: 1024px) {
      .democratizing-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (max-width: 768px) {
      .democratizing-grid {
        grid-template-columns: 1fr;
      }
    }
  `;
  document.head.appendChild(style);
}

// ========== INVESTMENT CARDS FILTER ==========
function initInvestmentFilter() {
  const categoryButtons = document.querySelectorAll('.category-btn');
  const investmentCards = document.querySelectorAll('.investment-card');

  if (categoryButtons.length === 0 || investmentCards.length === 0) {
    console.log('No investment filter elements found');
    return;
  }

  // Add data-tooltip attributes for metric items
  document.querySelectorAll('.metric-item').forEach(item => {
    if (item.querySelector('div:first-child').textContent.trim() === 'ROI') {
      item.setAttribute('data-tooltip', 'Projected total return based on pro forma estimates. Not guaranteed.');
    } else if (item.querySelector('div:first-child').textContent.trim() === 'Tenure') {
      item.setAttribute('data-tooltip', 'Estimated holding period. Liquidity subject to terms.');
    }
  });

  // Category filter functionality
  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      const category = this.getAttribute('data-category');

      // Update active button
      categoryButtons.forEach(btn => {
        if (btn === this) {
          btn.classList.add('active');
          btn.style.background = category === 'all'
              ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
              : 'rgba(255,255,255,0.1)';
          btn.style.color = category === 'all' ? '#0f172a' : '#fff';
          btn.style.border = category === 'all' ? 'none' : '1px solid rgba(255,255,255,0.2)';
        } else {
          btn.classList.remove('active');
          btn.style.background = 'rgba(255,255,255,0.05)';
          btn.style.color = 'var(--slate-300)';
          btn.style.border = '1px solid rgba(255,255,255,0.1)';
        }
      });

      // Filter cards
      investmentCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'block';
          card.style.animation = 'cardFadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Add hover effects for buttons
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    if (!btn.classList.contains('modal-close')) {
      btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        if (this.classList.contains('btn-primary')) {
          this.style.boxShadow = '0 10px 25px rgba(245, 158, 11, 0.3)';
        } else {
          this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
        }
      });

      btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
      });
    }
  });
}

// ========== CORE FUNCTIONS ==========

// Initialize mobile menu based on current page structure
function initMobileMenu() {
  console.log('Initializing mobile menu...');

  const menuBtn = document.getElementById('menuToggle') || document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (!menuBtn || !mobileMenu) {
    console.warn('Mobile menu elements not found');
    return;
  }

  console.log('Found mobile menu elements');

  // Set initial ARIA state
  menuBtn.setAttribute('aria-expanded', 'false');

  // Open menu function
  const openMenu = () => {
    console.log('Opening menu');
    mobileMenu.classList.add('active');
    menuBtn.classList.add('active');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  };

  // Close menu function
  const closeMenu = () => {
    console.log('Closing menu');
    mobileMenu.classList.remove('active');
    menuBtn.classList.remove('active');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  };

  // Toggle menu on button click
  menuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (mobileMenu.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close on close button
  const closeBtn = document.getElementById('mobileClose');
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeMenu();
    });
  }

  // Close on backdrop click
  const backdrop = document.getElementById('mobileBackdrop');
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeMenu();
      }
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMenu();
    }
  });

  // Close menu when clicking on links
  document.querySelectorAll('[data-close], .mobile-nav-link, .mobile-cta').forEach(link => {
    link.addEventListener('click', () => {
      setTimeout(closeMenu, 100);
    });
  });

  console.log('Mobile menu initialized successfully');
}

// ========== VIDEO FIX FOR MOBILE ==========
function fixVideoForMobile() {
  const video = document.getElementById('asrdVideo');
  if (!video) return;

  // Ensure mobile compatibility
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');

  // Try to play with muted audio (required for mobile autoplay)
  const playVideo = () => {
    video.muted = true;
    video.play().catch(err => {
      console.log('Video autoplay prevented:', err.name);
    });
  };

  // Initialize video
  if (video.readyState >= 3) {
    setTimeout(playVideo, 1000);
  } else {
    video.addEventListener('loadeddata', playVideo);
  }

  // Auto-unmute on user interaction
  document.addEventListener('click', function unmuteHandler() {
    if (video.muted) {
      video.muted = false;
    }
    // Remove listener after first interaction
    document.removeEventListener('click', unmuteHandler);
  }, { once: true });
}

// Header scroll effect
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  const handleScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 100);
  };

  window.addEventListener('scroll', debounce(handleScroll, 10));
  handleScroll(); // Initial check
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (!href || href === '#' || href === '#!') return;

      e.preventDefault();

      const targetElement = document.querySelector(href);
      if (!targetElement) return;

      const header = document.getElementById('header');
      const headerHeight = header ? header.offsetHeight : 80;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

// Back to top button
function initBackToTop() {
  const backToTop = document.getElementById('backToTop');
  if (!backToTop) return;

  const toggleButton = () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  };

  window.addEventListener('scroll', debounce(toggleButton, 10));
  toggleButton(); // Initial check

  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Intersection Observer for animations
function initAnimations() {
  const animateElements = document.querySelectorAll('.fade-in-up, .animate-fade-in-up, .animate-fade-in-left, .feature-card, .tokenomics-main');
  if (animateElements.length === 0) return;

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('inview');

        // Special handling for pie chart animations
        if (entry.target.querySelector('.pie-chart-svg')) {
          const circles = entry.target.querySelectorAll('circle[stroke-dasharray]');
          circles.forEach((circle, index) => {
            setTimeout(() => {
              circle.style.animation = 'pieFill 1.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
            }, index * 160);
          });
        }

        // For fade-in animations
        if (entry.target.classList.contains('animate-fade-in-up')) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        } else if (entry.target.classList.contains('animate-fade-in-left')) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }
      }
    });
  }, observerOptions);

  animateElements.forEach(el => observer.observe(el));
}

// ========== PAGE INITIALIZATION ==========

function initializePage() {
  console.log('Initializing ASRD website...');

  // Core functions (run on all pages)
  initMobileMenu();
  initHeaderScroll();
  initSmoothScroll();
  initBackToTop();
  initAnimations();

  // Initialize tabs (for problem section)
  initTabs();

  // Initialize democratizing section
  initDemocratizingSection();

  // Initialize investment modals - FIXED VERSION
  initInvestmentModals();

  // Initialize investment filter
  initInvestmentFilter();

  // Check for index.html features
  const hasDepositSection = document.getElementById('deposit') !== null;
  const hasCopyButton = document.getElementById('copyBtn') !== null;
  const hasFloatingDeposit = document.getElementById('floatingDeposit') !== null;
  const hasStakeSection = document.getElementById('stake') !== null;

  if (hasDepositSection || hasCopyButton || hasFloatingDeposit || hasStakeSection) {
    console.log('Detected index.html features - initializing index-specific features');
    fixVideoForMobile();
    initCopyToClipboard();
    initFloatingDeposit();
    initParticles();
    initViewOnExplorer();
    initSimpleVideo();

    // Add staking features
    if (hasStakeSection) {
      initStakeCopyToClipboard();
      initFloatingStake();
      initStakeViewOnExplorer();
    }
  }
}

// ========== EVENT LISTENERS ==========

// Run when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializePage);

// Run when page is fully loaded (including images)
window.addEventListener('load', () => {
  // Additional initialization that requires everything to be loaded
  const header = document.getElementById('header');
  if (header && window.scrollY > 100) {
    header.classList.add('scrolled');
  }

  // Re-initialize particles on load (for index.html)
  if (document.getElementById('particles')) {
    setTimeout(initParticles, 500);
  }
});

// Handle browser back/forward navigation
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    initializePage();
  }
});

// ========== ERROR HANDLING ==========

// Global error handler
window.addEventListener('error', function(e) {
  console.error('JavaScript Error:', e.message, 'at', e.filename, ':', e.lineno);
});

// Log when script loads
console.log('ASRD main.js loaded successfully');

// ========== MISSING FUNCTION PLACEHOLDERS ==========
// These functions are referenced but not defined in the provided code
// Adding placeholder implementations to prevent errors

function initCopyToClipboard() {
  console.log('initCopyToClipboard called - placeholder');
}

function initFloatingDeposit() {
  console.log('initFloatingDeposit called - placeholder');
}

function initParticles() {
  console.log('initParticles called - placeholder');
}

function initViewOnExplorer() {
  console.log('initViewOnExplorer called - placeholder');
}

function initSimpleVideo() {
  console.log('initSimpleVideo called - placeholder');
}

function initStakeCopyToClipboard() {
  console.log('initStakeCopyToClipboard called - placeholder');
}

function initFloatingStake() {
  console.log('initFloatingStake called - placeholder');
}

function initStakeViewOnExplorer() {
  console.log('initStakeViewOnExplorer called - placeholder');
}
