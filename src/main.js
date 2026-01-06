document.addEventListener('DOMContentLoaded', () => {

  // 1. Инициализация AOS (библиотека анимации по скроллу)
  // Добавьте <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script> в head
  if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 1000, once: true });
  }

  // 2. Исправленный Плавный скролл (Фикс ошибки querySelector '#')
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          const href = this.getAttribute('href');

          // Проверка: если в ссылке только "#", ничего не делаем
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

  // 3. Валидация телефона (только цифры)
  const phoneInput = document.getElementById('phone-input');
  phoneInput?.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^0-9+]/g, '');
  });

  // 4. Имитация капчи и отправка формы
  const mainForm = document.getElementById('main-form');
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  const captchaLabel = document.getElementById('captcha-label');
  const captchaInput = document.getElementById('captcha-input');

  if (captchaLabel) captchaLabel.textContent = `Сколько будет ${num1} + ${num2}?`;

  mainForm?.addEventListener('submit', (e) => {
      e.preventDefault();

      if (parseInt(captchaInput.value) !== (num1 + num2)) {
          alert('Неверный ответ капчи!');
          return;
      }

      // Имитация AJAX
      const btn = mainForm.querySelector('button');
      const successMsg = document.getElementById('form-success');

      btn.disabled = true;
      btn.textContent = 'Отправка...';

      setTimeout(() => {
          mainForm.reset();
          btn.style.display = 'none';
          successMsg.style.display = 'block';
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

  // 6. Хедер и Бургер (из предыдущего этапа)
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
});