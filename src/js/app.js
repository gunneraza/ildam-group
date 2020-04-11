if (module.hot) {
  module.hot.accept();
}

import Parallax from 'parallax-js';
import Isotope from 'isotope-layout';
import Swiper from 'swiper';
import SmoothScroll from 'smooth-scroll';
import Swal from "sweetalert2";
import WOW from 'wow.js';
import axios from 'axios';

var scene = document.getElementById('scene');
var parallaxInstance = new Parallax(scene);

var scroll = new SmoothScroll('a[href*="#"]', {
  speed: 500
});

new WOW().init();

let services = document.querySelector('.services');

services.addEventListener('click', e => {
  let target = e.target;
  
  if(target.hasAttribute('data-img')) {
    let imgUrl = target.getAttribute('data-img');

    Swal.fire({
      imageUrl: imgUrl,
      width: 'auto',
      cancelButtonText: 'Закрыть'
    })
  }

});

document.addEventListener('DOMContentLoaded', e => {
  
  
  let iso = new Isotope('.services', {
    itemSelector: '.services__item',
  });

  iso.arrange({filter: '.playground'});

  let buttons = document.querySelector('.services-nav');
  let list = document.querySelectorAll('.services-nav__item');

  buttons.addEventListener('click', e => {
    let target = e.target;
    
  
    for (let i = 0; i < list.length; i++) {
      const element = list[i];
      if(element.classList.contains('active')) {
        element.classList.remove('active');
      }
      
    }
    
    if(target.tagName === 'LI') {
      let category = target.getAttribute('data-filter');
      iso.arrange({filter: category});
      target.classList.add('active');
    }
  });
})




var swiper = new Swiper('.team-slider', {
  slidesPerView: 6,
  loop: true,
  navigation: {
    nextEl: '.team-button'
  },
  breakpoints: {
    200: {
      slidesPerView: 1,
    },
    
    576: {
      slidesPerView: 2,
    },

    768: {
      slidesPerView: 3,
    },

    1200: {
      slidesPerView: 4,
    },

    1400: {
      slidesPerView: 6
    }
  }
});


let clouds = Array.from(document.querySelectorAll('.cloud'));

clouds.forEach(el => {
  el.style.animationDelay = el.getAttribute('data-delay');
})


let submit = document.getElementById('form-submit');
let feedbackForm = document.getElementById('feedback-from');

submit.addEventListener('click', e => {
  let target = e.target;
  e.preventDefault();
  let name = feedbackForm.name.value.trim().length;
  let number = feedbackForm.number.value.trim().length;
  let flag = false;
  
  if(name === 0) {
    Swal.fire('Пожалуйста введите ваше имя');
  } else if (number === 0) {
    Swal.fire('Пожалуйста введите ваш номер');
  } else {
    flag = true;
  }

  if(flag) {
    let date = new FormData();
    date.append('name', feedbackForm.name.value);
    date.append('number', feedbackForm.number.value);

    axios.post('/mail.php', date, {
      'Content-Type': 'application/x-www-form-urlencoded'
    }).then(response => {
      console.log(response);
      if(response.status === 200) {
        feedbackForm.name.value = '';
        feedbackForm.number.value = '';
        Swal.fire('Заявка успешно отправлена');
      }
      
    })    
  }

});
