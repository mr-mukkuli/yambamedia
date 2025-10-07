document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.getElementById('navbar');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const logoButton = document.getElementById('logo-button');
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const currentYearSpan = document.getElementById('current-year');

  // Modal Elements
  const pricingModal = document.getElementById('pricing-modal');
  const openModalBtn = document.getElementById('open-calculator-modal');
  const closeModalBtn = document.getElementById('close-modal');

  // Pricing Calculator Elements
  const selectedServicesDiv = document.getElementById('selected-services');
  const totalPriceElement = document.getElementById('total-price');
  const getQuoteBtn = document.getElementById('get-quote-btn');
  const serviceCheckboxes = document.querySelectorAll('.service-checkbox');

  // Pricing Calculator Variables
  let selectedServices = [];
  let totalPrice = 0;

  currentYearSpan.textContent = new Date().getFullYear();

  function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    updateActiveSection();
  });

  function updateActiveSection() {
    const sections = ['home', 'services', 'pricing', 'about', 'team', 'projects', 'contact'];
    const scrollPosition = window.scrollY + 100;

    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          navLinks.forEach(link => {
            if (link.getAttribute('data-section') === sectionId) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
          mobileNavLinks.forEach(link => {
            if (link.getAttribute('data-section') === sectionId) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      }
    });
  }

  mobileMenuToggle.addEventListener('click', function () {
    mobileMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
  });

  logoButton.addEventListener('click', function () {
    scrollToSection('home');
    mobileMenu.classList.remove('active');
    mobileMenuToggle.classList.remove('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      const sectionId = this.getAttribute('data-section');
      scrollToSection(sectionId);
    });
  });

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function () {
      const sectionId = this.getAttribute('data-section');
      scrollToSection(sectionId);
      mobileMenu.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
    });
  });

  const allButtons = document.querySelectorAll('button[data-section]');
  allButtons.forEach(button => {
    if (!button.classList.contains('nav-link') &&
      !button.classList.contains('mobile-nav-link') &&
      button.id !== 'logo-button') {
      button.addEventListener('click', function () {
        const sectionId = this.getAttribute('data-section');
        scrollToSection(sectionId);
      });
    }
  });

  // Modal Event Listeners
  if (openModalBtn && pricingModal) {
    openModalBtn.addEventListener('click', function () {
      pricingModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeModalBtn && pricingModal) {
    closeModalBtn.addEventListener('click', function () {
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
  "Estimated Total"
  // Close modal with Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && pricingModal && pricingModal.classList.contains('active')) {
      pricingModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          contactForm.style.display = 'none';
          formSuccess.style.display = 'flex';

          setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'flex';
            formSuccess.style.display = 'none';
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;

            if (selectedServices.length > 0) {
              selectedServices = [];
              serviceCheckboxes.forEach(checkbox => checkbox.checked = false);
              updatePricingSummary();
            }
          }, 5000);
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        alert('There was an error sending your message. Please try again or contact us directly.');
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
      }
    });
  }

  // Pricing Calculator Functionality
  if (serviceCheckboxes.length > 0) {
    // Handle service selection
    serviceCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function () {
        const serviceName = this.getAttribute('data-service');
        const servicePrice = parseInt(this.getAttribute('data-price'));

        if (this.checked) {
          selectedServices.push({
            id: this.id,
            name: serviceName,
            price: servicePrice
          });
        } else {
          selectedServices = selectedServices.filter(service => service.id !== this.id);
        }

        updatePricingSummary();
      });
    });

    // Update pricing summary
    function updatePricingSummary() {
      totalPrice = selectedServices.reduce((sum, service) => sum + service.price, 0);

      if (selectedServices.length > 0) {
        selectedServicesDiv.innerHTML = selectedServices.map(service => `
          <div class="selected-service-item">
            <span class="selected-service-name">${service.name}</span>
            <span class="selected-service-price">K ${service.price.toLocaleString()}</span>
          </div>
        `).join('');

        totalPriceElement.textContent = `K ${totalPrice.toLocaleString()}`;
        getQuoteBtn.disabled = false;
      } else {
        selectedServicesDiv.innerHTML = '<p class="no-selection">No services selected yet</p>';
        totalPriceElement.textContent = 'K 0';
        getQuoteBtn.disabled = true;
      }

      updateHiddenFormFields();
    }

    // Update hidden form fields with pricing data
    function updateHiddenFormFields() {
      const servicesDataField = document.getElementById('selected-services-data');
      const totalPriceDataField = document.getElementById('total-price-data');

      if (servicesDataField && totalPriceDataField) {
        const servicesList = selectedServices.map(service =>
          `${service.name}`
        ).join(', ');

        servicesDataField.value = servicesList || 'None';
        totalPriceDataField.value = ``;
      }
    }


    if (getQuoteBtn) {
      getQuoteBtn.addEventListener('click', function () {
        // Just service names, no prices
        const servicesList = selectedServices.map(service =>
          `${service.name}`
        ).join('\n• ');

        const message = `I'm interested in hiring your team for the following services:\n\n• ${servicesList}\n\nPlease let me know what the next steps are.`;

        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
          const messageField = document.getElementById('message');
          if (messageField) {
            messageField.value = message;
          }

          updateHiddenFormFields();

          // Close modal if open
          if (pricingModal && pricingModal.classList.contains('active')) {
            pricingModal.classList.remove('active');
            document.body.style.overflow = 'auto';
          }

          scrollToSection('contact');
          showNotification('Services added to estimate! Fill out your details below.');
        }
      });
    }
  }

  // Helper function to show notifications
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: var(--primary);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      z-index: 1000;
      animation: slideInRight 0.3s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      max-width: 300px;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  // Add CSS for notification animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  updateActiveSection();
});
