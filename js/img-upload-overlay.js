import { disableEffects, enableEffects, resetImageEffect } from './upload-image-effects.js';
import { changeScale } from './upload-image-scale.js';

const overlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');
const inputFile = document.querySelector('#upload-file');
const uploadImage = document.querySelector('.img-upload__preview').querySelector('img');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

function resetForm() {
  resetImageEffect();
  changeScale(1);
  textHashtags.value = '';
  textDescription.value = '';
  inputFile.value = '';
}

// Обработка Esc при фокусе

function closeOnEsc(evt) {
  if (evt.key === 'Escape') {
    closeImgUpload();
  }
}

function disableEsc() {
  document.body.removeEventListener('keydown', closeOnEsc);
}

function enableEsc() {
  document.body.addEventListener('keydown', closeOnEsc);
}

function addEscHandlers(elem) {
  elem.addEventListener('focus', disableEsc);
  elem.addEventListener('blur', enableEsc);
}

function removeEscHandlers(elem) {
  elem.removeEventListener('focus', disableEsc);
  elem.removeEventListener('blur', enableEsc);
}

// Открытие и закрытие оверлея
function showImgUpload() {
  const imageUrl = URL.createObjectURL(inputFile.files[0]);
  uploadImage.src = imageUrl;
  enableEffects(imageUrl);

  document.body.addEventListener('keydown', closeOnEsc);
  cancelButton.addEventListener('click', closeImgUpload);
  addEscHandlers(textHashtags);
  addEscHandlers(textDescription);

  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

function closeImgUpload(clearForm) {
  document.body.removeEventListener('keydown', closeOnEsc);
  cancelButton.removeEventListener('click', closeImgUpload);
  removeEscHandlers(textHashtags);
  removeEscHandlers(textDescription);
  disableEffects();

  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  if (clearForm) {
    resetForm();
  }
}

inputFile.addEventListener('change', showImgUpload);

export { closeImgUpload };
