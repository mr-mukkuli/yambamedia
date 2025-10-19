document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM loaded - starting script');

  // Basic elements
  const navbar = document.getElementById('navbar');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const openModalBtn = document.getElementById('open-calculator-modal');
  const pricingModal = document.getElementById('pricing-modal');
  const closeModalBtn = document.getElementById('close-modal');

  // Set current year
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // 1. NAVBAR SCROLL
  if (navbar) {
    console.log('Navbar found, setting up scroll');
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // Update active nav link based on scroll position
      updateActiveNavLink();
    });

    // Force check on load
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    }
  }

  // 2. HERO BUTTONS
  console.log('Setting up hero buttons');
  const heroButtons = document.querySelectorAll('.hero-buttons button');
  heroButtons.forEach(button => {
    button.addEventListener('click', function () {
      const sectionId = this.getAttribute('data-section');
      console.log('Hero button clicked:', sectionId);

      if (sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // 3. MODAL FUNCTIONALITY
  if (openModalBtn && pricingModal) {
    console.log('Setting up modal');
    openModalBtn.addEventListener('click', function (e) {
      e.preventDefault();
      console.log('Opening modal');
      pricingModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeModalBtn && pricingModal) {
    closeModalBtn.addEventListener('click', function (e) {
      e.preventDefault();
      pricingModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  // Close modal when clicking outside
  if (pricingModal) {
    pricingModal.addEventListener('click', function (e) {
      if (e.target === pricingModal) {
        pricingModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // 4. MOBILE MENU
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', function () {
      mobileMenu.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
    });
  }

  // 5. NAVIGATION LINKS (only target links with data-section attribute)
  const navLinks = document.querySelectorAll('.nav-link[data-section], .mobile-nav-link[data-section]');
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const sectionId = this.getAttribute('data-section');
      if (sectionId) {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          // Close mobile menu if open
          if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
          }
        }
      }
    });
  });

  // 6. LOGO BUTTON - handle both anchor and button elements
  const logoButton = document.getElementById('logo-button');
  if (logoButton) {
    logoButton.addEventListener('click', function (e) {
      // Only prevent default and scroll if we're on the same page
      const href = logoButton.getAttribute('href');
      if (href === 'index.html' || href === '#home' || href === '#') {
        e.preventDefault();
        const homeElement = document.getElementById('home');
        if (homeElement) {
          homeElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    });
  }

  // 7. PRICING PLAN BUTTONS
  initPricingPlanButtons();

  // 8. PRICING CALCULATOR FUNCTIONALITY
  initPricingCalculator();

  // 9. FORM SUCCESS HANDLER
  initFormHandler();

  // 10. VIDEO CONTROLS
  initVideoControls();

  // 11. BLOG POST MODALS
  initBlogModals();

  console.log('All event listeners set up');
});

// PRICING PLAN BUTTONS
function initPricingPlanButtons() {
  const pricingPlanButtons = document.querySelectorAll('.pricing-plan-btn');
  
  pricingPlanButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const plan = this.getAttribute('data-plan');
      const price = this.getAttribute('data-price');
      
      if (plan && price) {
        // Populate the message field with the selected plan
        const messageField = document.getElementById('message');
        const serviceField = document.getElementById('service');
        
        if (messageField) {
          messageField.value = `I'm interested in the ${plan} plan (${price}).\n\nAdditional details:\n`;
        }
        
        // Set the service dropdown to social media
        if (serviceField) {
          serviceField.value = 'social-media';
        }
        
        // Scroll to contact section (handled by existing data-section logic)
        // Focus on message field after scroll
        setTimeout(() => {
          if (messageField) {
            messageField.focus();
            messageField.setSelectionRange(messageField.value.length, messageField.value.length);
          }
        }, 800);
      }
    });
  });
}

// PRICING CALCULATOR
function initPricingCalculator() {
  const checkboxes = document.querySelectorAll('.service-checkbox');
  const selectedServices = document.getElementById('selected-services');
  const totalPrice = document.getElementById('total-price');
  const getQuoteBtn = document.getElementById('get-quote-btn');
  const selectedServicesData = document.getElementById('selected-services-data');
  const totalPriceData = document.getElementById('total-price-data');
  const pricingModal = document.getElementById('pricing-modal');

  if (!checkboxes.length) return;

  function updateCalculator() {
    let total = 0;
    let selected = [];

    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        const price = parseInt(checkbox.dataset.price);
        const service = checkbox.dataset.service;
        total += price;
        selected.push(service);
      }
    });

    // Update display
    if (selected.length > 0) {
      selectedServices.innerHTML = selected.map(service => {
        const checkbox = Array.from(checkboxes).find(cb => cb.dataset.service === service);
        const priceText = checkbox ? checkbox.closest('.service-option').querySelector('.service-option-price').textContent : 'K 0';
        return `<div class="selected-service-item">
          <span class="selected-service-name">${service}</span>
          <span class="selected-service-price">${priceText}</span>
        </div>`;
      }).join('');
    } else {
      selectedServices.innerHTML = '<p class="no-selection">No services selected yet</p>';
    }

    totalPrice.textContent = `K ${total.toLocaleString()}`;
    getQuoteBtn.disabled = selected.length === 0;

    // Update hidden form fields if they exist
    if (selectedServicesData) selectedServicesData.value = selected.join(', ');
    if (totalPriceData) totalPriceData.value = `K ${total.toLocaleString()}`;
  }

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateCalculator);
  });

  // Form submission handler
  if (getQuoteBtn) {
    getQuoteBtn.addEventListener('click', function () {
      // Collect selected services and total for the contact form
      let selected = [];
      let total = 0;
      
      checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
          const price = parseInt(checkbox.dataset.price);
          const service = checkbox.dataset.service;
          total += price;
          selected.push(service);
        }
      });

      // Populate the contact form message field with selected services
      const messageField = document.getElementById('message');
      if (messageField && selected.length > 0) {
        const servicesText = selected.join('\n- ');
        messageField.value = `I'm interested in the following services:\n\n- ${servicesText}\n\nEstimated Total: K ${total.toLocaleString()}\n\nAdditional details:\n`;
        
        // Focus on the message field so user can see the pre-filled content
        setTimeout(() => {
          messageField.focus();
          // Move cursor to end of text
          messageField.setSelectionRange(messageField.value.length, messageField.value.length);
        }, 500);
      }

      // Close modal
      if (pricingModal) {
        pricingModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }

      // Scroll to contact form
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }
}

// FORM SUCCESS HANDLER
function initFormHandler() {
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', function (e) {
      setTimeout(() => {
        formSuccess.style.display = 'flex';
        contactForm.reset();

        setTimeout(() => {
          formSuccess.style.display = 'none';
        }, 5000);
      }, 1000);
    });
  }
}

// VIDEO CONTROLS
function initVideoControls() {
  // Video controls are handled by inline onclick="toggleMute(this)" for simplicity
  // No additional event listeners needed
}

// BLOG POST MODALS
function initBlogModals() {
  const blogModal = document.getElementById('blog-modal');
  if (!blogModal) return;

  const modalTitle = blogModal.querySelector('.blog-modal-title');
  const modalDate = blogModal.querySelector('.blog-modal-date');
  const modalContent = blogModal.querySelector('.blog-modal-content');
  const closeBtn = blogModal.querySelector('.blog-modal-close');

  // Blog post data
  const blogPosts = {
    'elections-2026': {
      title: '2026 elections are here.',
      date: 'December 10, 2024',
      content: `
        <p>The not so interesting, but very interesting question on everyone's mind. Guys, who are we voting for next year ai?</p>
        <p>As we approach the 2026 elections, it's crucial for every citizen to stay informed and engaged in the political process. This election will shape the future of our nation for years to come.</p>
        <p>At Yamba Media, we believe in the power of informed decision-making. We encourage everyone to research the candidates, understand their platforms, and make your voice heard at the polls.</p>
        <p>Remember, democracy thrives when citizens participate. Let's make 2026 a year of positive change and collective action.</p>
      `
    },
    'mukazi-samba': {
      title: '"Guys Mukazi Samba"',
      date: 'October 7, 2024',
      content: `
        <p>October heat in the land of work and joy. (Blog post sponsored by Mbozi scents, smellz like heaven.)</p>
        <p>October has arrived with its signature warmth, bringing with it a renewed energy to our creative endeavors. At Yamba Media, we're embracing the heat with fresh ideas and innovative projects.</p>
        <p>This month, we're focusing on celebrating the spirit of hard work and the joy that comes from creating meaningful content. Whether it's a new brand identity, a compelling video, or a stunning photograph, we're here to help you tell your story.</p>
        <p>And yes, we're keeping things fresh with Mbozi scents – because even in the October heat, we believe in making everything smell like heaven!</p>
      `
    },
    'kasamba-vs-doritos': {
      title: 'A Tale As Old As Time',
      date: 'December 25, 2025',
      content: `
        <p>The story of how a young's life was changed forever by an edible triangle on a fateful trip to Shoprite. Yamba Media presents: Kasamba vs Doritos</p>
        <p>It all started on a regular Saturday afternoon. The fluorescent lights of Shoprite illuminated the snack aisle like a beacon of destiny. There, among the familiar packages, stood two warriors of crunch – the local champion Kasamba and the international sensation Doritos.</p>
        <p>The decision seemed simple, but it represented so much more: tradition versus innovation, local versus global, the familiar comfort of home versus the allure of something new.</p>
        <p>In the end, the choice was both – because at Yamba Media, we believe in celebrating diversity, honoring our roots while embracing new experiences. After all, why choose when you can enjoy the best of both worlds?</p>
        <p>This holiday season, we're reminded that the best stories come from the simplest moments. Here's to edible triangles and the memories they create!</p>
      `
    }
  };

  // Add click handlers to all blog post links
  document.querySelectorAll('.blog-card a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Determine which post to show based on card position
      const card = this.closest('.blog-card');
      const allCards = Array.from(document.querySelectorAll('.blog-card'));
      const index = allCards.indexOf(card);
      
      // Map card index to post ID (repeating pattern)
      const postIds = ['elections-2026', 'mukazi-samba', 'kasamba-vs-doritos'];
      const postId = postIds[index % 3];
      const post = blogPosts[postId];
      
      if (post) {
        modalTitle.textContent = post.title;
        modalDate.textContent = post.date;
        modalContent.innerHTML = post.content;
        blogModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close modal handlers
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      blogModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  // Close on outside click
  blogModal.addEventListener('click', function(e) {
    if (e.target === blogModal) {
      blogModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  // Close on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && blogModal.classList.contains('active')) {
      blogModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

// ACTIVE NAV LINK UPDATER
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[data-section], .mobile-nav-link[data-section]');

  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === currentSection) {
      link.classList.add('active');
    }
  });
}

// Video toggle function for inline onclick handlers
function toggleMute(button) {
  const videoContainer = button.closest('.project-video-container');
  if (!videoContainer) return;
  
  const video = videoContainer.querySelector('video');
  const icon = button.querySelector('i');

  if (video && icon) {
    // Toggle mute state
    video.muted = !video.muted;

    // Update icon and button styling based on mute state
    if (video.muted) {
      icon.className = 'fas fa-volume-mute';
      button.style.background = 'rgba(0, 0, 0, 0.7)';
    } else {
      icon.className = 'fas fa-volume-up';
      button.style.background = 'rgba(0, 200, 150, 0.8)';
    }
  }
}
