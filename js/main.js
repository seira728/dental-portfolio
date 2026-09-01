//MV
const slides = document.querySelectorAll('.mv__slide');
const dots = document.querySelectorAll('.mv__dots button');

let current = 0;
let timer;

function showSlide(index) {
  slides.forEach((slide) => {
    slide.classList.remove('active');
  });

  dots.forEach((dot) => {
    dot.classList.remove('active');
  });

  slides[index].classList.add('active');
  dots[index].classList.add('active');

  current = index;
}

function nextSlide() {
  const next = (current + 1) % slides.length;
  showSlide(next);
}

function startSlide() {
  timer = setInterval(nextSlide, 7000);
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    clearInterval(timer);
    showSlide(index);
    startSlide();
  });
});

startSlide();


//scroll animation
const targets = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

targets.forEach(target => observer.observe(target));