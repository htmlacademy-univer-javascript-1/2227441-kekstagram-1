const LOAD_DATA_ADDRESS = 'https://26.javascript.pages.academy/kekstagram/data';
const SEND_FORM_ADDRESS = 'https://26.javascript.pages.academy/kekstagram';

function getData(onSuccess, onFail) {
  fetch(LOAD_DATA_ADDRESS)
    .then((response) => response.json())
    .then((pictures) => {
      onSuccess(pictures);
    })
    .catch(() => {
      onFail('Не удалось получить данные с сервера');
    });
}

function sendData(onSuccess, onFail, body) {
  fetch(
    SEND_FORM_ADDRESS,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
}

export { getData, sendData };
