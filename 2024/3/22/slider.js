import BaseSlider from "./base.js";
class Slider extends BaseSlider {
  constructor(el, options) {
    super(el, options);

    this._bindEvent();
  }

  _bindEvent() {
    document.addEventListener('keyup', ev => {
      // console.log(ev.keyCode);
      if (ev.keyCode === 37) {
        // ←
        this.prev();
      } else if (ev.keyCode === 39) {
        // →
        this.next();
      }
    });
  }
}
export default Slider;