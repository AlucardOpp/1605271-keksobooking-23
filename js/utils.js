import {
  mainPinMarker
} from './map.js';
const ALERT_SHOW_TIME = 5000;
const DEBOUNCE_DELAY = 500;
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

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

let onSuccessAlertClick = () => {}; // Если не объявить заранее, то ESLint будет ругаться

const onSuccessAlertKeydown = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    successTemplate.remove();
    document.removeEventListener('keydown', onSuccessAlertKeydown);
    document.removeEventListener('mouseup', onSuccessAlertClick);
  }
};

onSuccessAlertClick = () => {
  successTemplate.remove();
  document.removeEventListener('mouseup', onSuccessAlertClick);
  document.removeEventListener('keydown', onSuccessAlertKeydown);
};

const showSuccessAlert = (alert) => {
  document.body.append(alert);
  document.addEventListener('keydown', onSuccessAlertKeydown);
  document.addEventListener('mouseup', onSuccessAlertClick);
};

let onErrorAlertClick = () => {}; // Аналогично 42 строке

const onErrorAlertKeydown = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    errorTemplate.remove();
    document.removeEventListener('keydown', onErrorAlertKeydown);
    document.removeEventListener('mouseup', onErrorAlertClick);
  }
};

onErrorAlertClick = () => {
  errorTemplate.remove();
  document.removeEventListener('mouseup', onErrorAlertClick);
  document.removeEventListener('keydown', onErrorAlertKeydown);
};


const showErrorAlert = (alert) => {
  document.body.append(alert);
  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', () => {
    alert.remove();
  });
  document.addEventListener('keydown', onErrorAlertKeydown);
  document.addEventListener('mouseup', onErrorAlertClick);
};

const processSuccessAlert = (alert, formOne, formTwo) => {
  showSuccessAlert(alert);
  resetTwoForms(formOne, formTwo);
};

const processErrorAlert = (alert) => {
  showErrorAlert(alert);
};

const debounce = (callback, timeoutDelay = DEBOUNCE_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  disableElements,
  enableElements,
  showAlert,
  processSuccessAlert,
  resetTwoForms,
  processErrorAlert,
  debounce
};
