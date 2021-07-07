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
  let typeFilterIsTrue;
  let priceFilterIsTrue;
  let roomFilterIsTrue;
  let guestsFilterIsTrue;
  let allCheckboxFiltersAreTrue;

  const checkType = (firstValue, secondValue) => {
    if (firstValue === secondValue) {
      typeFilterIsTrue = true;
    } else if (secondValue === 'any') {
      typeFilterIsTrue = true;
    } else {
      typeFilterIsTrue = false;
    }
  };

  const checkPrice = (firstValue, secondValue) => {
    if (secondValue === 'middle') {
      if (firstValue >= 10000 && firstValue <= 50000) {
        priceFilterIsTrue = true;
      } else {
        priceFilterIsTrue = false;
      }
    } else if (secondValue === 'low') {
      if (firstValue < 10000) {
        priceFilterIsTrue = true;
      } else {
        priceFilterIsTrue = false;
      }
    } else if (secondValue === 'high') {
      if (firstValue >= 50000) {
        priceFilterIsTrue = true;
      } else {
        priceFilterIsTrue = false;
      }
    } else {
      priceFilterIsTrue = true;
    }
  };

  const checkRooms = (firstValue, secondValue) => {
    if (secondValue === '1') {
      if (firstValue === 1) {
        roomFilterIsTrue = true;
      } else {
        roomFilterIsTrue = false;
      }
    } else if (secondValue === '2') {
      if (firstValue === 2) {
        roomFilterIsTrue = true;
      } else {
        roomFilterIsTrue = false;
      }
    } else if (secondValue === '3') {
      if (firstValue === 3) {
        roomFilterIsTrue = true;
      } else {
        roomFilterIsTrue = false;
      }
    } else if (secondValue === 'any') {
      roomFilterIsTrue = true;
    } else {
      roomFilterIsTrue = false;
    }
  };

  const checkGuests = (firstValue, secondValue) => {
    if (secondValue === '2') {
      if (firstValue === 2) {
        guestsFilterIsTrue = true;
      } else {
        guestsFilterIsTrue = false;
      }
    } else if (secondValue === '1') {
      if (firstValue === 1) {
        guestsFilterIsTrue = true;
      } else {
        guestsFilterIsTrue = false;
      }
    } else if (secondValue === '0') {
      if (firstValue >= 100) {
        guestsFilterIsTrue = true;
      } else {
        guestsFilterIsTrue = false;
      }
    } else if (secondValue === 'any') {
      guestsFilterIsTrue = true;
    } else {
      guestsFilterIsTrue = false;
    }
  };

  checkType(ad.offer.type, housingTypeFilter.value, typeFilterIsTrue);
  checkPrice(ad.offer.price, housingPriceFilter.value, priceFilterIsTrue);
  checkRooms(ad.offer.rooms, housingRoomsFilter.value, roomFilterIsTrue);
  checkGuests(ad.offer.guests, housingGuestsFilter.value, guestsFilterIsTrue);

  if (ad.offer.features && selectedCheckboxFilters.length > 0) {
    for (const filter of selectedCheckboxFilters) {
      if (ad.offer.features.includes(filter)) {
        allCheckboxFiltersAreTrue = true;
      } else {
        allCheckboxFiltersAreTrue = false;
        break;
      }
    }
  } else if (selectedCheckboxFilters.length > 0) {
    allCheckboxFiltersAreTrue = false;
  } else {
    allCheckboxFiltersAreTrue = true;
  }

  const allFilters = [typeFilterIsTrue, priceFilterIsTrue, roomFilterIsTrue, guestsFilterIsTrue, allCheckboxFiltersAreTrue];
  let selectsAreTrue;
  for (const item of allFilters) {
    if (item === true) {
      selectsAreTrue = true;
    } else {
      selectsAreTrue = false;
      break;
    }
  }

  return selectsAreTrue;
};

const conditionsFilter = (elem) => {
  if (allConditionsAreSatisfied(elem)) {
    return true;
  } else {
    return false;
  }
};


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
