'use strict';
import sliderView from './views/sliderView.js';
import modalView from './views/modalView.js';
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

btnRemove.addEventListener('click', function (e) {
  modalView.removeImage(e);
});
btnAddImage.addEventListener('click', addImage);
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

///////////////////////////////////////////////////////////////////////
////////// DISPLAY SLIDER ITEMS AND CLOTHES

const showSlides = async function () {
  await getSliderItems();
  sliderItems.forEach(function (item) {
    sliderView.render(item);
  });
};

const showClothes = async function (parentEl) {
  await getClothes();
  clothes.forEach(function (item) {
    clothes.push(item);
    const html = newClothing(item);
    parentEl.insertAdjacentHTML('afterbegin', html);
  });
};

const init = () => {
  sliderView.goToSlide(0);
  sliderView.createDots();
  sliderView.activateDot(0);
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

goToSection.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

btnRight.addEventListener('click', sliderView.nextSlide.bind(sliderView));
btnLeft.addEventListener('click', sliderView.prevSlide.bind(sliderView));

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});

sliderView.dotContainer.addEventListener('click', function (e) {
  sliderView.dotClicked(e);
});

closeModalBtn.addEventListener('click', modalView.closeModal.bind(modalView));
overlay.addEventListener('click', modalView.closeModal.bind(modalView));

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
