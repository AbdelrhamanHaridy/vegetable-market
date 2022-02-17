let toTop = document.querySelector('.back-to-top');
window.onscroll = () => {
  //back to top
  if(window.scrollY >= 600) {
    toTop.classList.add('active');
  } else {
    toTop.classList.remove('active');
  }
}

//back to top
toTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


//Swiper js
var swiper = new Swiper(".home-1 .hero-swiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  grabCursor: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var swiper = new Swiper(".catSwiper", {
  slidesPerView: 10,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  breakpoints: {
    500: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    900: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 6,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 7,
      spaceBetween: 30,
    },
    1400: {
      slidesPerView: 10,
      spaceBetween: 30,
    }
  },
  grabCursor: true,
  navigation: {
    nextEl: ".popular-categories .slider-next",
    prevEl: ".popular-categories .slider-prev",
  },
});

var swiper = new Swiper(".dailySwiper", {
  loop: true,
  spaceBetween: 25,
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1376: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  },
  navigation: {
    nextEl: ".daily-best .slider-next",
    prevEl: ".daily-best .slider-prev",
  },
});

new WOW().init();

// Count Down
var countDownDateOne = new Date("Mar 25, 2025 00:00:00").getTime();
var countDownDateTwo = new Date("Apr 25, 2026 00:00:00").getTime();
var countDownDateThree = new Date("Mar 25, 2027 00:00:00").getTime();
var countDownDateFour = new Date("Feb 25, 2025 00:00:00").getTime();
var now = new Date().getTime();

// One
var countdownfunctionOne = setInterval(function() {
  
  // Now Time
  var now = new Date().getTime();

  //Distance
  var distanceOne = countDownDateOne - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distanceOne / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distanceOne % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distanceOne % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distanceOne % (1000 * 60)) / 1000);
  
  // Output the result in an element with id="demo"
  document.querySelector('.count-down-one').innerHTML = `
    <span class="countdown-section">
    <span class="countdown-amount hover-up">${days}</span>
    <span class="countdown-period"> days </span>
    </span>
    <span class="countdown-section">
      <span class="countdown-amount hover-up">${hours}</span>
      <span class="countdown-period"> hours </span>
    </span>
    <span class="countdown-section">
      <span class="countdown-amount hover-up">${minutes}</span>
      <span class="countdown-period"> mins </span>
    </span>
    <span class="countdown-section">
      <span class="countdown-amount hover-up">${seconds}</span>
      <span class="countdown-period"> sec </span>
    </span>
  `;
  
  // If the count down is over, write some text 
  if (distanceOne < 0) {
    clearInterval(countdownfunctionOne);
    document.querySelector('.count-down-one').innerHTML = `
    <span class="countdown-section">
    <span class="countdown-amount hover-up">00</span>
    <span class="countdown-period"> days </span>
    </span>
    <span class="countdown-section">
      <span class="countdown-amount hover-up">00</span>
      <span class="countdown-period"> hours </span>
    </span>
    <span class="countdown-section">
      <span class="countdown-amount hover-up">00</span>
      <span class="countdown-period"> mins </span>
    </span>
    <span class="countdown-section">
      <span class="countdown-amount hover-up">00</span>
      <span class="countdown-period"> sec </span>
    </span>
    `;
  }
}, 1000);
// Two
var countdownfunctionTwo = setInterval(function() {
  
  var now = new Date().getTime();

  var distanceTwo = countDownDateTwo - now;

  // Time calculations for days, hours, minutes and seconds
  var daysTwo = Math.floor(distanceTwo / (1000 * 60 * 60 * 24));
  var hoursTwo = Math.floor((distanceTwo % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutesTwo = Math.floor((distanceTwo % (1000 * 60 * 60)) / (1000 * 60));
  var secondsTwo = Math.floor((distanceTwo % (1000 * 60)) / 1000);
  
  // Output the result in an element with id="demo"
  document.querySelector('.count-down-two').innerHTML = `
  <span class="countdown-section">
  <span class="countdown-amount hover-up">${daysTwo}</span>
  <span class="countdown-period"> days </span>
  </span>
  <span class="countdown-section">
    <span class="countdown-amount hover-up">${hoursTwo}</span>
    <span class="countdown-period"> hours </span>
  </span>
  <span class="countdown-section">
    <span class="countdown-amount hover-up">${minutesTwo}</span>
    <span class="countdown-period"> mins </span>
  </span>
  <span class="countdown-section">
    <span class="countdown-amount hover-up">${secondsTwo}</span>
    <span class="countdown-period"> sec </span>
  </span>
`;
  
  // If the count down is over, write some text 
  if (distanceTwo < 0) {
    clearInterval(countdownfunctionTwo);
    document.querySelector('.count-down-two').innerHTML = `
    <span class="countdown-section">
    <span class="countdown-amount hover-up">00</span>
    <span class="countdown-period"> days </span>
    </span>
    <span class="countdown-section">
      <span class="countdown-amount hover-up">00</span>
      <span class="countdown-period"> hours </span>
    </span>
    <span class="countdown-section">
      <span class="countdown-amount hover-up">00</span>
      <span class="countdown-period"> mins </span>
    </span>
    <span class="countdown-section">
      <span class="countdown-amount hover-up">00</span>
      <span class="countdown-period"> sec </span>
    </span>
  `}
}, 1000);
//Three
var countdownfunctionThree = setInterval(function() {
  
  var now = new Date().getTime();

  var distanceThree = countDownDateThree - now;

  // Time calculations for days, hours, minutes and seconds
  var daysThree = Math.floor(distanceThree / (1000 * 60 * 60 * 24));
  var hoursThree = Math.floor((distanceThree % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutesThree = Math.floor((distanceThree % (1000 * 60 * 60)) / (1000 * 60));
  var secondsThree = Math.floor((distanceThree % (1000 * 60)) / 1000);
  
  // Output the result in an element with id="demo"
  document.querySelector('.count-down-three').innerHTML = `
  <span class="countdown-section">
  <span class="countdown-amount hover-up">${daysThree}</span>
  <span class="countdown-period"> days </span>
  </span>
  <span class="countdown-section">
    <span class="countdown-amount hover-up">${hoursThree}</span>
    <span class="countdown-period"> hours </span>
  </span>
  <span class="countdown-section">
    <span class="countdown-amount hover-up">${minutesThree}</span>
    <span class="countdown-period"> mins </span>
  </span>
  <span class="countdown-section">
    <span class="countdown-amount hover-up">${secondsThree}</span>
    <span class="countdown-period"> sec </span>
  </span>
`;
  
  // If the count down is over, write some text 
  if (distanceThree < 0) {
    clearInterval(countdownfunctionThree);
    document.querySelector('.count-down-three').innerHTML = `
    <span class="countdown-section">
    <span class="countdown-amount hover-up">00</span>
    <span class="countdown-period"> days </span>
    </span>
    <span class="countdown-section">
      <span class="countdown-amount hover-up">00</span>
      <span class="countdown-period"> hours </span>
    </span>
    <span class="countdown-section">
      <span class="countdown-amount hover-up">00</span>
      <span class="countdown-period"> mins </span>
    </span>
    <span class="countdown-section">
      <span class="countdown-amount hover-up">00</span>
      <span class="countdown-period"> sec </span>
    </span>
  `}
}, 1000);
//Four
var countdownfunctionFour = setInterval(function() {
  
  var now = new Date().getTime();

  var distanceFour = countDownDateFour - now;

  // Time calculations for days, hours, minutes and seconds
  var daysFour = Math.floor(distanceFour / (1000 * 60 * 60 * 24));
  var hoursFour = Math.floor((distanceFour % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutesFour = Math.floor((distanceFour % (1000 * 60 * 60)) / (1000 * 60));
  var secondsFour = Math.floor((distanceFour % (1000 * 60)) / 1000);
  
  // Output the result in an element with id="demo"
  document.querySelector('.count-down-four').innerHTML = `
  <span class="countdown-section">
  <span class="countdown-amount hover-up">${daysFour}</span>
  <span class="countdown-period"> days </span>
  </span>
  <span class="countdown-section">
    <span class="countdown-amount hover-up">${hoursFour}</span>
    <span class="countdown-period"> hours </span>
  </span>
  <span class="countdown-section">
    <span class="countdown-amount hover-up">${minutesFour}</span>
    <span class="countdown-period"> mins </span>
  </span>
  <span class="countdown-section">
    <span class="countdown-amount hover-up">${secondsFour}</span>
    <span class="countdown-period"> sec </span>
  </span>
`;
  
  // If the count down is over, write some text 
  if (distanceFour < 0) {
    clearInterval(countdownfunctionFour);
    document.querySelector('.count-down-four').innerHTML = `
    <span class="countdown-section">
    <span class="countdown-amount hover-up">00</span>
    <span class="countdown-period"> days </span>
    </span>
    <span class="countdown-section">
      <span class="countdown-amount hover-up">00</span>
      <span class="countdown-period"> hours </span>
    </span>
    <span class="countdown-section">
      <span class="countdown-amount hover-up">00</span>
      <span class="countdown-period"> mins </span>
    </span>
    <span class="countdown-section">
      <span class="countdown-amount hover-up">00</span>
      <span class="countdown-period"> sec </span>
    </span>
  `;
  }
}, 1000);