'use strict'

const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav__toggle');
const body = document.querySelector('#body');

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
