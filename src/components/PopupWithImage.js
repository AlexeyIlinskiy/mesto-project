import Popup from './Popup.js';
 
export default class PopupWithImage extends Popup {
  constructor (popup, data) {
    super(popup);
    this._image = data;
    this._imgBigSize = document.querySelector('.img-popup__img');
    this._imgPopupCaption = document.querySelector('.img-popup__caption');
  }
 
  open () {
    this._imgBigSize.src = this._image.link;
    this._imgBigSize.alt = this._image.name;
    this._imgPopupCaption.textContent = this._image.name;
    super.open();
  }
}
