// main.js - All JavaScript for ASRD website

// ========== COMMON FUNCTIONS ==========

// Mobile menu functionality
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  const mobileBackdrop = document.getElementById('mobileBackdrop');
  
  if (!mobileMenuBtn || !mobileMenu) return;
  
  function openMenu() {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  function closeMenu() {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  mobileMenuBtn.addEventListener('click', openMenu);
  
  if (mobileClose) {
    mobileClose.addEventListener('click', closeMenu);
  }
  
  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMenu);
  }
  
  // Close menu when clicking on links
  document.querySelectorAll('.mobile-nav-link, .mobile-cta').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  
  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMenu();
    }
  });
}

// Header scroll effect
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;
  
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 100);
  });
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const header = document.getElementById('header');
        const headerHeight = header ? header.offsetHeight : 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Back to top button
function initBackToTop() {
  const backToTop = document.getElementById('backToTop');
  if (!backToTop) return;
  
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  });
  
  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Floating navigation highlighting (for whitepaper)
function initFloatingNav() {
  const floatingNavItems = document.querySelectorAll('.floating-nav-item');
  if (floatingNavItems.length === 0) return;
  
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });
    
    floatingNavItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href').substring(1) === currentSection) {
        item.classList.add('active');
      }
    });
  });
}

// Intersection Observer for animations
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
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

  document.querySelectorAll('.animate-fade-in-up, .animate-fade-in-left').forEach(el => {
    observer.observe(el);
  });
}

// ========== INDEX.HTML SPECIFIC FUNCTIONS ==========

// Copy to clipboard functionality
function initCopyToClipboard() {
  const copyBtn = document.getElementById('copyBtn');
  const depositAddressEl = document.getElementById('depositAddress');
  const copyToast = document.getElementById('copyToast');
  
  if (!copyBtn || !depositAddressEl) return;
  
  const address = depositAddressEl.textContent.trim();
  
  function showToast(message = 'Copied') {
    if (!copyToast) return;
    copyToast.textContent = message;
    copyToast.classList.add('show');
    setTimeout(() => copyToast.classList.remove('show'), 1600);
  }
  
  async function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
    
    // Fallback for older browsers
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch (e) {
      console.error('Fallback copy failed:', e);
      return false;
    }
  }
  
  copyBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const originalText = copyBtn.innerHTML;
    
    const ok = await copyToClipboard(address);
    if (ok) {
      showToast('Copied');
      copyBtn.innerHTML = 'Copied!';
      copyBtn.classList.add('copied');
      
      setTimeout(() => {
        copyBtn.innerHTML = originalText;
        copyBtn.classList.remove('copied');
      }, 1500);
    } else {
      showToast('Copy failed');
    }
  });
}

// Floating deposit button
function initFloatingDeposit() {
  const floatingDeposit = document.getElementById('floatingDeposit');
  if (!floatingDeposit) return;
  
  floatingDeposit.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector('#deposit');
    if (!target) return;
    
    const header = document.getElementById('header');
    const headerHeight = header ? header.offsetHeight : 80;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
}

// Particles effect
function initParticles() {
  const particles = document.getElementById('particles');
  if (!particles) return;
  
  function createParticles() {
    particles.innerHTML = '';
    const particleCount = window.innerWidth < 768 ? 25 : 50;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 20 + 's';
      particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
      particles.appendChild(particle);
    }
  }
  
  createParticles();
  window.addEventListener('resize', createParticles);
}

// View on explorer
function initViewOnExplorer() {
  const viewExplorer = document.getElementById('viewOnExplorer');
  const depositAddressEl = document.getElementById('depositAddress');
  
  if (!viewExplorer || !depositAddressEl) return;
  
  const address = depositAddressEl.textContent.trim();
  
  viewExplorer.addEventListener('click', (e) => {
    e.preventDefault();
    const explorerUrl = 'https://bscscan.com/address/' + encodeURIComponent(address);
    window.open(explorerUrl, '_blank', 'noopener');
  });
}

// ========== INITIALIZATION ==========

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Common initializations
  initMobileMenu();
  initHeaderScroll();
  initSmoothScroll();
  initBackToTop();
  initFloatingNav();
  initAnimations();
  
  // Check if we're on index.html
  if (document.getElementById('menuToggle')) {
    // Index.html specific initializations
    initCopyToClipboard();
    initFloatingDeposit();
    initParticles();
    initViewOnExplorer();
  }
  
  // Check if we're on whitepaper.html
  if (document.getElementById('mobileMenuBtn')) {
    // Whitepaper specific initializations
    initFloatingNav();
  }
  
  // Initialize elements already in view
  const animateElements = document.querySelectorAll('.animate-fade-in-up, .animate-fade-in-left');
  animateElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      if (el.classList.contains('animate-fade-in-up')) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      } else if (el.classList.contains('animate-fade-in-left')) {
        el.style.opacity = '1';
        el.style.transform = 'translateX(0)';
      }
    }
  });
  
  // Set initial header state
  const header = document.getElementById('header');
  if (header && window.scrollY > 100) {
    header.classList.add('scrolled');
  }
});

// Prevent horizontal scroll on mobile
window.addEventListener('load', function() {
  if (window.innerWidth <= 768) {
    document.body.style.overflowX = 'hidden';
  }
});
