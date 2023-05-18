import {
  submitValues,
  profileUserName,
  profileUserAbout,
  profileAvatarImage,
  popupEditProfile,
  popupChangeAvatar,
  formEditProfile,
  formChangeAvatar,
  formInputUserName,
  formInputUserAbout,
  formInputAvatarLink,
} from './constants.js';

import {
  closePopup,
  renderLoading,
} from './utils.js';

import {
  getProfileData,
  patchProfileData,
  patchAvatarData,
} from './api.js';


// Добавление на страницу информации о пользователе с сервера
  const renderUploadedProfile = () => {
    getProfileData()
      .then((data) => {
        return data;
      })
      .then((profileData) => {
        profileUserName.textContent = profileData.name;
        profileUserAbout.textContent = profileData.about;
        profileAvatarImage.src = profileData.avatar;
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

// Отрисовка данных пользователя на странице
  const renderProfileInfo = () => {
    profileUserName.textContent = formInputUserName.value;
    profileUserAbout.textContent = formInputUserAbout.value;
  }

// Обработчик "отправки" формы редактирования профиля
  const editFormSubmitHandler = (evt) => {
    evt.preventDefault();
    renderLoading(true, formEditProfile, submitValues.saving, submitValues.save);

    patchProfileData(formInputUserName.value, formInputUserAbout.value)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        renderLoading(false, formEditProfile, submitValues.saving, submitValues.save);
      });

    renderProfileInfo();
    closePopup(popupEditProfile);
  }

// Отрисовка обновленного аватара на странице
  const renderNewAvatar = () => {
    profileAvatarImage.src = formInputAvatarLink.value;
  }

// Обработчик "отправки" формы обновления аватара
  const changeFormSubmitHandler = (evt) => {
    evt.preventDefault();
    renderLoading(true, formChangeAvatar, submitValues.saving, submitValues.save);

    patchAvatarData(formInputAvatarLink.value)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        renderLoading(false, formChangeAvatar, submitValues.saving, submitValues.save);
      });

    renderNewAvatar();
    closePopup(popupChangeAvatar);
  }


export {
  renderUploadedProfile,
  editFormSubmitHandler,
  changeFormSubmitHandler,
}
