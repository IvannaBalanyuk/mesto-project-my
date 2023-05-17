import {
  profileUserName,
  profileUserAbout,
  profileAvatarImage,
  popupEditProfile,
  popupChangeAvatar,
  formInputUserName,
  formInputUserAbout,
  formInputAvatarLink,
} from './constants.js';

import {
  getProfileData,
  patchProfileData,
  patchAvatarData,
} from './api.js';

import {
  closePopup,
} from './utils.js';


// Добавление на страницу информации о пользователе с сервера
  const renderUploadedProfile = () => {
    getProfileData()
    .then((profileData) => {
      profileUserName.textContent = profileData.name;
      profileUserAbout.textContent = profileData.about;
      profileAvatarImage.src = profileData.avatar;
    })
  }

// Отрисовка данных пользователя на странице
  const renderProfileInfo = () => {
    profileUserName.textContent = formInputUserName.value;
    profileUserAbout.textContent = formInputUserAbout.value;
  }

// Обработчик "отправки" формы редактирования профиля
  const editFormSubmitHandler = (evt) => {
    evt.preventDefault();
    renderProfileInfo();
    patchProfileData(formInputUserName.value, formInputUserAbout.value);
    closePopup(popupEditProfile);
  }

// Отрисовка обновленного аватара на странице
  const renderNewAvatar = () => {
    profileAvatarImage.src = formInputAvatarLink.value;
  }

// Обработчик "отправки" формы обновления аватара
  const changeFormSubmitHandler = (evt) => {
    evt.preventDefault();
    renderNewAvatar();
    patchAvatarData(formInputAvatarLink.value);
    closePopup(popupChangeAvatar);
  }


export {
  renderUploadedProfile,
  editFormSubmitHandler,
  changeFormSubmitHandler,
}