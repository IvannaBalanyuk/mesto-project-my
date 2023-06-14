export default class UserInfo {
  constructor(profileSelectors) {
    this._name = document.querySelector(profileSelectors.nameSelector);
    this._about = document.querySelector(profileSelectors.aboutSelector);
    this._avatar = document.querySelector(profileSelectors.avatarSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      about: this._about.textContent,
    };
    return userInfo;
  }

  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._about.textContent = userData.about;
    this.id = userData._id;
  }

  setAvatar(userData) {
    this._avatar.src = userData.avatar;
  }
}
