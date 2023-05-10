import {
  popupShowImage,
  popupImageElement,
  popupCaptionElement,
 } from '../components/constants.js';

import { openPopup } from '../components/popup.js';


// Функция для формирования модального окна просмотра картинки
  function createPopupShowImage(placeName, imageLink) {
    openPopup(popupShowImage);
    popupImageElement.src = imageLink;
    popupImageElement.alt = placeName;
    popupCaptionElement.textContent = placeName;
  };

  export {
    createPopupShowImage,
  };