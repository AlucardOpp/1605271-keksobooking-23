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
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

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

export {
  getRandomPositiveFloat,
  getRandomPositiveInteger,
  disableElements,
  enableElements,
  showAlert,
  processSuccessAlert,
  resetTwoForms,
  processErrorAlert
};
