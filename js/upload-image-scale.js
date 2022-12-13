// Обработка масшабирования
const uploadImage = document.querySelector('.img-upload__preview').querySelector('img');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleValue = document.querySelector('.scale__control--value');

const SCALE_STEP = 0.25;
const MAX_SCALE = 1;
const MIN_SCALE = 0.25;

let currentScale = 1;

function changeScale(num) {
  currentScale = num;
  scaleValue.value = `${currentScale * 100}%`;
  uploadImage.style.transform = `scale(${currentScale})`;
}

scaleBiggerButton.addEventListener('click', () => {
  if (currentScale < MAX_SCALE) {
    changeScale(currentScale + SCALE_STEP);
  }
});

scaleSmallerButton.addEventListener('click', () => {
  if (currentScale > MIN_SCALE) {
    changeScale(currentScale - SCALE_STEP);
  }
});

export { changeScale };
