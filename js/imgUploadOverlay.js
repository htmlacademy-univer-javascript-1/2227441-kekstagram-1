const overlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');
const inputFile = document.querySelector('#upload-file');
const uploadImage = document.querySelector('.img-upload__preview').querySelector('img');

let currentScale = 1;

inputFile.addEventListener('change', showImgUpload);

// Открытие и закрытие оверлея
function showImgUpload() {
  document.body.addEventListener('keydown', closeOnEsc);
  cancelButton.addEventListener('click', closeImgUpload);
  overlay.querySelector('.img-upload__effects').addEventListener('click', onFilterChange);

  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  uploadImage.style.transform = 'scale(1)';
}

function closeImgUpload() {
  document.body.removeEventListener('keydown', closeOnEsc);
  cancelButton.removeEventListener('click', closeImgUpload);
  overlay.querySelector('.img-upload__effects').addEventListener('click', onFilterChange);

  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  inputFile.value = '';
  currentScale = 1;
  changeScale();
  setEffect('none');
}

function closeOnEsc(evt) {
  if (evt.keyCode === 27) {
    closeImgUpload();
  }
}

// Обработка Esc при фокусе
function disableEsc(elem) {
  elem.addEventListener('focus', () => {
    document.removeEventListener('keydown', closeOnEsc);
  });
  elem.addEventListener('blur', () => {
    document.addEventListener('keydown', closeOnEsc);
  });
}

const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
disableEsc(textHashtags);
disableEsc(textDescription);

// Обработка масшабирования
const scaleBiggerButton = overlay.querySelector('.scale__control--bigger');
const scaleSmallerButton = overlay.querySelector('.scale__control--smaller');
const scaleValue = overlay.querySelector('.scale__control--value');

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
const effectLevel = overlay.querySelector('.effect-level__value');
const effectLevelElement = overlay.querySelector('.effect-level');

const sliderElement = overlay.querySelector('.effect-level__slider');
const sliderFormat = {
  to: function (value) {
    if (Number.isInteger(value)) {
      return value.toFixed(0);
    }
    return value.toFixed(1);
  },
  from: function (value) {
    return parseFloat(value);
  },
};
const sliderOptions = {
  'none': {
    range: {
      min: 0,
      max: 100,
    }, step: 1, start: 100, format: sliderFormat,
  },
  'chrome': {
    range: {
      min: 0,
      max: 1,
    }, step: 0.1, start: 1, format: sliderFormat,
  },
  'sepia': {
    range: {
      min: 0,
      max: 1,
    }, step: 0.1, start: 1, format: sliderFormat,
  },
  'marvin': {
    range: {
      min: 0,
      max: 100,
    }, step: 1, start: 100,
    format: {
      to: function (value) {
        return value / 100;
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  },
  'phobos': {
    range: {
      min: 0,
      max: 3,
    }, step: 0.1, start: 3, format: sliderFormat,
  },
  'heat': {
    range: {
      min: 1,
      max: 3,
    }, step: 0.1, start: 3, format: sliderFormat,
  }
};
const styleFilters = {
  'chrome': 'grayscale',
  'sepia': 'sepia',
  'marvin': 'invert',
  'phobos': 'blur',
  'heat': 'brightness',
};

let checked = overlay.querySelector('#effect-none');
noUiSlider.create(sliderElement, sliderOptions['none']);

sliderElement.noUiSlider.on('update', () => {
  effectLevel.value = `${sliderElement.noUiSlider.get()}`;
  const filter = (checked.value === 'phobos') ? `${styleFilters[checked.value]}(${effectLevel.value}px)`
    : `${styleFilters[checked.value]}(${effectLevel.value})`;
  uploadImage.style.filter = filter;
});


function setEffect(effect) {
  if (checked.value !== effect) {
    uploadImage.classList.remove(`effects__preview--${checked.value}`);
    checked.classList.remove('checked');
    checked = overlay.querySelector(`#effect-${effect}`);
    checked.classList.add('checked');
    uploadImage.classList.add(`effects__preview--${checked.value}`);
    sliderElement.noUiSlider.destroy();
    noUiSlider.create(sliderElement, sliderOptions[effect]);
    effectLevel.value = `${sliderElement.noUiSlider.get()}`;
    if (checked.value !== 'none') {
      effectLevelElement.classList.remove('hidden');
    } else {
      effectLevelElement.classList.add('hidden');
    }
  }
}

function onFilterChange(evt) {
  if (evt.target.matches('input[type="radio"]')) {
    setEffect(evt.target.value);
  }
}

export {};
