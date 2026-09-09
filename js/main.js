// ========================================
// ハンバーガーメニュー
// ========================================
const hamburger = document.querySelector('.hamburger');
const spNav = document.querySelector('.sp-nav');
if (hamburger && spNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    spNav.classList.toggle('active');
  });
}

// ========================================
// スマホ 診療案内アコーディオン
// ========================================
const spDropdowns = document.querySelectorAll('.sp-nav__dropdown');
spDropdowns.forEach(dropdown => {
  const toggle = dropdown.querySelector('.sp-nav__toggle');
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    dropdown.classList.toggle('active');
  });
});

// ========================================
// MV
// ========================================
const mvSlides = document.querySelectorAll('.mv__slide');
const mvDots = document.querySelectorAll('.mv__dots button');

if (mvSlides.length && mvDots.length) {
  let mvCurrent = 0;
  let mvTimer;

  function showMvSlide(index) {

    // 現在の画像をズーム状態で固定
    mvSlides[mvCurrent].classList.add('zoomed');
    mvSlides[mvCurrent].classList.remove('active');

    // 次の画像
    mvSlides[index].classList.remove('zoomed');
    mvSlides[index].classList.add('active');

    // ドット
    mvDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

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

  // 初期状態
  mvSlides[0].classList.add('active');
  mvDots[0].classList.add('active');

  startMvSlide();
}

// ========================================
// スクロールアニメーション
// ========================================
const targets = document.querySelectorAll('.fade-up');

if (targets.length) {
  const observer = new IntersectionObserver(entries => {
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
}

// ========================================
// 当院について＿カルーセル
// ========================================
const carousels = document.querySelectorAll('.carousel');

carousels.forEach((carousel) => {
  const carouselContainer = carousel.querySelector('.carousel__slides');
  const carouselDots = carousel.querySelectorAll('.carousel__dot');
  const carouselPrevButton = carousel.querySelector('.carousel__button--prev');
  const carouselNextButton = carousel.querySelector('.carousel__button--next');

  if (
    !carouselContainer ||
    !carouselDots.length ||
    !carouselPrevButton ||
    !carouselNextButton
  ) {
    return;
  }

  let carouselSlides = carouselContainer.querySelectorAll('.carousel__slide');
  const carouselCount = carouselSlides.length;

  let carouselCurrent = 0;
  let carouselTimer;
  let isAnimating = false;

  if (carouselCount <= 1) return;

  // 最初のスライドを複製
  const firstSlideClone = carouselSlides[0].cloneNode(true);
  carouselContainer.appendChild(firstSlideClone);
  carouselSlides = carouselContainer.querySelectorAll('.carousel__slide');

  // ========================================
  // カルーセル移動
  // ========================================

  function moveCarousel(animate = true) {
    carouselContainer.style.transition = animate
      ? 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
      : 'none';

    carouselContainer.style.transform = `translateX(-${carouselCurrent * 100}%)`;

    // ドット更新
    carouselDots.forEach((dot, index) => {
      dot.classList.toggle(
        'active',
        index === carouselCurrent % carouselCount
      );
    });
  }

  // ========================================
  // 次へ
  // ========================================

  function nextCarousel() {
    if (isAnimating) return;

    isAnimating = true;
    carouselCurrent++;
    moveCarousel(true);

    // 最後のクローンまで到達したら最初へ戻す
    if (carouselCurrent === carouselCount) {
      setTimeout(() => {
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

  // ========================================
  // 前へ
  // ========================================

  function prevCarousel() {
    if (isAnimating) return;

    isAnimating = true;

    if (carouselCurrent === 0) {
      // 一旦クローンの位置へ移動
      carouselCurrent = carouselCount;
      moveCarousel(false);

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

  // ========================================
  // 自動再生
  // ========================================

  function startCarousel() {
    carouselTimer = setInterval(nextCarousel, 5000);
  }

  function restartCarousel() {
    clearInterval(carouselTimer);
    startCarousel();
  }

  // ========================================
  // ボタン
  // ========================================

  carouselNextButton.addEventListener('click', () => {
    nextCarousel();
    restartCarousel();
  });

  carouselPrevButton.addEventListener('click', () => {
    prevCarousel();
    restartCarousel();
  });

  // ========================================
  // ドット
  // ========================================

  carouselDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      if (
        isAnimating ||
        index === carouselCurrent % carouselCount
      ) {
        return;
      }

      carouselCurrent = index;
      moveCarousel(true);
      restartCarousel();
    });
  });

  // 初期状態
  moveCarousel(false);
  startCarousel();
});

// ========================================
// 当院について＿よくある質問
// ========================================
const faqQuestions = document.querySelectorAll('.faq__question');

faqQuestions.forEach(question => {
  question.addEventListener('click', () => {
    const item = question.closest('.faq__item');
    if (item) {
      item.classList.toggle('is-open');
    }
  });
});

// ========================================
// 診療案内＿表2
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.js-scrollable') && typeof ScrollHint !== 'undefined') {
    new ScrollHint('.js-scrollable', {
      i18n: {
        scrollable: 'スクロールできます。'
      }
    });
  }
});

// ========================================
// 治療の流れ
// ========================================
document.querySelectorAll('.step_slider_wrap').forEach((sliderWrap) => {

  const track = sliderWrap.querySelector('.step_slider__track');
  const boxes = sliderWrap.querySelectorAll('.step_box');
  const prevButton = sliderWrap.querySelector('.step_slider__arrow--prev');
  const nextButton = sliderWrap.querySelector('.step_slider__arrow--next');
  const dotsContainer = sliderWrap.querySelector('.step_slider__dots');

  let currentStep = 0;


  // ドット作成
  boxes.forEach((_, index) => {

    const dot = document.createElement('button');

    dot.classList.add('step_slider__dot');

    if (index === 0) {
      dot.classList.add('active');
    }

    dot.addEventListener('click', () => {
      currentStep = index;
      updateSlider();
    });

    dotsContainer.appendChild(dot);

  });


  const dots = dotsContainer.querySelectorAll('.step_slider__dot');


  // スライダー更新
  function updateSlider() {

    const boxWidth = boxes[0].offsetWidth;
    const gap = 20;

    track.style.transform =
      `translateX(-${currentStep * (boxWidth + gap)}px)`;


    dots.forEach((dot, index) => {
      dot.classList.toggle(
        'active',
        index === currentStep
      );
    });

  }


  // 次へ
  nextButton.addEventListener('click', () => {

    if (currentStep < boxes.length - 1) {
      currentStep++;
      updateSlider();
    }

  });


  // 前へ
  prevButton.addEventListener('click', () => {

    if (currentStep > 0) {
      currentStep--;
      updateSlider();
    }

  });

});

// ========================================
// 症例
// ========================================
document.querySelectorAll('.case_slider_wrap').forEach((sliderWrap) => {

  const track = sliderWrap.querySelector('.case_slider__track');
  const items = sliderWrap.querySelectorAll('.case_item');

  const prevButton =
    sliderWrap.querySelector('.case_slider__arrow--prev');

  const nextButton =
    sliderWrap.querySelector('.case_slider__arrow--next');

  const dotsContainer =
    sliderWrap.querySelector('.case_slider__dots');

  let currentIndex = 0;


  // ドット作成
  items.forEach((_, index) => {

    const dot = document.createElement('button');

    dot.type = 'button';
    dot.classList.add('case_slider__dot');

    if (index === 0) {
      dot.classList.add('active');
    }

    dot.addEventListener('click', () => {
      currentIndex = index;
      updateSlider();
    });

    dotsContainer.appendChild(dot);

  });


  const dots =
    dotsContainer.querySelectorAll('.case_slider__dot');


  // 矢印を写真の上下中央に配置
  function positionArrows() {

    const photoWrap =
      items[currentIndex].querySelector('.case_photo_wrap');

    if (!photoWrap) return;

    const slider =
      sliderWrap.querySelector('.case_slider');

    const sliderRect =
      slider.getBoundingClientRect();

    const photoRect =
      photoWrap.getBoundingClientRect();

    const center =
      photoRect.top +
      photoRect.height / 2 -
      sliderRect.top;

    prevButton.style.top = `${center}px`;
    nextButton.style.top = `${center}px`;

  }


  // スライダー更新
  function updateSlider() {

    track.style.transform =
      `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, index) => {
      dot.classList.toggle(
        'active',
        index === currentIndex
      );
    });

    positionArrows();

  }


  // 次へ
  nextButton.addEventListener('click', () => {

    if (currentIndex < items.length - 1) {
      currentIndex++;
      updateSlider();
    }

  });


  // 前へ
  prevButton.addEventListener('click', () => {

    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }

  });


  // 初期表示時
  positionArrows();


  // 画面サイズ変更時
  window.addEventListener('resize', positionArrows);

});

// ========================================
// トップへ戻るボタン
// ========================================
const pageTop = document.querySelector('.page-top');

if (pageTop) {
  window.addEventListener('scroll', () => {
    pageTop.classList.toggle('is-show', window.scrollY > 300);
  });

  pageTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ========================================
// 症例画像モーダル
// ========================================

const modalTriggers = document.querySelectorAll('.modal_trigger');
const imageModal = document.querySelector('#imageModal');
const modalImage = document.querySelector('#modalImage');
const modalClose = document.querySelector('.image_modal__close');

if (modalTriggers.length && imageModal) {

  // 画像をクリック
  modalTriggers.forEach((image) => {

    image.addEventListener('click', () => {

      modalImage.src = image.src;
      modalImage.alt = image.alt;

      imageModal.classList.add('active');

      // 背景スクロールを停止
      document.body.style.overflow = 'hidden';
    });

  });

  // モーダルを閉じる
  function closeModal() {
    imageModal.classList.remove('active');

    document.body.style.overflow = '';

    // 閉じたら画像を空にする
    setTimeout(() => {
      modalImage.src = '';
    }, 300);
  }

  // ×ボタン
  modalClose.addEventListener('click', closeModal);

  // 写真以外をクリックしたら閉じる
  imageModal.addEventListener('click', (e) => {

    // 写真をクリックした場合は何もしない
    if (e.target === modalImage) {
      return;
    }

    closeModal();
  });

  // ESCキーで閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imageModal.classList.contains('active')) {
      closeModal();
    }
  });
}

// ========================================
// お問い合わせフォーム
// ========================================

const contactForm = document.querySelector('#contactForm');

if (contactForm) {

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let isValid = true;

    // ========================================
    // エラーをリセット
    // ========================================

    document.querySelectorAll('.form_content').forEach(item => {
      item.classList.remove('error');

      const error = item.querySelector('.error_message');

      if (error) {
        error.textContent = '';
      }
    });

    document.querySelector('.privacy_agree').classList.remove('error');

    const privacyError =
      document.querySelector('.privacy_agree .error_message');

    privacyError.textContent = '';

    // ========================================
    // お問い合わせ内容
    // ========================================

    const category =
      document.querySelector('input[name="category"]:checked');

    const categoryError =
      document
        .querySelector('input[name="category"]')
        .closest('.form_content')
        .querySelector('.error_message');

    if (!category) {
      categoryError.textContent =
        'お問い合わせ内容を選択してください。';

      categoryError.parentElement.classList.add('error');

      isValid = false;
    }

    // ========================================
    // お名前
    // ========================================

    const name =
      document.querySelector('#name');

    if (name.value.trim() === '') {
      const parent = name.closest('.form_content');

      parent.classList.add('error');

      parent.querySelector('.error_message').textContent =
        'お名前を入力してください。';

      isValid = false;
    }

    // ========================================
    // ふりがな
    // ========================================

    const kana =
      document.querySelector('#kana');

    if (kana.value.trim() === '') {
      const parent = kana.closest('.form_content');

      parent.classList.add('error');

      parent.querySelector('.error_message').textContent =
        'ふりがなを入力してください。';

      isValid = false;
    }

    // ========================================
    // メールアドレス
    // ========================================

    const email =
      document.querySelector('#email');

    const emailParent =
      email.closest('.form_content');

    if (email.value.trim() === '') {
      emailParent.classList.add('error');

      emailParent.querySelector('.error_message').textContent =
        'メールアドレスを入力してください。';

      isValid = false;

    } else if (!isValidEmail(email.value)) {
      emailParent.classList.add('error');

      emailParent.querySelector('.error_message').textContent =
        '正しいメールアドレスを入力してください。';

      isValid = false;
    }

    // ========================================
    // メールアドレス確認
    // ========================================

    const emailConfirm =
      document.querySelector('#emailConfirm');

    const emailConfirmParent =
      emailConfirm.closest('.form_content');

    if (emailConfirm.value.trim() === '') {
      emailConfirmParent.classList.add('error');

      emailConfirmParent.querySelector('.error_message').textContent =
        'メールアドレスを再入力してください。';

      isValid = false;

    } else if (email.value !== emailConfirm.value) {
      emailConfirmParent.classList.add('error');

      emailConfirmParent.querySelector('.error_message').textContent =
        'メールアドレスが一致していません。';

      isValid = false;
    }

    // ========================================
    // 電話番号
    // ========================================

    const tel =
      document.querySelector('#tel');

    const telParent =
      tel.closest('.form_content');

    if (tel.value.trim() === '') {
      telParent.classList.add('error');

      telParent.querySelector('.error_message').textContent =
        '電話番号を入力してください。';

      isValid = false;

    } else if (!isValidTel(tel.value)) {
      telParent.classList.add('error');

      telParent.querySelector('.error_message').textContent =
        '正しい電話番号を入力してください。';

      isValid = false;
    }

    // ========================================
    // お問い合わせ内容詳細
    // ========================================

    const message =
      document.querySelector('#message');

    const messageParent =
      message.closest('.form_content');

    if (message.value.trim() === '') {
      messageParent.classList.add('error');

      messageParent.querySelector('.error_message').textContent =
        'お問い合わせ内容を入力してください。';

      isValid = false;
    }

    // ========================================
    // プライバシーポリシー
    // ========================================

    const privacy =
      document.querySelector('#privacy');

    const privacyParent =
      document.querySelector('.privacy_agree');

    if (!privacy.checked) {
      privacyParent.classList.add('error');

      privacyError.textContent =
        '個人情報の取り扱いに同意してください。';

      isValid = false;
    }

    // ========================================
    // エラーがある場合
    // ========================================

    if (!isValid) {
      const firstError =
        document.querySelector('.error');

      if (firstError) {
        firstError.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }

      return;
    }

    // ========================================
    // 全項目OK
    // ========================================

    alert('入力内容をご確認ください。');

    // ここで確認画面へ移動
    // window.location.href = 'confirm.html';
  });

  // ========================================
  // メールアドレスチェック
  // ========================================

  function isValidEmail(email) {
    const pattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);
  }

  // ========================================
  // 電話番号チェック
  // ========================================

  function isValidTel(tel) {
    const pattern =
      /^[0-9０-９ー\-+\s()（）]{10,15}$/;

    return pattern.test(tel);
  }
}