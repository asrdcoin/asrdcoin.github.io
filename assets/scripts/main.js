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

// ========== VIDEO CONTROLS ==========

function initVideoControls() {
  const video = document.querySelector('.hero-video');
  const videoControlBtn = document.getElementById('videoControl');
  
  if (!video || !videoControlBtn) return;
  
  // Check if video can autoplay
  const canAutoplay = video.autoplay && video.muted;
  
  // Update button based on initial state
  updateVideoControlButton(video.paused);
  
  // Toggle play/pause on button click
  videoControlBtn.addEventListener('click', () => {
    if (video.paused) {
      video.play().catch(e => {
        console.log('Video play failed:', e);
        // Fallback: show play button
        videoControlBtn.innerHTML = '<i class="fas fa-play"></i>';
      });
    } else {
      video.pause();
    }
    updateVideoControlButton(video.paused);
  });
  
  // Update button when video state changes
  video.addEventListener('play', () => updateVideoControlButton(false));
  video.addEventListener('pause', () => updateVideoControlButton(true));
  
  // Handle video loading errors
  video.addEventListener('error', (e) => {
    console.error('Video error:', e);
    videoControlBtn.style.display = 'none';
    
    // Fallback to static background
    document.querySelector('.hero-video-section').style.background = 
      'linear-gradient(135deg, var(--slate-900) 0%, var(--slate-800) 100%)';
  });
  
  // Optimize for mobile data saving
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  if (isMobile && video) {
    // Set video to lower quality on mobile to save data
    video.preload = 'metadata';
  }
  
  // Pause video when not in viewport for performance
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting && !video.paused) {
        video.pause();
        updateVideoControlButton(true);
      }
    });
  }, { threshold: 0.1 });
  
  observer.observe(video);
}

function updateVideoControlButton(isPaused) {
  const videoControlBtn = document.getElementById('videoControl');
  if (!videoControlBtn) return;
  
  if (isPaused) {
    videoControlBtn.innerHTML = '<i class="fas fa-play"></i>';
    videoControlBtn.setAttribute('aria-label', 'Play video');
    videoControlBtn.setAttribute('title', 'Play video');
  } else {
    videoControlBtn.innerHTML = '<i class="fas fa-pause"></i>';
    videoControlBtn.setAttribute('aria-label', 'Pause video');
    videoControlBtn.setAttribute('title', 'Pause video');
  }
}

// ========== CORE FUNCTIONS ==========

// Initialize mobile menu based on current page structure
function initMobileMenu() {
  // Check which page we're on by looking for specific elements
  const isIndexPage = document.getElementById('menuToggle') !== null;
  const isWhitepaperPage = document.getElementById('mobileMenuBtn') !== null;
  
  let menuBtn, mobileMenu, mobileBackdrop, mobilePanel, mobileClose;
  
  if (isIndexPage) {
    // Index.html mobile menu structure
    menuBtn = document.getElementById('menuToggle');
    mobileMenu = document.getElementById('mobileMenu');
    mobileBackdrop = document.getElementById('mobileBackdrop');
    mobilePanel = document.getElementById('mobilePanel');
    mobileClose = document.getElementById('mobileClose');
  } else if (isWhitepaperPage) {
    // Whitepaper.html mobile menu structure
    menuBtn = document.getElementById('mobileMenuBtn');
    mobileMenu = document.getElementById('mobileMenu');
    mobileBackdrop = document.getElementById('mobileBackdrop');
    mobilePanel = document.getElementById('mobilePanel');
    mobileClose = document.getElementById('mobileClose');
  } else {
    return; // No mobile menu on this page
  }
  
  if (!menuBtn || !mobileMenu) return;
  
  function openMenu() {
    mobileMenu.classList.add('open');
    mobileBackdrop?.classList.add('open');
    mobilePanel?.classList.add('open');
    menuBtn.classList.add('active');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  
  function closeMenu() {
    mobileMenu.classList.remove('open');
    mobileBackdrop?.classList.remove('open');
    mobilePanel?.classList.remove('open');
    menuBtn.classList.remove('active');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  
  // Open/close menu on button click
  menuBtn.addEventListener('click', () => {
    if (mobileMenu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });
  
  // Close menu on close button click
  if (mobileClose) {
    mobileClose.addEventListener('click', closeMenu);
  }
  
  // Close menu on backdrop click
  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMenu);
  }
  
  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
    }
  });
  
  // Close menu when clicking on mobile links (index.html specific)
  if (isIndexPage) {
    document.querySelectorAll('[data-close]').forEach(link => {
      link.addEventListener('click', () => {
        setTimeout(closeMenu, 100);
      });
    });
  }
  
  // Close menu when clicking on mobile links (whitepaper.html specific)
  if (isWhitepaperPage) {
    document.querySelectorAll('.mobile-nav-link, .mobile-cta').forEach(link => {
      link.addEventListener('click', () => {
        setTimeout(closeMenu, 100);
      });
    });
  }
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

// Floating navigation for whitepaper
function initFloatingNav() {
  const floatingNavItems = document.querySelectorAll('.floating-nav-item');
  if (floatingNavItems.length === 0) return;
  
  const updateActiveNav = () => {
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
  };
  
  window.addEventListener('scroll', debounce(updateActiveNav, 50));
  updateActiveNav(); // Initial check
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
    const originalHTML = copyBtn.innerHTML;
    
    copyBtn.disabled = true;
    copyBtn.classList.add('copied');
    copyBtn.innerHTML = 'Copied!';
    
    const ok = await copyToClipboard(address);
    if (ok) {
      showToast('Copied');
    } else {
      showToast('Copy failed — select & copy');
      try {
        const range = document.createRange();
        range.selectNodeContents(depositAddressEl);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      } catch (err) {}
    }
    
    setTimeout(() => {
      copyBtn.disabled = false;
      copyBtn.classList.remove('copied');
      copyBtn.innerHTML = originalHTML;
    }, 1500);
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
  window.addEventListener('resize', debounce(createParticles, 250));
}

// View on explorer button
function initViewOnExplorer() {
  const viewExplorer = document.getElementById('viewOnExplorer');
  const depositAddressEl = document.getElementById('depositAddress');
  
  if (!viewExplorer || !depositAddressEl) return;
  
  const address = depositAddressEl.textContent.trim();
  
  viewExplorer.addEventListener('click', (e) => {
    e.preventDefault();
    const explorerUrl = 'https://bscscan.com/address/' + encodeURIComponent(address);
    window.open(explorerUrl, '_blank', 'noopener,noreferrer');
  });
}

// ========== PAGE INITIALIZATION ==========

// Initialize all functions for current page
function initializePage() {
  console.log('Initializing ASRD website...');
  
  // Core functions (run on all pages)
  initMobileMenu();
  initHeaderScroll();
  initSmoothScroll();
  initBackToTop();
  initAnimations();
  
  // Check which page we're on
  const isIndexPage = document.getElementById('menuToggle') !== null;
  const isWhitepaperPage = document.getElementById('mobileMenuBtn') !== null;
  
  // Page-specific functions
  if (isIndexPage) {
    console.log('Detected index.html - initializing index-specific features');
    initVideoControls();
    initCopyToClipboard();
    initFloatingDeposit();
    initParticles();
    initViewOnExplorer();
    initFloatingNav(); // Also needed for index if it has floating nav
  }
  
  if (isWhitepaperPage) {
    console.log('Detected whitepaper.html - initializing whitepaper-specific features');
    initFloatingNav();
  }
  
  // Initialize elements already in view
  const animateElements = document.querySelectorAll('.fade-in-up, .animate-fade-in-up, .animate-fade-in-left');
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
  
  // Prevent horizontal scroll on mobile
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
      document.body.style.overflowX = 'hidden';
    } else {
      document.body.style.overflowX = '';
    }
  });
  
  // Initial check for mobile overflow
  if (window.innerWidth <= 768) {
    document.body.style.overflowX = 'hidden';
  }
  
  console.log('ASRD website initialization complete');
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
  
  // Try to play video if it didn't autoplay
  const video = document.querySelector('.hero-video');
  if (video && video.paused) {
    video.play().catch(e => {
      console.log('Auto-play prevented:', e);
      // Show play button more prominently
      const videoControlBtn = document.getElementById('videoControl');
      if (videoControlBtn) {
        videoControlBtn.style.opacity = '1';
        videoControlBtn.style.transform = 'scale(1.2)';
      }
    });
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
