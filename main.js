/* ================================================
   CodeVibeX â€” Main JavaScript
   Scroll Reveal | Typewriter | Mobile Nav
   Page Transitions (Minsky â€” content fade/slide)
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ================================================
     AUTO-SELECT SERVICE (URL OR BUTTON CLICK)
     ================================================ */
  const urlParams = new URLSearchParams(window.location.search);
  const requestedService = urlParams.get('service');
  if (requestedService) {
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
      const optionToSelect = Array.from(serviceSelect.options).find(opt => opt.value === requestedService);
      if (optionToSelect) {
        optionToSelect.selected = true;
      }
    }
  }

  // Handle on-page "Get a Quote" buttons
  document.querySelectorAll('.get-quote-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service');
      const select = document.getElementById('service');
      if (select && service) {
        const option = Array.from(select.options).find(opt => opt.value === service);
        if (option) option.selected = true;
      }
      
      const formSection = document.getElementById('contact-form');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth' });
        // Optional: slight focus indication
        setTimeout(() => select.focus(), 600);
      }
    });
  });
/* ================================================
     SMOOTH SCROLLING (Lenis) - Minsky Style
     ================================================ */
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      autoRaf: true, // Use built-in RAF loop
      lerp: 0.08, // Minsky style buttery smooth scroll
      wheelMultiplier: 1,
      smoothWheel: true,
      smoothTouch: false, // keep native touch scroll
    });
  }

  /* ================================================
     PAGE TRANSITION â€” Minsky style
     Enter: main content fades + slides up
     Exit:  main content lifts + fades, then navigate
     ================================================ */
  const pageMain = document.querySelector('.page-enter');

  /* Entrance */
  if (pageMain) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        pageMain.classList.add('page-entered');
      });
    });
  }

  /* Exit */
  function navigateTo(href) {
    if (pageMain) {
      pageMain.classList.add('page-exiting');
    }
    setTimeout(() => {
      window.location.href = href;
    }, 300);
  }

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (
      href &&
      !href.startsWith('#') &&
      !href.startsWith('mailto:') &&
      !href.startsWith('tel:') &&
      !href.startsWith('http') &&
      !href.startsWith('//') &&
      href.split('?')[0].endsWith('.html')
    ) {
      link.addEventListener('click', e => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        navigateTo(href);
      });
    }
  });

  /* ================================================
     SCROLL REVEAL
     ================================================ */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    revealEls.forEach(el => obs.observe(el));
  }

  /* ================================================
     TYPEWRITER EFFECT
     ================================================ */
  const typewriterEl = document.getElementById('typewriter-text');
  if (typewriterEl) {
    const words = [
      'Landing Pages.',
      'Admin Consoles.',
      'Web Applications.',
      'Custom CRMs.',
      'Integrations.',
    ];
    let wordIndex = 0, charIndex = 0, isDeleting = false;

    function type() {
      const word = words[wordIndex];
      if (isDeleting) {
        typewriterEl.textContent = word.slice(0, --charIndex);
        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(type, 400);
          return;
        }
        setTimeout(type, 50);
      } else {
        typewriterEl.textContent = word.slice(0, ++charIndex);
        if (charIndex === word.length) {
          isDeleting = true;
          setTimeout(type, 2200);
          return;
        }
        setTimeout(type, 90);
      }
    }
    setTimeout(type, 1200);
  }

  /* ================================================
     MOBILE NAV
     ================================================ */
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      const open  = navLinks.classList.contains('open');
      spans[0].style.transform = open ? 'rotate(45deg) translate(5px, 5px)' : '';
      spans[1].style.opacity   = open ? '0' : '';
      spans[2].style.transform = open ? 'rotate(-45deg) translate(5px, -5px)' : '';
    });
    navLinks.querySelectorAll('.nav-link').forEach(l => {
      l.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(s => {
          s.style.transform = '';
          s.style.opacity   = '';
        });
      });
    });
  }

  /* ================================================
     HEADER SCROLL SHADOW
     ================================================ */
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.borderBottomColor = window.scrollY > 20
        ? 'rgba(0, 87, 255, 0.18)'
        : 'rgba(255,255,255,0.05)';
    }, { passive: true });
  }

});

