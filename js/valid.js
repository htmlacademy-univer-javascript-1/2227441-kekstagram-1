import { sendData } from './api.js';
import { closeImgUpload } from './imgUploadOverlay.js';

const form = document.querySelector('#upload-select-image');
const textHashtags = document.querySelector('.text__hashtags');
const submitButton = document.querySelector('#upload-submit');
const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text',
});

function validHashtagsAmount(hashtags) {
  const text = hashtags.split(' ');
  return text.length < 6;
}

pristine.addValidator(
  textHashtags,
  validHashtagsAmount,
  'Не больше 5 хэштегов'
);

function validHashtagsDifference(hashtags) {
  const text = hashtags.split(' ').map((str) => str.toLowerCase());
  return text.some(() => {
    for (let i = 0; i < text.length; i++) {
      if (text.indexOf(text[i]) !== i) {
        return false;
      }
    }
    return true;
  });
}

pristine.addValidator(
  textHashtags,
  validHashtagsDifference,
  'Повторяющиеся хештеги'
);

function validHashtags(hashtags) {
  if (hashtags.split(' ').length < 6 && validHashtagsDifference(hashtags)) {
    const re = /^#[A-Za-zА-яа-яЁё0-9]{1,19}( #[A-Za-zА-яа-яЁё0-9]{1,19}){0,4}$/;
    return re.test(hashtags) || hashtags.length === 0;
  }
  return true;
}

pristine.addValidator(
  textHashtags,
  validHashtags,
  'Некорректный хэштег'
);

function blockSubmitButton() {
  submitButton.disabled = true;
}

function unblockSubmitButton() {
  submitButton.disabled = false;
}

function showSuccesMessage() {
  const successMessage = successTemplate.cloneNode(true);

  document.body.appendChild(successMessage);
  document.querySelector('.success__button').addEventListener('click', closeSuccessMessage);
  document.body.addEventListener('keydown', closeSuccessOnEsc);
  document.body.addEventListener('click', closeSuccessOnClick);
  document.body.classList.add('modal-open');
}

function closeSuccessMessage() {
  document.querySelector('.success').classList.add('hidden');
  document.querySelector('.success__button').removeEventListener('click', closeSuccessMessage);
  document.body.removeEventListener('keydown', closeSuccessOnEsc);
  document.body.removeEventListener('click', closeSuccessOnClick);
  document.querySelector('.success').remove();
  document.body.classList.remove('modal-open');
}

function closeSuccessOnEsc(evt) {
  if (evt.keyCode === 27) {
    closeSuccessMessage();
  }
}

function closeSuccessOnClick(evt) {
  if (!document.querySelector('.success__inner').isEqualNode(evt.target)) {
    closeSuccessMessage();
  }
}

function showErrorMessage() {
  const errorMessage = errorTemplate.cloneNode(true);

  document.body.appendChild(errorMessage);
  document.querySelector('.error').style.zIndex = '100';
  document.querySelector('.error__button').addEventListener('click', closeErrorMessage);
  document.body.addEventListener('keydown', closeErrorOnEsc);
  document.body.addEventListener('click', closeErrorOnClick);
  document.body.classList.add('modal-open');
}

function closeErrorMessage() {
  document.querySelector('.error').classList.add('hidden');
  document.querySelector('.error__button').removeEventListener('click', closeErrorMessage);
  document.body.removeEventListener('keydown', closeErrorOnEsc);
  document.body.removeEventListener('click', closeErrorOnClick);
  document.querySelector('.error').remove();
  document.body.classList.remove('modal-open');
}

function closeErrorOnEsc(evt) {
  if (evt.keyCode === 27) {
    closeErrorMessage();
  }
}

function closeErrorOnClick(evt) {
  if (!document.querySelector('.error__inner').isEqualNode(evt.target)) {
    closeErrorMessage();
  }
}

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    blockSubmitButton();
    sendData(
      () => {
        closeImgUpload(true);
        unblockSubmitButton();
        showSuccesMessage();
      },
      () => {
        closeImgUpload(false);
        unblockSubmitButton();
        showErrorMessage();
      },
      new FormData(form)
    );
  }
});

export {};
