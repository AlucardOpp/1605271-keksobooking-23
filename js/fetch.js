const getData = (onSuccess, onError) => fetch('https://23.javascript.pages.academy/keksobooking/data')
  .then((response) =>
    response.ok ? response.json() : onError(),
  )
  .then((ads) => {
    onSuccess(ads);
  })
  .catch(() => {
    onError();
  });


const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://23.javascript.pages.academy/keksobooking', {
      method: 'POST',
      type: 'multipart/form-data',
      body,
    },
  )
    .then((response) => {
      response.ok ? onSuccess() : onFail();
    })
    .catch(() => {
      onFail();
    });
};

export {
  getData,
  sendData
};
