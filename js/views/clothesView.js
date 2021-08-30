class ClothesView {
  #parentEl = document.querySelector('.row');
  #data;

  render(data) {
    this.#data = data;
    const html = this.newClothing(this.#data);
    this.#parentEl.insertAdjacentHTML('afterbegin', html);
  }

  newClothing(item) {
    return `<div class="image">
    <img class = "show-modal" src=${item.src} id = "${item.id}" alt="Jacket" />
    <span class="caption">${item.description}</span>
  </div>`;
  }
}
export default new ClothesView();
