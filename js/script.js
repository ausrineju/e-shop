'use strict';
// import {
//   slider,
//   slides,
//   newSlide,
//   addToSlider,
//   nextSlide,
//   prevSlide,
//   init,
// } from './slider.js';
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');
const clothesRow = document.querySelector('.row');
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');
const btnRemove = document.querySelector('.btn-remove');
const btnUpdate = document.querySelector('.btn-update');
const btnAddToSlider = document.querySelector('.btn-sliderAdd');
const btnAddImage = document.querySelector('.btn-addImage');
const imgDescription = document.querySelector('.descr_modal');
const imgDescriptionInput = document.querySelector(
  '.image__description__input'
);
const availableImages = [
  {
    id: 'clothes-4',
    src: 'img/clothes-5.jpg',
    brand: 'Nike',
    description: 'Lorem ipsum lorem ipsum lorem ipsum',
  },
  {
    id: 'clothes-5',
    src: 'img/clothes-6.jpg',
    brand: 'Nike',
    description: 'Lorem ipsum lorem ipsum lorem ipsum',
  },
  {
    id: 'clothes-6',
    src: 'img/clothes-7.jpg',
    brand: 'Nike',
    description: 'Lorem ipsum lorem ipsum lorem ipsum',
  },
  {
    id: 'clothes-7',
    src: 'img/clothes-8.jpg',
    brand: 'Nike',
    description: 'Lorem ipsum lorem ipsum lorem ipsum',
  },
  {
    id: 'clothes-8',
    src: 'img/clothes-9.jpg',
    brand: 'Nike',
    description: 'Lorem ipsum lorem ipsum lorem ipsum',
  },
];
let currentImage;
let openModalBtn;
let images = document.getElementsByClassName('image');
let slides;
let clothes = [];
let sliderItems = [];

///////////////////////////////
////// ADD NEW SLIDE
const newSlide = item => {
  return `<div class="slide">
      <h2 class="slider__header">${item.brand}</h2>
      <img src=${item.src} alt="Photo 1" />
      <div class="media-body">
        <h5 class="caption">Description</h5>
        <p>${item.description}</p>
        <a href="#" class="stretched-link">Our page.</a>
      </div>
    </div>`;
};

///////////////////////////////
////// ADD NEW CLOTHING ITEM
const newClothing = item => {
  return `<div class="image">
  <img class = "show-modal" src=${item.src} id = "${item.id}" alt="Jacket" />
  <span class="caption">${item.description}</span>
</div>`;
};

///////////////////////////////
/// ADD NEW IMAGE
const addImage = function () {
  const html = newClothing(availableImages[0]);
  clothes.push(availableImages[0]);
  clothesRow.insertAdjacentHTML('afterbegin', html);
  availableImages.shift();
  openModalBtn = document.querySelectorAll('.show-modal');
  if (availableImages.length === 0) btnAddImage.classList.add('hidden');
  initiateModal();
};

///////////////////////////////////////////////////////////////////////
//// UPDATE IMAGE
const updateImage = function (e) {
  e.preventDefault();
  imgDescription.classList.remove('hidden');
  document
    .querySelector('.btn--updateImage')
    .addEventListener('click', function (e) {
      e.preventDefault();
      currentImage.children[1].textContent = imgDescriptionInput.value;
      closeModal();
    });
};

///////////////////////////////////////////////////////////////////////
//// REMOVE IMAGE

const removeImage = function (e) {
  e.preventDefault();
  currentImage.remove();
  closeModal();
};

///////////////////////////////////////////////////////////////////////
//// ADD IMAGE TO SLIDER
const addToSlider = function (e) {
  e.preventDefault();
  const item = clothes.find(
    el => el.src === currentImage.children[0].src.slice(-17)
  );
  const html = newSlide(item);
  slider.insertAdjacentHTML('afterbegin', html);
  slides = document.querySelectorAll('.slide');
  addDotToSlide();
  closeModal();
  goToSlide(0);
  activateDot(0);
};

btnRemove.addEventListener('click', removeImage);
btnAddToSlider.addEventListener(
  'click',
  addToSlider.bind([clothes, currentImage])
);
btnAddImage.addEventListener('click', addImage);
btnUpdate.addEventListener('click', updateImage);

///////////////////////////////////////////////////////////////////////
/////////// MODAL WINDOW
const openModal = function (e) {
  currentImage = e.target.closest('.image');
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  imgDescription.classList.add('hidden');
};

///////////////////////////////////////////////////////////////////////
////////// FETCH PAGE DATA
const getJSON = function (url) {
  return fetch(url).then(resp => {
    if (!resp.ok) throw new Error(`No items found ${resp.status}`);
    return resp.json();
  });
};

const getSliderItems = async function (parentEl) {
  const data = await getJSON('http://localhost:3000/sliderItems');
  data.forEach(function (item) {
    sliderItems.push(item);
    const html = newSlide(item);

    parentEl.insertAdjacentHTML('afterbegin', html);
  });
  slides = document.querySelectorAll('.slide');
};

const getClothes = async function () {
  const data = await getJSON('http://localhost:3000/clothes');
  data.forEach(function (item) {
    clothes.push(item);
    const html = newClothing(item);
    clothesRow.insertAdjacentHTML('afterbegin', html);
  });
};

///////////////////////////////////////////////////////////////////////
//////SLIDER FUNCTIONS
let currentSlide = 0;
const goToSlide = slide => {
  slides.forEach((s, index) => {
    s.style.transform = `translateX(${120 * (index - slide)}%)`;
  });
};

const nextSlide = () => {
  if (currentSlide !== slides.length - 1) currentSlide++;
  else currentSlide = 0;
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

const prevSlide = () => {
  if (currentSlide === 0) {
    currentSlide = slides.length - 1;
  } else currentSlide--;

  goToSlide(currentSlide);
  activateDot(currentSlide);
};

const createDots = function () {
  slides.forEach(function (s, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const addDotToSlide = function () {
  dotContainer.insertAdjacentHTML(
    'beforeend',
    `<button class="dots__dot" data-slide="${slides.length - 1}"></button>`
  );
};

const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

const init = () => {
  goToSlide(0);
  createDots();
  activateDot(0);
};

const displayClothes = function () {
  return new Promise(function (resolve, reject) {
    resolve(getClothes());
    reject(new Error('Could not get clothes'));
  });
};

const initiateSlider = function () {
  return new Promise(function (resolve, reject) {
    resolve(getSliderItems(slider));
    reject(new Error('Could not get shoes'));
  });
};

const initiateModal = () => {
  openModalBtn = document.querySelectorAll('.show-modal');
  openModalBtn.forEach(el => el.addEventListener('click', openModal));
};

///////////////////////////////////////////////////////////////////////
////STICKY HEADER
const obsCallback = entries => {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const navHeight = nav.getBoundingClientRect().height;
const obsOptions = { root: null, threshold: 0, rootMargin: `-${navHeight}px` };

const headerObserver = new IntersectionObserver(obsCallback, obsOptions);

headerObserver.observe(header);

///////////////////////////////////////////////////////////////////////
//  EVENT HANDLERS
initiateSlider().then(() => init());
displayClothes().then(() => {
  initiateModal();
});

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const [slide] = e.target.dataset.slide;
    goToSlide(slide);
    activateDot(slide);
  }
});

closeModalBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
