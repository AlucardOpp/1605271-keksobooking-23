import {
  formDisable,
  formEnable
} from './form.js';
import {
  getRandomAd
} from './random-ad.js';
import {
  generateCard
} from './generateTemplates.js';

const ads = new Array(4).fill(null).map(() => getRandomAd());
const addressInput = document.querySelector('#address');

formDisable();

const map = L.map('map-canvas')
  .on('load', () => {
    formEnable();
  })
  .setView({
    lat: 35.6895000,
    lng: 139.6917100,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker({
  lat: 35.6895000,
  lng: 139.6917100,
}, {
  draggable: true,
  icon: mainPinIcon,
});

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const latlng = evt.target.getLatLng();
  addressInput.value = `${(latlng.lat).toFixed(5)}, ${(latlng.lng).toFixed(5)}`;
});

const similarIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

ads.forEach((item) => {
  const marker = L.marker({
    lat: item.location.lat,
    lng: item.location.lng,
  }, {
    icon: similarIcon,
  });

  marker
    .addTo(map)
    .bindPopup(generateCard(item));
});

export {
  map
};
