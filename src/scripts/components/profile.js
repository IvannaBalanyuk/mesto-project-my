import {
  profileUserName,
  profileUserAbout,
  formInputUserName,
  formInputUserAbout,
  formNames,
  popupEditProfile,
 } from '../components/constants.js';

import { closePopup } from './popup.js';


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