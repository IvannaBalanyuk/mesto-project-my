import {
  profileUserName,
  profileUserAbout,
  profileAvatarImage,
} from './constants.js';


// Отрисовка данных пользователя
const renderProfile = (name, about) => {
  profileUserName.textContent = name;
  profileUserAbout.textContent = about;
}

// Отрисовка аватара
const renderAvatar = (avatar) => {
  profileAvatarImage.src = avatar;
}


export {
  renderProfile,
  renderAvatar,
}
