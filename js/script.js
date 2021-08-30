'use strict';
import sliderView from './views/sliderView.js';
import modalView from './views/modalView.js';
import clothesView from './views/clothesView.js';
import {
  getSliderItems,
  sliderItems,
  clothes,
  getClothes,
  availableImages,
} from './model.js';

const nav = document.querySelector('.nav');
const goToSection = document.querySelector('.nav__links');
const header = document.querySelector('.header');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const clothesRow = document.querySelector('.row');
const btnUpdateDescription = document.querySelector('.btn--updateImage');
const closeModalBtn = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');
const btnRemove = document.querySelector('.btn-remove');
const btnUpdate = document.querySelector('.btn-update');
const btnAddToSlider = document.querySelector('.btn-sliderAdd');
const btnAddImage = document.querySelector('.btn-addImage');
let openModalBtn;

///////////////////////////////////////////////////////////////////////
////////// ADD IMAGE
const addImage = function () {
  clothesView.render(availableImages[0]);
  clothes.push(availableImages[0]);
  availableImages.shift();
  openModalBtn = document.querySelectorAll('.show-modal');
  if (availableImages.length === 0) btnAddImage.classList.add('hidden');
  initiateModal();
};

///////////////////////////////////////////////////////////////////////
////////// DISPLAY SLIDER ITEMS AND CLOTHES

const showSlides = async function () {
  try {
    await getSliderItems();
    sliderItems.forEach(function (item) {
      sliderView.render(item);
    });
  } catch (err) {
    console.error(`Issue showing slides ${err}`);
  }
};

const showClothes = async function () {
  try {
    await getClothes();
    clothes.forEach(function (item) {
      clothes.push(item);
      clothesView.render(item);
    });
  } catch (err) {
    console.error(`Issue showing clothes ${err}`);
  }
};

const displayClothes = function () {
  return new Promise(function (resolve, reject) {
    resolve(showClothes(clothesRow));
    reject(new Error('Could not get clothes'));
  });
};

const initiateSlider = function () {
  return new Promise(function (resolve, reject) {
    resolve(showSlides());
    reject(new Error('Could not get shoes'));
  });
};

const initiateModal = () => {
  openModalBtn = document.querySelectorAll('.show-modal');
  openModalBtn.forEach(el =>
    el.addEventListener('click', function (e) {
      modalView.openModal(e);
    })
  );
};

const init = () => {
  sliderView.goToSlide(0);
  sliderView.createDots();
  sliderView.activateDot(0);
};

///////////////////////////////////////////////////////////////////////
////////////////  STICKY HEADER

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
///////////////  EVENT HANDLERS

goToSection.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

btnAddImage.addEventListener('click', addImage);

///////////////////////////////////////////////////////////////////////
///////////////  SLIDER EVENT HANDLERS

btnRight.addEventListener('click', sliderView.nextSlide.bind(sliderView));
btnLeft.addEventListener('click', sliderView.prevSlide.bind(sliderView));

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') sliderView.prevSlide();
  e.key === 'ArrowRight' && sliderView.nextSlide();
});

sliderView.dotContainer.addEventListener('click', function (e) {
  sliderView.dotClicked(e);
});

///////////////////////////////////////////////////////////////////////
///////////////  MODAL EVENT HANDLERS

closeModalBtn.addEventListener('click', modalView.closeModal.bind(modalView));
overlay.addEventListener('click', modalView.closeModal.bind(modalView));

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnRemove.addEventListener('click', function (e) {
  modalView.removeImage(e);
});

btnUpdate.addEventListener('click', function (e) {
  modalView.updateImage(e);
});

btnUpdateDescription.addEventListener('click', function (e) {
  modalView.updateDescription(e);
});

btnAddToSlider.addEventListener('click', function (e) {
  e.preventDefault();
  const item = clothes.find(
    el => el.src === modalView.currentImage.children[0].src.slice(-17)
  );
  sliderView.addToSlider(item);
  modalView.closeModal();
});

////////////////////////////////////////////////////
//// INITS

initiateSlider().then(() => init());
displayClothes().then(() => {
  initiateModal();
});
