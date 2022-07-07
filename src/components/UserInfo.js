export default class UserInfo {
  constructor({ nameUser, jobUser, urlAvatarUser }) {
    this._nameUser = nameUser;
    this._jobUser = jobUser;
    this._urlAvatarUser = urlAvatarUser;
  
  }
  
  getUserInfo() {
    const userInfo = {
      name: this._nameUser.textContent,
      about: this._jobUser.textContent,
      avatar: this._urlAvatarUser.src
    }
  
    return userInfo;
  }
  
  setUserInfo(data) {
    this._nameUser.textContent = data.name;
    this._jobUser.textContent = data.about;
    this._urlAvatarUser.src = data.avatar;
  }
 } 