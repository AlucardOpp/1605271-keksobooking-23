const getRandomPositiveInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.floor(Math.random() * (upper - lower + 1) + lower);
  return result;
};

const getRandomPositiveFloat = (min, max, digits = 1) => {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));
  const result = (Math.random() * (upper - lower) + lower).toFixed(digits);
  return result;
};

const ESTATES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const getRandomAd = () => ({
  author: {
    avatar: `img/avatars/user${0}${getRandomPositiveInteger(1, 8)}.png`,
  },
  offer: {
    title: 'Заголовок предложения',
    address: `${getRandomPositiveFloat(35.65000, 35.70000, 5)},${getRandomPositiveFloat(139.70000, 139.80000, 5)}`,
    price: getRandomPositiveInteger(5000, 15000),
    type: ESTATES[getRandomPositiveInteger(0, 4)],
    rooms: getRandomPositiveInteger(1, 5),
    guests: getRandomPositiveInteger(0, 5),
    checkin: `1${getRandomPositiveInteger(2, 4)}:00`,
    checkout: `1${getRandomPositiveInteger(2, 4)}:00`,
    features: new Array(getRandomPositiveInteger(1, 6)).fill(null).map((value, index) => FEATURES[index]),
    description: 'Красивое помещение',
    photos: new Array(getRandomPositiveInteger(1, 10)).fill(null).map(() => PHOTOS[getRandomPositiveInteger(0, 2)]),
  },
  location: {
    lat: getRandomPositiveFloat(35.65000, 35.70000, 5),
    lng: getRandomPositiveFloat(139.70000, 139.80000, 5),
  },
});

const ads = new Array(10).fill(null).map(() => getRandomAd());

console.log(ads);
