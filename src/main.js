document.addEventListener('DOMContentLoaded', () => {

  // 1. AOS Initialization (Scroll Animation Library)
  if (typeof AOS !== 'undefined') {
      AOS.init({
          duration: 1000,
          once: true
      });
  }

  // 2. Smooth Scroll (Fixed querySelector '#' error)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          const href = this.getAttribute('href');

          // Check: if the link is just "#", do nothing
          if (href === "#") return;

          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
              window.scrollTo({
                  top: target.offsetTop - 80,
                  behavior: 'smooth'
              });
          }
      });
  });

  // 3. Phone Validation (Numbers and "+" only)
  const phoneInput = document.getElementById('phone-input');
  phoneInput?.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^0-9+]/g, '');
  });

  // 4. Captcha Logic and Form Submission
  const mainForm = document.getElementById('main-form');
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  const captchaLabel = document.getElementById('captcha-label');
  const captchaInput = document.getElementById('captcha-input');

  // Setting English captcha question
  if (captchaLabel) captchaLabel.textContent = `What is ${num1} + ${num2}?`;

  mainForm?.addEventListener('submit', (e) => {
      e.preventDefault();

      if (parseInt(captchaInput.value) !== (num1 + num2)) {
          alert('Incorrect captcha answer! Please try again.');
          return;
      }

      // AJAX Simulation
      const btn = mainForm.querySelector('button');
      const successMsg = document.getElementById('form-success');

      btn.disabled = true;
      btn.textContent = 'Sending...'; // Changed to English

      setTimeout(() => {
          mainForm.reset();
          btn.style.display = 'none';
          successMsg.style.display = 'block';
          // Success message "Message sent successfully!" is handled in HTML
      }, 1500);
  });

  // 5. Cookie Popup
  const cookiePopup = document.getElementById('cookie-popup');
  const cookieAccept = document.getElementById('cookie-accept');

  if (!localStorage.getItem('cookies-accepted')) {
      setTimeout(() => {
          cookiePopup?.classList.add('is-active');
      }, 2000);
  }

  cookieAccept?.addEventListener('click', () => {
      localStorage.setItem('cookies-accepted', 'true');
      cookiePopup?.classList.remove('is-active');
  });

  // 6. Header and Burger Menu Logic
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
      header.classList.toggle('header--scrolled', window.scrollY > 50);
  });

  const burger = document.getElementById('burger-menu');
  const mobileMenu = document.getElementById('mobile-menu');

  burger?.addEventListener('click', () => {
      burger.classList.toggle('is-active');
      mobileMenu.classList.toggle('is-active');
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll('.mobile-menu__link').forEach(link => {
      link.addEventListener('click', () => {
          burger?.classList.remove('is-active');
          mobileMenu?.classList.remove('is-active');
      });
  });
});