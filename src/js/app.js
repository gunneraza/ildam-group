if (module.hot) {
  module.hot.accept();
}

import Parallax from 'parallax-js';
import Isotope from 'isotope-layout';
import Swiper from 'swiper';


var swiper = new Swiper('.team-slider', {
  slidesPerView: 6,
  loop: true,
  navigation: {
    nextEl: '.team-button'
  },
  breakpoints: {
    // when window width is >= 320px
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