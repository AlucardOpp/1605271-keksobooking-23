import {
  disableElements,
  enableElements,
  findSelected
} from './utils.js';

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
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;
const NUMBERS = /[0-9]/;
const selectRoomNumber = document.querySelector('#room_number');
const selectCapacity = document.querySelector('#capacity');
const optionsCapacity = selectCapacity.querySelectorAll('option');
const selectedRoomNumber = findSelected(selectRoomNumber);
const allInputs = document.querySelectorAll('input');
const requiredInputs = [];

for (const element of allInputs) {
  if (element.required === true) {
    requiredInputs.push(element);
  }
}

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
  mapFilters.classList.remove('map__filters--disabled');
  mapFeatures.disabled = false;
  for (const element of mapFilter) {
    element.disabled = false;
  }
};

adTitle.addEventListener('input', () => {
  const valueLength = adTitle.value.length;
  const inputValue = adTitle.value;
  if (!inputValue) {
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
  const inputValue = adAddress.value;
  const valueLength = adAddress.value.length;
  if (!inputValue) {
    adAddress.setCustomValidity('Обязательное поле');
  } else {
    adAddress.setCustomValidity('');
  }
  if (valueLength > 0 && adAddress.classList.contains('ad-form__element--required')) {
    adAddress.classList.remove('ad-form__element--required');
  }
  adAddress.reportValidity();
});

if (selectedRoomNumber.value === '1') {
  for (const option of optionsCapacity) {
    option.disabled = true;
  }
  optionsCapacity[2].disabled = false;
  optionsCapacity[2].selected = true;
}

selectRoomNumber.addEventListener('change', (evt) => {
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
  for (const elementInput of requiredInputs) {
    const input = elementInput;
    if (input.checkValidity() === false) {
      input.classList.add('ad-form__element--required');
    }
  }
});

export {
  formDisable,
  formEnable
};
