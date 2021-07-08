import {
  mainPinMarker
} from './map.js';
const ALERT_SHOW_TIME = 5000;
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

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

const disableElements = (arr) => {
  for (const element of arr) {
    element.disabled = true;
  }
};

const enableElements = (arr) => {
  for (const element of arr) {
    element.disabled = false;
  }
};

const showAlert = (message) => {
  const alertContainer = document.querySelector('#alert').content.querySelector('.alert');

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const resetTwoForms = (formOne, formTwo) => {
  formOne.reset();
  formTwo.reset();
  mainPinMarker.setLatLng({
    lat: 35.6895000,
    lng: 139.6917100,
  });
};

const showSuccessAlert = (alert) => {
  document.body.append(alert);
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      successTemplate.remove();
    }
  });
  document.addEventListener('mouseup', () => {
    alert.remove();
  });
};

const showErrorAlert = (alert) => {
  document.body.append(alert);
  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', () => {
    alert.remove();
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      errorTemplate.remove();
    }
  });
  document.addEventListener('mouseup', () => {
    alert.remove();
  });
};

const processSuccessAlert = (alert, formOne, formTwo) => {
  showSuccessAlert(alert);
  resetTwoForms(formOne, formTwo);
};

const processErrorAlert = (alert) => {
  showErrorAlert(alert);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  getRandomPositiveFloat,
  getRandomPositiveInteger,
  disableElements,
  enableElements,
  showAlert,
  processSuccessAlert,
  resetTwoForms,
  processErrorAlert,
  debounce
};
