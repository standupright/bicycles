const NAV_CLOSED = 'nav--closed';
const NAV_NOJS = 'nav--nojs';
const NAV_OPENED = 'nav--opened';
const OVERFLOW = 'overflow-hidden';
const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav__toggle');
const body = document.querySelector('#body');
const form = document.querySelector('.form-field');
const nameForm = document.querySelector('#name');
const telForm = document.querySelector('#tel');

// nav open and closed
if (nav) {
  nav.classList.remove(NAV_NOJS);
  nav.classList.add(NAV_CLOSED);
}

if (navToggle) {
  navToggle.addEventListener('click', () => {
    if (nav.classList.contains(NAV_CLOSED)) {
      nav.classList.remove(NAV_CLOSED);
      nav.classList.add(NAV_OPENED);
      body.classList.add(OVERFLOW);
    } else {
      nav.classList.add(NAV_CLOSED);
      nav.classList.remove(NAV_OPENED);
      body.classList.remove(OVERFLOW);
    }
  });
}

// Плавный скролл
const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (const smoothLink of smoothLinks) {
  if (smoothLink) {
    smoothLink.addEventListener('click', (evt) => {
      evt.preventDefault();
      const id = smoothLink.getAttribute('href');

      const placeScroll = document.querySelector(id);

      if (placeScroll) {
        placeScroll.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        nav.classList.remove(NAV_OPENED);
        nav.classList.add(NAV_CLOSED);
        body.classList.remove(OVERFLOW);
      }
    });
  }
}

// Валидация формы
if (nameForm) {
  nameForm.addEventListener('invalid', () => {
    if (nameForm.validity.valueMissing) {
      nameForm.setCustomValidity('Обязательное поле');
    } else {
      nameForm.setCustomValidity('');
    }
  });
}

if (telForm) {
  telForm.addEventListener('invalid', () => {
    if (telForm.validity.valueMissing || telForm.validity.patternMismatch) {
      telForm.setCustomValidity('Неверный номер телефона');
    } else {
      telForm.setCustomValidity('');
    }
  });
}

let isStorageSupport = true;
let storageName = '';
let storageTel = '';

try {
  storageName = localStorage.getItem('name');
  storageTel = localStorage.getItem('tel');
} catch (err) {
  isStorageSupport = false;
}

if (storageName && nameForm) {
  nameForm.value = storageName;
}

if (storageTel && telForm) {
  telForm.value = storageTel;
}

// Событие отправки формы
if (form) {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (isStorageSupport) {
      localStorage.setItem('name', nameForm.value);
      localStorage.setItem('tel', telForm.value);
    }

    nameForm.value = '';
    telForm.value = '';
  });
}
