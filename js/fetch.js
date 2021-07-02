const getData = (onSuccess, onError) => fetch('https://23.javascript.pages.academy/keksobooking/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      onError();
    }
  })
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
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {
  getData,
  sendData
};
