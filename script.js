const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const startedLink = document.querySelector(".started_link");
const navList = document.querySelector(".nav_list");
const logo = document.querySelector(".logo");
const navIcon = document.querySelector(".nav_icon");
const overlay = document.querySelector(".overlay");
const blurry = document.querySelector(".blurry");
const section1 = document.querySelector(".hero_section");
const slides = document.querySelectorAll(".slide");
const btnRight = document.querySelector(".btn_right");
const btnLeft = document.querySelector(".btn_left");
const gallImg = document.querySelector(".gallery_img:nth-child(2)");
const showElements = document.querySelectorAll(".show_el");
const mediaQuery1 = window.matchMedia("(max-width: 62rem)");
const mediaQuery2 = window.matchMedia("(max-width: 35.13rem)");

// Listen to media query change
if (mediaQuery1.matches) {
  startedLink.classList.add("hidden");
  navList.insertAdjacentHTML(
    "beforeend",
    `<a href="#cta" class="nav_link started_link flex"
    >Get Started</a>`
  );
}

// Wait promise
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// nav icon's click event
const showNavList = function () {
  overlay.classList.toggle("hidden");
  wait(0.05).then(() => overlay.classList.toggle("overlay--active"));
  navIcon.classList.toggle("nav_icon--active");
  navList.classList.toggle("nav_list--active");
};

navIcon.addEventListener("click", showNavList);
overlay.addEventListener("click", showNavList);

navList.addEventListener("click", function (e) {
  const clicked = e.target.closest(".nav_link");
  if (clicked && navList.classList.contains("nav_list--active")) {
    overlay.classList.add("hidden");
    overlay.classList.remove("overlay--active");
    navIcon.classList.remove("nav_icon--active");
    navList.classList.remove("nav_list--active");
  }
});

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) header.classList.add("sticky");
  else header.classList.remove("sticky");
};

const Observer = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

Observer.observe(section1);
// Slider
const slider = function () {
  let curSlide = 0;
  const maxSlide = slides.length;
  const goToSlide = function (slide) {
    slides.forEach((s) => {
      s.classList.add("slide--hidden");
    });
    slides.forEach((s, i) => {
      s.classList.remove("animate__fadeInLeft");
      s.style.transform = `translateX(${150 * (i - slide)}%)`;
    });
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    btnLeft.classList.remove("arrow--active");
    btnRight.classList.add("arrow--active");
    goToSlide(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    btnLeft.classList.add("arrow--active");
    btnRight.classList.remove("arrow--active");
    goToSlide(curSlide);
  };

  const init = function () {
    goToSlide(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });
};
slider();

window.addEventListener("scroll", function () {
  showElements.forEach((element, index) => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementPosition < windowHeight) {
      if (element.classList.contains("show_el--left")) {
        element.classList.add("animate__fadeInLeft");
      } else element.classList.add("animate__fadeInTop");
    }
  });
});
