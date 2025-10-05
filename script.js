document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.getElementById('navbar');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const logoButton = document.getElementById('logo-button');
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const currentYearSpan = document.getElementById('current-year');

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

  window.addEventListener('scroll', function() {
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

  mobileMenuToggle.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
  });

  logoButton.addEventListener('click', function() {
    scrollToSection('home');
    mobileMenu.classList.remove('active');
    mobileMenuToggle.classList.remove('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      const sectionId = this.getAttribute('data-section');
      scrollToSection(sectionId);
    });
  });

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
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
      button.addEventListener('click', function() {
        const sectionId = this.getAttribute('data-section');
        scrollToSection(sectionId);
      });
    }
  });

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
      };

      console.log('Form submitted:', formData);

      contactForm.style.display = 'none';
      formSuccess.style.display = 'flex';

      setTimeout(() => {
        contactForm.reset();
        contactForm.style.display = 'flex';
        formSuccess.style.display = 'none';
      }, 5000);
    });
  }

  updateActiveSection();
});
