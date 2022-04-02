const editBtnProfile = document.querySelector('#profile__edit-button'); //Кнопка открытия окна редактирования профиля
const clsBtnProfile = document.querySelector('#form-edit-profile__close-icon'); //Кнопка закрытия окна редактирования профиля
const addBtnItem = document.querySelector('#profile__add-button'); //Кнопка открытия добавления карточки
const clsBtnItem = document.querySelector('#form-new-item__close-icon'); //Кнопка закрытия добавления карточки
const deleteButton = document.querySelector('#item__btn-delete'); //Кнопка удаления карточки "Корзина"


//Откроем окно редактирования профиля
editBtnProfile.addEventListener( "click" , () => 
  document.getElementById('popup-edit-profile').classList.add('popup_opened'));

//При открытии окна редактирования профиля поля должны содержать информацию из данных (Имя) и (Специальность)





//Закроем окно редактирования профиля кликом на крестик
clsBtnProfile.addEventListener( "click" , () => 
  document.getElementById('popup-edit-profile').classList.remove('popup_opened'));


//Откроем окно добавления карточки
addBtnItem.addEventListener( "click" , () => 
  document.getElementById('popup-add-item').classList.add('popup_opened'));


//Закроем окно добавления карточки кликом на крестик
clsBtnItem.addEventListener( "click" , () => 
  document.getElementById('popup-add-item').classList.remove('popup_opened'));

//Создадим карточку на примере добавления песни в тренажере
/*function addItem(artistValue, titleValue) {
  
  const trackContainer = document.createElement('div');
  trackContainer.classList.add('song');
  
  const artistElement = document.createElement('h4');
  artistElement.classList.add('song__artist');
  artistElement.textContent = artistValue;
  
  const titleElement = document.createElement('h4');
  titleElement.classList.add('song__title');
  titleElement.textContent = titleValue;
  
  const likeButtonElement = document.createElement('button');
  likeButtonElement.classList.add('song__like');

  trackContainer.append(artistElement, titleElement, likeButtonElement); //Собираем элемент trackContainer
  songsContainer.append(trackContainer); //Добавляем собранный элемент в конец songsContainer
}

addButton.addEventListener('click', function () {
  const artist = document.querySelector('.input__text_type_artist');
  const title = document.querySelector('.input__text_type_title');

  addSong(artist.value, title.value);
  renderHasSongs();

  artist.value = '';
  title.value = '';
});
*/

//Удаляем карточку (Пример с песнями - удаляет всё 1 кнопкой - переделать на удаление КАЖДОГО ЭЛЕМЕНТА)
/*
resetButton.addEventListener('click', function () {
  const songs = document.querySelectorAll('.song');
  
  for (let i = 0; i < songs.length; i++){
    songs[i].remove();
  }
  
});*/
/*
deleteButton.addEventListener('click', function () {

  const galleryItems = deleteButton.closest('.item');

  galleryItems.remove();
});*/

deleteButton.addEventListener('click', function () {

  const galleryItems = deleteButton.closest('.item');

  galleryItems.remove();

});