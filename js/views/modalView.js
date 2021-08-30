class ModalView {
  #parentEl = document.querySelector('.modal');
  #overlay = document.querySelector('.overlay');
  imgDescription = document.querySelector('.descr_modal');
  imgDescriptionInput = document.querySelector('.image__description__input');
  currentImage;

  openModal(e) {
    this.currentImage = e.target.closest('.image');
    this.#parentEl.classList.remove('hidden');
    this.#overlay.classList.remove('hidden');
  }

  closeModal() {
    this.#parentEl.classList.add('hidden');
    this.#overlay.classList.add('hidden');
    this.imgDescription.classList.add('hidden');
  }

  updateImage(e) {
    e.preventDefault();
    this.imgDescription.classList.remove('hidden');
  }

  updateDescription(e) {
    e.preventDefault();
    this.currentImage.children[1].textContent = this.imgDescriptionInput.value;
    this.closeModal();
  }

  removeImage(e) {
    e.preventDefault();
    this.currentImage.remove();
    this.closeModal();
  }
}
export default new ModalView();
