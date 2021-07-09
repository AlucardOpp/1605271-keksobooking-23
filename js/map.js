import {
  formDisable,
  formEnable,
  mapFilters,
  mapFeatures,
  mapFilter
} from './form.js';
import {
  generateCard
} from './generateTemplates.js';
import {
  getData
} from './fetch.js';
import {
  debounce,
  showAlert
} from './utils.js';

const addressInput = document.querySelector('#address');
const SIMILAR_ADS_COUNT = 10;
const RERENDER_DELAY = 500;

const allConditionsAreSatisfied = (ad) => {
  const housingTypeFilter = document.querySelector('#housing-type');
  const housingPriceFilter = document.querySelector('#housing-price');
  const housingRoomsFilter = document.querySelector('#housing-rooms');
  const housingGuestsFilter = document.querySelector('#housing-guests');
  const allCheckboxFilters = document.querySelectorAll('.map__checkbox');
  const selectedCheckboxFilters = [];
  for (const element of allCheckboxFilters) {
    if (element.checked) {
      selectedCheckboxFilters.push(element.value);
    }
  }

  const prices = {
    LOW: 10000,
    HIGH: 50000,
  };

  const rooms = {
    ONEROOM: 1,
    TWOROOMS: 2,
    THREEROOMS: 3,
  };

  const guests = {
    ONEGUEST: 1,
    TWOGUESTS: 2,
    NOTFORGUESTS: 100,
  };

  const checkType = (firstValue, secondValue) => {
    if (firstValue === secondValue) {
      return true;
    } else if (secondValue === 'any') {
      return true;
    } else {
      return false;
    }
  };

  const checkPrice = (firstValue, secondValue) => {
    if (secondValue === 'middle') {
      return firstValue >= prices.LOW && firstValue <= prices.HIGH;
    } else if (secondValue === 'low') {
      return firstValue < prices.LOW;
    } else if (secondValue === 'high') {
      return firstValue >= prices.HIGH;
    } else {
      return true;
    }
  };

  const checkRooms = (firstValue, secondValue) => {
    if (secondValue === '1') {
      return firstValue === rooms.ONEROOM;
    } else if (secondValue === '2') {
      return firstValue === rooms.TWOROOMS;
    } else if (secondValue === '3') {
      return firstValue === rooms.THREEROOMS;
    } else if (secondValue === 'any') {
      return true;
    } else {
      return false;
    }
  };

  const checkGuests = (firstValue, secondValue) => {
    if (secondValue === '2') {
      return firstValue === guests.TWOGUESTS;
    } else if (secondValue === '1') {
      return firstValue === guests.ONEGUEST;
    } else if (secondValue === '0') {
      return firstValue >= guests.NOTFORGUESTS;
    } else if (secondValue === 'any') {
      return true;
    } else {
      return false;
    }
  };

  const isFeatureInclude = (elem) => ad.offer.features.includes(elem);

  const checkFeatures = (adFeatures, checkboxFilters) => {
    if (adFeatures && checkboxFilters.length > 0) {
      if (checkboxFilters.every(isFeatureInclude)) {
        return true;
      } else {
        return false;
      }
    } else if (checkboxFilters.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  if (!checkType(ad.offer.type, housingTypeFilter.value)) {
    return false;
  }
  if (!checkPrice(ad.offer.price, housingPriceFilter.value)) {
    return false;
  }
  if (!checkRooms(ad.offer.rooms, housingRoomsFilter.value)) {
    return false;
  }
  if (!checkGuests(ad.offer.guests, housingGuestsFilter.value)) {
    return false;
  }
  if (!checkFeatures(ad.offer.features, selectedCheckboxFilters)) {
    return false;
  }

  return true;
};

const conditionsFilter = (elem) => allConditionsAreSatisfied(elem);

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

const markerGroup = L.layerGroup().addTo(map);


const getAds = () => {
  getData(
    (ads) => {
      ads
        .slice()
        .filter(conditionsFilter)
        .slice(0, SIMILAR_ADS_COUNT)
        .forEach((item) => {
          const marker = L.marker({
            lat: item.location.lat,
            lng: item.location.lng,
          }, {
            icon: similarIcon,
          });
          marker
            .addTo(markerGroup)
            .bindPopup(generateCard(item));
        });
      if (mapFilters.classList.contains('map__filters--disabled')) {
        mapFilters.classList.remove('map__filters--disabled');
        mapFeatures.disabled = false;
        for (const element of mapFilter) {
          element.disabled = false;
        }
      }
    },
    () => {
      showAlert('При загрузке данных с сервера произошла ошибка запроса');
    },
  );
};

getAds();

const filterAds = (cb) => {
  mapFilters.addEventListener('change', () => {
    if (markerGroup._layers) {
      markerGroup.clearLayers();
    }
    cb();
  });
};

filterAds(debounce(() => getAds(), RERENDER_DELAY));

export {
  map,
  mainPinMarker
};
