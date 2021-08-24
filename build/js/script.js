'use strict'

const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav__toggle');
const body = document.querySelector('#body');

const form = document.querySelector('.form-field');
const nameForm = document.querySelector('#name');
const telForm = document.querySelector('#tel');

// nav open and closed
nav.classList.remove('nav--nojs');
nav.classList.add('nav--closed');

navToggle.addEventListener('click', function () {
  if (nav.classList.contains('nav--closed')) {
    nav.classList.remove('nav--closed');
    nav.classList.add('nav--opened');
    body.classList.add('overflow-hidden');
  } else {
    nav.classList.add('nav--closed');
    nav.classList.remove('nav--opened');
    body.classList.remove('overflow-hidden');
  }
});

// Плавный скролл
const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
  smoothLink.addEventListener('click', function (e) {
    e.preventDefault();
    const id = smoothLink.getAttribute('href');

    const placeScroll = document.querySelector(id);

    if (placeScroll) {
      placeScroll.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      nav.classList.remove('nav--opened');
      nav.classList.add('nav--closed');
      body.classList.remove('overflow-hidden');
    }
  });
};

// Валидация формы
nameForm.addEventListener('invalid', () => {
  if (nameForm.validity.valueMissing) {
    nameForm.setCustomValidity('Обязательное поле');
  } else {
    nameForm.setCustomValidity('');
  }
});

telForm.addEventListener('invalid', () => {
  if (telForm.validity.valueMissing || telForm.validity.patternMismatch) {
    telForm.setCustomValidity('Неверный номер телефона');
  } else {
    telForm.setCustomValidity('');
  }
});

let isStorageSupport = true;
let storageName = "";
let storageTel = "";

try {
  storageName = localStorage.getItem("name");
  storageTel = localStorage.getItem("tel");
} catch (err) {
  isStorageSupport = false;
}

if (storageName) {
  nameForm.value = storageName;
}

if (storageTel) {
  telForm.value = storageTel;
}

// Событие отправки формы
form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  if (isStorageSupport) {
    localStorage.setItem("name", nameForm.value);
    localStorage.setItem("tel", telForm.value);
  }

  nameForm.value = '';
  telForm.value = '';
});
