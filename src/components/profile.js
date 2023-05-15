import {
  profileUserName,
  profileUserAbout,
  formInputUserName,
  formInputUserAbout,
  formNames,
  popupEditProfile,
 } from './constants.js';

import { closePopup } from './utils.js';


// Функция для редактирования профиля
  function editProfile() {
    profileUserName.textContent = formInputUserName.value;
    profileUserAbout.textContent = formInputUserAbout.value;
  }

// Функция-обработчик "отправки" формы редактирования профиля
  function editFormSubmitHandler(evt) {
    evt.preventDefault();

    if (evt.target.name === formNames.formEditProfileName) {
      editProfile();
      closePopup(popupEditProfile);
    };
  }

  export {
    editFormSubmitHandler,
  };