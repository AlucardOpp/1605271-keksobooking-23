const adForm = document.querySelector('.ad-form');
const adFormHeader = document.querySelector('.ad-form-header');
const adFormElement = document.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');
const mapFeatures = document.querySelector('.map__features');
const mapFilter = document.querySelectorAll('.map__filter');
const formDisable = () => {
  adForm.classList.add('ad-form--disabled');
  adFormHeader.disabled = true;
  for (let index = 0; index < adFormElement.length; index++) {
    adFormElement[index].disabled = true;
  }
  mapFilters.classList.add('map__filters--disabled');
  mapFeatures.disabled = true;
  for (let index = 0; index < mapFilter.length; index++) {
    mapFilter[index].disabled = true;
  }
};

const formEnable = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormHeader.disabled = false;
  for (let index = 0; index < adFormElement.length; index++) {
    adFormElement[index].disabled = false;
  }
  mapFilters.classList.remove('map__filters--disabled');
  mapFeatures.disabled = false;
  for (let index = 0; index < mapFilter.length; index++) {
    mapFilter[index].disabled = false;
  }
};

export {formDisable, formEnable};
