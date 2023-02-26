export default class ImageSlider {
  #currentPosition = 0; // 현재 슬라이더의 위치
  #slideNumber = 0; // 슬라이드의 개수
  #slideWidth = 0; // 슬라이드의 너비

  sliderWrapEl;
  sliderListEl;
  nextBtnEl;
  previousBtnEl;
  indicatorWrapEl;

  // class에서 인스턴스가 만들어질때 실행되도록 넣어줌
  constructor() {
    // 이벤트가 실행되는 순서가 중요함.
    // 선언을 가장 상위에 작성할것.
    this.assignElement();
    this.initSliderNumber();
    this.initSlideWidth();
    this.initSliderListWidth();
    this.addEvent();
    this.createIndicator();
    this.setIndicator();
  }

  // element 담아둠
  assignElement() {
    this.sliderWrapEl = document.getElementById('slider-wrap'); // #slider-wrap
    this.sliderListEl = this.sliderWrapEl.querySelector('#slider'); // ul#slider
    this.nextBtnEl = this.sliderWrapEl.querySelector('#next'); // button#next
    this.previousBtnEl = this.sliderWrapEl.querySelector('#previous'); // button#previous
    this.indicatorWrapEl = this.sliderWrapEl.querySelector('#indicator-wrap'); // div#indicator-wrap
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
    this.indicatorWrapEl.addEventListener(
      'click',
      this.onClickIndicator.bind(this),
    );
  }

  // 클릭시 해당 인덱스의 슬라이드로 이동
  onClickIndicator(event) {
    const indexPosition = parseInt(event.target.dataset.index, 10);

    if (Number.isInteger(indexPosition)) {
      this.#currentPosition = indexPosition;
      this.sliderListEl.style.left = `-${
        this.#slideWidth * this.#currentPosition
      }px`;
      this.setIndicator();
    }
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

    this.setIndicator(); // 인덱스가 변화할때마다 인디케이터 활성화 셋팅
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

    this.setIndicator(); // 인덱스가 변화할때마다 인디케이터 활성화 셋팅
  }

  // 동적으로 인디케이터 생성
  createIndicator() {
    // 여러개의 엘리먼트를 추가할때 사용. 렌더되지 않는다.
    // 결과적으로 ul 안에 들어가는 것들은 li들 뿐.
    const docFragment = document.createDocumentFragment();
    for (let i = 0; i < this.#slideNumber; i += 1) {
      const li = document.createElement('li');
      li.dataset.index = i;
      docFragment.appendChild(li);
    }
    this.indicatorWrapEl.querySelector('ul').appendChild(docFragment);
  }

  // 인디케이터 활성화 메서드
  setIndicator() {
    // index 전체 활성화 없음
    // index에 따라서 활성화
    this.indicatorWrapEl.querySelector('li.active')?.classList.remove('active');
    this.indicatorWrapEl
      .querySelector(`ul li:nth-child(${this.#currentPosition + 1})`)
      .classList.add('active');
  }
}
