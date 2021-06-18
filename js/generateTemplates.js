const mapCanvas = document.querySelector('.map__canvas');
const similarCardTemplate = document.querySelector('#card').content.querySelector('.popup');
const idToNameMap = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const getTypeTranslate = ((type) => {
  const keys = Object.keys(idToNameMap);
  for (let index = 0; index < keys.length; index++) {
    if(type === keys[index]) {
      return idToNameMap[keys[index]];
    }
  }
});

const removeChildrens = ((parent) => {
  for (let index = parent.children.length - 1; index >= 0; index--) {
    parent.children[index].remove();
  }
});

const generateCards = ((data) => {
  data.forEach((card) => {
    const cardElement = similarCardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = `${card.offer.price} ₽/ночь`;
    cardElement.querySelector('.popup__type').textContent = getTypeTranslate(card.offer.type);
    cardElement.querySelector('.popup__text--capacity').textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
    cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;
    const features = cardElement.querySelector('.popup__features');
    removeChildrens(features);
    for (let index = 0; index < card.offer.features.length; index++) {
      const li = document.createElement('li');
      li.classList.add('popup__feature', `popup__feature--${card.offer.features[index]}`);
      features.appendChild(li);
    }
    if(card.offer.description) {
      cardElement.querySelector('.popup__description').textContent = card.offer.description;
    }
    else {
      cardElement.querySelector('.popup__description').remove();
    }
    const photos = cardElement.querySelector('.popup__photos');
    removeChildrens(photos);
    for (let index = 0; index < card.offer.photos.length; index++) {
      const img = document.createElement('img');
      img.classList.add('popup__photo');
      img.width = 45;
      img.height = 40;
      img.alt = 'Фотография жилья';
      img.src = card.offer.photos[index];
      photos.appendChild(img);
    }
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    mapCanvas.appendChild(cardElement);
  });
});

export {generateCards};
