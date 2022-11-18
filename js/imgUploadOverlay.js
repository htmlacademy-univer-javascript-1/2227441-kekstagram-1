import { exitOnEsc } from './handlers.js';

const overlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');
const inputFile = document.querySelector('#upload-file');
const uploadImage = document.querySelector('.img-upload__preview').querySelector('img');

let currentScale = 1;
let currentEffect = 'original';

// Открытие и закрытие оверлея
function showImgUpload() {
  cancelButton.addEventListener('click', closeImgUpload);
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadImage.style.transform = 'scale(1)';
}

function closeImgUpload() {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  cancelButton.removeEventListener('click', closeImgUpload);
  inputFile.value = '';
  currentScale = 1;
  changeScale();
  currentEffect = 'original';
  changeEffect('original');
}

function closeOnEsc(evt) {
  if (evt.keyCode === 27) {
    closeImgUpload();
  }
}

inputFile.addEventListener('change', showImgUpload);

document.addEventListener('keydown', closeOnEsc);

// Обработка Esc при фокусе
function disableEsc(elem) {
  elem.addEventListener('focus', () => {
    document.removeEventListener('keydown', closeOnEsc);
    document.removeEventListener('keydown', exitOnEsc);
  });
  elem.addEventListener('blur', () => {
    document.addEventListener('keydown', closeOnEsc);
    document.addEventListener('keydown', exitOnEsc);
  });
}

const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
disableEsc(textHashtags);
disableEsc(textDescription);

// Обработка масшабирования
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleValue = document.querySelector('.scale__control--value');

function changeScale() {
  scaleValue.value = `${currentScale * 100}%`;
  uploadImage.style.transform = `scale(${currentScale})`;
}

scaleBiggerButton.addEventListener('click', () => {
  if (currentScale < 1) {
    currentScale += 0.25;
  }
  changeScale(currentScale);
});

scaleSmallerButton.addEventListener('click', () => {
  if (currentScale > 0.25) {
    currentScale -= 0.25;
  }
  changeScale();
});

// Обработка эффектов
const originalRadio = document.querySelector('#effect-none');
const chromeRadio = document.querySelector('#effect-chrome');
const sepiaRadio = document.querySelector('#effect-sepia');
const marvinRadio = document.querySelector('#effect-marvin');
const phobosRadio = document.querySelector('#effect-phobos');
const heatRadio = document.querySelector('#effect-heat');

function changeEffect(effect) {
  if (currentEffect !== effect) {
    uploadImage.classList.remove(`effects__preview--${currentEffect}`);
    currentEffect = effect;
    if (currentEffect !== 'original') {
      uploadImage.classList.add(`effects__preview--${currentEffect}`);
    }
  }
}

originalRadio.addEventListener('input', () => {
  changeEffect('origianl');
});

chromeRadio.addEventListener('input', () => {
  changeEffect('chrome');
});

sepiaRadio.addEventListener('input', () => {
  changeEffect('sepia');
});

marvinRadio.addEventListener('input', () => {
  changeEffect('marvin');
});

phobosRadio.addEventListener('input', () => {
  changeEffect('phobos');
});

heatRadio.addEventListener('input', () => {
  changeEffect('heat');
});

export {};
