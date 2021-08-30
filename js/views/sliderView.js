class SliderView {
  #parentEl = document.querySelector('.slider');
  dotContainer = document.querySelector('.dots');
  currentSlide = 0;
  #data;
  #slides;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) return;
    this.#data = data;
    const slide = this.newSlide(this.#data);
    this.#parentEl.insertAdjacentHTML('afterbegin', slide);
    this.#slides = document.querySelectorAll('.slide');
  }

  newSlide(item) {
    return `<div class="slide">
        <h2 class="slider__header">${item.brand}</h2>
        <img src=${item.src} alt="Photo 1" />
        <div class="media-body">
          <h5 class="caption">Description</h5>
          <p>${item.description}</p>
          <a href="#" class="stretched-link">Our page.</a>
        </div>
      </div>`;
  }

  addToSlider(item) {
    this.render(item);
    this.addDotToSlide();
    this.goToSlide(0);
    this.activateDot(0);
  }

  ///////////////////////////////////////////////////////////////////////
  //////SLIDER FUNCTIONS

  goToSlide = slide => {
    this.#slides.forEach((s, index) => {
      s.style.transform = `translateX(${120 * (index - slide)}%)`;
    });
  };

  nextSlide() {
    if (this.currentSlide !== this.#slides.length - 1) this.currentSlide++;
    else this.currentSlide = 0;
    this.goToSlide(this.currentSlide);
    this.activateDot(this.currentSlide);
  }

  prevSlide() {
    if (this.currentSlide === 0) {
      this.currentSlide = this.#slides.length - 1;
    } else this.currentSlide--;

    this.goToSlide(this.currentSlide);
    this.activateDot(this.currentSlide);
  }

  createDots() {
    this.#slides.forEach((s, i) => {
      this.dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  }

  dotClicked(e) {
    if (e.target.classList.contains('dots__dot')) {
      const [slide] = e.target.dataset.slide;
      this.goToSlide(slide);
      this.activateDot(slide);
    }
  }

  addDotToSlide() {
    this.dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${
        this.#slides.length - 1
      }"></button>`
    );
  }

  activateDot(slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  }
}
export default new SliderView();
