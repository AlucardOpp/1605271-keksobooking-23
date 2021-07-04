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

const getAdRank = (ad) => {
  const housingTypeFilter = document.querySelector('#housing-type');
  const housingPriceFilter = document.querySelector('#housing-price');
  const housingRoomsFilter = document.querySelector('#housing-rooms');
  const housingGuestsFilter = document.querySelector('#housing-guests');
  const allCheckboxFilters = document.querySelectorAll('.map__checkbox');
  const selectedCheckboxFilters = [];
  for (const element of allCheckboxFilters) {
    if (element.checked === true) {
      selectedCheckboxFilters.push(element.value);
    }
  }

  let rank = 0;

  const compareValues = (firstValue, secondValue) => {
    if (firstValue === secondValue) {
      rank++;
    }
  };

  compareValues(ad.offer.type, housingTypeFilter.value);
  compareValues(ad.offer.type, housingPriceFilter.value);
  compareValues(ad.offer.type, housingRoomsFilter.value);
  compareValues(ad.offer.type, housingGuestsFilter.value);

  let adFeaturesLength;
  let filtersSelectedLength;
  if (ad.offer.features) {
    adFeaturesLength = ad.offer.features.length;
  }

  if (selectedCheckboxFilters.length > 0) {
    filtersSelectedLength = selectedCheckboxFilters.length;
  }

  if (ad.offer.features && selectedCheckboxFilters.length > 0) {
    for (let index = 0; index < adFeaturesLength; ++index) {
      const filter = ad.offer.features[index];
      for (let jindex = 0; jindex < filtersSelectedLength; ++jindex) {
        if (filter === selectedCheckboxFilters[jindex]) {
          rank++;
        }
      }
    }
  }

  return rank;
};

const compareAds = (adA, adB) => {
  const rankA = getAdRank(adA);
  const rankB = getAdRank(adB);

  return rankB - rankA;
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
        .sort(compareAds)
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
