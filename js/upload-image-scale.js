// Обработка масшабирования
//import { uploadImage } from './img-upload-overlay.js';
const uploadImage = document.querySelector('.img-upload__preview').querySelector('img');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleValue = document.querySelector('.scale__control--value');

let currentScale = 1;

function changeScale(num) {
  currentScale = num;
  scaleValue.value = `${currentScale * 100}%`;
  uploadImage.style.transform = `scale(${currentScale})`;
}

scaleBiggerButton.addEventListener('click', () => {
  if (currentScale < 1) {
    changeScale(currentScale + 0.25);
  }
});

scaleSmallerButton.addEventListener('click', () => {
  if (currentScale > 0.25) {
    changeScale(currentScale - 0.25);
  }
});

export { changeScale };
