export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    console.log("=== RENDERIZANDO CARTÕES ===");
    const itemsToRender = items || this._items;
    console.log("Quantidade de itens para renderizar:", itemsToRender.length);
    
    itemsToRender.forEach((item) => {
      console.log("Renderizando item:", item);
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.append(element);
  }

  prependItem(element) {
    this._container.prepend(element);
  }
}
