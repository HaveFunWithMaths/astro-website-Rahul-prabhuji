/**
 * Main Application Orchestrator
 * My Astro Academy SPA
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const isOpen = mobileDrawer.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile drawer when clicking any link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // 3. ScrollSpy & Navigation Active State
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollY = window.pageYOffset + 200;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  // 4. Smooth Anchor Link Handler
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 5. Expandable Story Modal / Full Story Toggle
  const toggleStoryBtn = document.getElementById('toggle-full-story-btn');
  const fullStoryContainer = document.getElementById('full-story-container');

  if (toggleStoryBtn && fullStoryContainer) {
    toggleStoryBtn.addEventListener('click', () => {
      const isHidden = fullStoryContainer.style.display === 'none' || fullStoryContainer.style.display === '';
      if (isHidden) {
        fullStoryContainer.style.display = 'block';
        toggleStoryBtn.innerText = 'Hide Complete Narrative ▲';
        fullStoryContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        fullStoryContainer.style.display = 'none';
        toggleStoryBtn.innerText = 'Read Complete Founder Journey (From Source) ▼';
      }
    });
  }
});
