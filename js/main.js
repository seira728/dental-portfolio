// ========================================
// ハンバーガーメニュー
// ========================================
const hamburger = document.querySelector('.hamburger');
const spNav = document.querySelector('.sp-nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  spNav.classList.toggle('active');
});

// ========================================
// スマホ 診療案内アコーディオン
// ========================================
const spDropdown = document.querySelector('.sp-nav__dropdown');
const spDropdownToggle = document.querySelector('.sp-nav__toggle');

spDropdownToggle.addEventListener('click', () => {
  spDropdown.classList.toggle('active');
});

// ========================================
// MV
// ========================================
const mvSlides = document.querySelectorAll('.mv__slide');
const mvDots = document.querySelectorAll('.mv__dots button');

let mvCurrent = 0;
let mvTimer;

function showMvSlide(index) {

  mvSlides.forEach((slide) => {
    slide.classList.remove('active');
  });

  mvDots.forEach((dot) => {
    dot.classList.remove('active');
  });

  mvSlides[index].classList.add('active');
  mvDots[index].classList.add('active');

  mvCurrent = index;
}

function nextMvSlide() {
  const next = (mvCurrent + 1) % mvSlides.length;
  showMvSlide(next);
}

function startMvSlide() {
  mvTimer = setInterval(nextMvSlide, 7000);
}

mvDots.forEach((dot, index) => {

  dot.addEventListener('click', () => {

    clearInterval(mvTimer);

    showMvSlide(index);

    startMvSlide();
  });

});

startMvSlide();


// ========================================
// スクロールアニメーション
// ========================================

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

targets.forEach(target => {
  observer.observe(target);
});


// ========================================
// 当院について＿カルーセル
// ========================================
const carouselContainer =
  document.querySelector('.carousel__slides');
const carouselDots =
  document.querySelectorAll('.carousel__dot');
const carouselPrevButton =
  document.querySelector('.carousel__button--prev');
const carouselNextButton =
  document.querySelector('.carousel__button--next');

// 元のスライド
let carouselSlides =
  document.querySelectorAll('.carousel__slide');

// 元の枚数
const carouselCount = carouselSlides.length;

//1枚目を複製して最後に追加
const firstSlideClone =
  carouselSlides[0].cloneNode(true);
carouselContainer.appendChild(firstSlideClone);

// スライドを再取得
carouselSlides =
  document.querySelectorAll('.carousel__slide');

//現在位置
let carouselCurrent = 0;
let carouselTimer;
let isAnimating = false;

//スライドを移動
function moveCarousel(animate = true) {
  if (animate) {
    carouselContainer.style.transition =
      'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
  } else {
    carouselContainer.style.transition = 'none';
  }

  carouselContainer.style.transform =
    `translateX(-${carouselCurrent * 100}%)`;

  // ドット更新
  carouselDots.forEach((dot, index) => {
    dot.classList.toggle(
      'active',
      index === carouselCurrent % carouselCount
    );
  });
}


//次へ
function nextCarousel() {
  if (isAnimating) return;
  isAnimating = true;
  carouselCurrent++;
  moveCarousel(true);

// 3枚目 → 複製した1枚目
  if (carouselCurrent === carouselCount) {
    setTimeout(() => {
      // アニメーション終了後
      // 本物の1枚目へ瞬間移動
      carouselCurrent = 0;
      moveCarousel(false);
      isAnimating = false;
    }, 800);

  } else {
    setTimeout(() => {
      isAnimating = false;
    }, 800);
  }
}

//前へ
function prevCarousel() {
  if (isAnimating) return;
  isAnimating = true;

  if (carouselCurrent === 0) {
    // 1枚目から前へ行く場合
    // 複製1枚目へ瞬間移動
    carouselCurrent = carouselCount;
    moveCarousel(false);

    // そこから3枚目へ左方向に移動
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        carouselCurrent = carouselCount - 1;
        moveCarousel(true);
      });
    });

  } else {
    carouselCurrent--;
    moveCarousel(true);
  }

  setTimeout(() => {
    isAnimating = false;
  }, 800);
}

//次へボタン
carouselNextButton.addEventListener('click', () => {
  nextCarousel();
  restartCarousel();
});

//前へボタン
carouselPrevButton.addEventListener('click', () => {
  prevCarousel();
  restartCarousel();
});

//ドット
carouselDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    if (isAnimating) return;
    if (index === carouselCurrent) return;
    carouselCurrent = index;
    moveCarousel(true);
    restartCarousel();
  });
});

//自動切り替え
function startCarousel() {
  carouselTimer = setInterval(() => {
    nextCarousel();
  }, 5000);
}

//タイマーリセット
function restartCarousel() {
  clearInterval(carouselTimer);
  startCarousel();
}

//初期表示
moveCarousel(false);
startCarousel();

// ========================================
// 当院について＿よくある質問
// ========================================
const faqQuestions = document.querySelectorAll('.faq__question');
faqQuestions.forEach((question) => {
  question.addEventListener('click', () => {
    const item = question.closest('.faq__item');
    // クリックした項目だけ開閉
    item.classList.toggle('is-open');
  });
});

// ========================================
// 診療案内＿表2
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  new ScrollHint(".js-scrollable", {
    i18n: {
      scrollable: "スクロールできます。",
    },
  });
});