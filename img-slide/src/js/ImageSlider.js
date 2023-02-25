export default class ImageSlider {
  #currentPosition = 0; // 현재 슬라이더의 위치
  #slideNumber = 0; // 슬라이드의 개수
  #slideWidth = 0; // 슬라이드의 너비

  sliderWrapEl;
  sliderListEl;
  nextBtnEl;
  previousBtnEl;

  // class에서 인스턴스가 만들어질때 실행되도록 넣어줌
  constructor() {
    this.assignElement();
    this.initSliderNumber();
    this.initSlideWidth();
    this.initSliderListWidth();
    this.addEvent();
  }

  // element 담아둠
  assignElement() {
    this.sliderWrapEl = document.getElementById('slider-wrap'); // #slider-wrap
    this.sliderListEl = this.sliderWrapEl.querySelector('#slider'); // ul#slider
    this.nextBtnEl = this.sliderWrapEl.querySelector('#next'); // button#next
    this.previousBtnEl = this.sliderWrapEl.querySelector('#previous'); // button#previous
  }

  // slideNumber 초기화 메서드
  initSliderNumber() {
    this.#slideNumber = this.sliderListEl.querySelectorAll('li').length;
    // sliderList의 li의 개수가 slideNumber의 값이 된다
  }

  // slideWidth 초기화 메서드
  initSlideWidth() {
    this.#slideWidth = this.sliderListEl.clientWidth;
    // slide의 크기를 sliderWrap의 크기로 초기화
  }

  // sliderListWidth 초기화 메서드
  initSliderListWidth() {
    this.sliderListEl.style.width = `${this.#slideNumber * this.#slideWidth}px`;
    // sliderList의 너비를 slide의 개수에 따라 동적으로 변화시킴
    // slide 개수 * slide의 너비
  }

  // 이벤트 메서드 작성
  addEvent() {
    this.nextBtnEl.addEventListener('click', this.moveToRight.bind(this));
    this.previousBtnEl.addEventListener('click', this.moveToLeft.bind(this));
  }

  moveToRight() {
    this.#currentPosition += 1;
    // 범위제한
    if (this.#currentPosition === this.#slideNumber) {
      this.#currentPosition = 0;
    }
    this.sliderListEl.style.left = `-${
      this.#slideWidth * this.#currentPosition
    }px`;
    // currentPosition의 값에 -1000씩 곱한 값을 ul.slider에 left 값으로 준다.
    // = 왼쪽방향으로 슬라이드 크기만큼 이동시킴
    // 0 > 0 / 1 > -1000 / 2 > -2000 ...
  }

  moveToLeft() {
    this.#currentPosition -= 1;
    // 범위 제한
    if (this.#currentPosition === -1) {
      this.#currentPosition = this.#slideNumber - 1;
    }
    this.sliderListEl.style.left = `-${
      this.#slideWidth * this.#currentPosition
    }px`;
  }
}
