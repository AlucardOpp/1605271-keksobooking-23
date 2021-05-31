// Ссылка на источник https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const randomizeInteger = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return (max > min) ? Math.floor(Math.random() * (max - min + 1)) + min : 'max больше чем min';
};

// Ссылка на источник https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
const randomizeFloat = function(min, max, signsAfter) {
  return (max > min) ? Number((Math.random() * (max - min + 1) + min).toFixed(signsAfter)) : 'max больше чем min';
};

randomizeInteger(10, 20);
randomizeFloat(10, 20);
