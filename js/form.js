import {
  disableElements,
  enableElements,
  processSuccessAlert,
  processErrorAlert,
  resetTwoForms
} from './utils.js';
import {
  sendData
} from './fetch.js';

const adForm = document.querySelector('.ad-form');
const adFormHeader = document.querySelector('.ad-form-header');
const adFormElement = document.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');
const mapFeatures = document.querySelector('.map__features');
const mapFilter = document.querySelectorAll('.map__filter');
const adTitle = document.querySelector('#title');
const adFormSubmit = document.querySelector('.ad-form__submit');
const adFormPrice = document.querySelector('#price');
const adAddress = document.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;
const NUMBERS = /[0-9]/;
const roomNumberSelect = document.querySelector('#room_number');
const capacitySelect = document.querySelector('#capacity');
const typeSelect = document.querySelector('#type');
const timeInSelect = document.querySelector('#timein');
const timeOutSelect = document.querySelector('#timeout');
const optionsCapacity = capacitySelect.querySelectorAll('option');
const optionsTimeOut = timeOutSelect.querySelectorAll('option');
const optionsTimeIn = timeInSelect.querySelectorAll('option');
const allInputs = document.querySelectorAll('input');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const requiredInputs = [];

for (const element of allInputs) {
  if (element.required) {
    requiredInputs.push(element);
  }
}

const idToMinPriceMap = {
  flat: '1000',
  bungalow: '0',
  house: '5000',
  palace: '10000',
  hotel: '3000',
};

const formDisable = () => {
  adForm.classList.add('ad-form--disabled');
  adFormHeader.disabled = true;
  for (const element of adFormElement) {
    element.disabled = true;
  }
  mapFilters.classList.add('map__filters--disabled');
  mapFeatures.disabled = true;
  for (const element of mapFilter) {
    element.disabled = true;
  }
};

const formEnable = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormHeader.disabled = false;
  for (const element of adFormElement) {
    element.disabled = false;
  }
};

adTitle.addEventListener('input', () => {
  const valueLength = adTitle.value.length;
  if (valueLength === 0) {
    adTitle.setCustomValidity('Обязательное поле');
  } else if (valueLength < MIN_TITLE_LENGTH) {
    adTitle.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    adTitle.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    adTitle.setCustomValidity('');
  }
  if (valueLength > 0 && adTitle.classList.contains('ad-form__element--required')) {
    adTitle.classList.remove('ad-form__element--required');
  }
  adTitle.reportValidity();
});

adFormPrice.addEventListener('input', () => {
  const inputValue = adFormPrice.value;
  const valueLength = adFormPrice.value.length;
  if (inputValue > MAX_PRICE_VALUE) {
    adFormPrice.setCustomValidity('Максимальная цена 1 млн. руб.');
  } else if (!inputValue) {
    adFormPrice.setCustomValidity('Обязательное поле');
  } else if (!NUMBERS.test(inputValue)) {
    adFormPrice.setCustomValidity('В данном поле требуются только цифры');
  } else {
    adFormPrice.setCustomValidity('');
  }
  if (valueLength > 0 && adFormPrice.classList.contains('ad-form__element--required')) {
    adFormPrice.classList.remove('ad-form__element--required');
  }
  adFormPrice.reportValidity();
});

adAddress.addEventListener('input', () => {
  const valueLength = adAddress.value.length;
  if (valueLength === 0) {
    adAddress.setCustomValidity('Обязательное поле');
  } else {
    adAddress.setCustomValidity('');
  }
  if (valueLength > 0 && adAddress.classList.contains('ad-form__element--required')) {
    adAddress.classList.remove('ad-form__element--required');
  }
  adAddress.reportValidity();
});

roomNumberSelect.addEventListener('change', (evt) => {
  if (evt.target.value === '1') {
    disableElements(optionsCapacity);
    optionsCapacity[2].disabled = false;
    optionsCapacity[2].selected = true;
  } else if (evt.target.value === '2') {
    disableElements(optionsCapacity);
    optionsCapacity[2].disabled = false;
    optionsCapacity[1].disabled = false;
    optionsCapacity[1].selected = true;
  } else if (evt.target.value === '3') {
    enableElements(optionsCapacity);
    optionsCapacity[3].disabled = true;
    optionsCapacity[0].selected = true;
  } else {
    disableElements(optionsCapacity);
    optionsCapacity[3].disabled = false;
    optionsCapacity[3].selected = true;
  }
});

adFormSubmit.addEventListener('click', () => {
  for (const input of requiredInputs) {
    if (!input.checkValidity()) {
      input.classList.add('ad-form__element--required');
    }
  }
});

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendData(
    () => processSuccessAlert(successTemplate, adForm, mapFilters),
    () => processErrorAlert(errorTemplate),
    new FormData(evt.target),
  );
});

resetButton.addEventListener('click', () => {
  resetTwoForms(adForm, mapFilters);
});

typeSelect.addEventListener('change', (evt) => {
  adFormPrice.min = idToMinPriceMap[evt.target.value];
  adFormPrice.placeholder = idToMinPriceMap[evt.target.value];
});

timeInSelect.addEventListener('change', (evt) => {
  for (const option of optionsTimeOut) {
    option.selected = (evt.target.value === option.value);
  }
});

timeOutSelect.addEventListener('change', (evt) => {
  for (const option of optionsTimeIn) {
    option.selected = (evt.target.value === option.value);
  }
});

export {
  formDisable,
  formEnable,
  mapFilters,
  mapFeatures,
  mapFilter
};
