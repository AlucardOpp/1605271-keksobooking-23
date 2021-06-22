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

const findSelected = (arr) => {
  for (let index = 0; index < arr.length; index++) {
    if (arr[index].selected === true) {
      return arr[index];
    }
  }
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

export {
  getRandomPositiveFloat,
  getRandomPositiveInteger,
  findSelected,
  disableElements,
  enableElements
};
