const overlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');
const inputFile = document.querySelector('#upload-file');
const uploadImage = document.querySelector('.img-upload__preview').querySelector('img');

let currentScale = 1;

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

let checkedRadio = overlay.querySelector('.effects__radio:checked');
noUiSlider.create(sliderElement, sliderOptions['none']);

sliderElement.noUiSlider.on('update', () => {
  effectLevel.value = `${sliderElement.noUiSlider.get()}`;
  const filter = (checkedRadio.value === 'phobos') ? `${styleFilters[checkedRadio.value]}(${effectLevel.value}px)`
    : `${styleFilters[checkedRadio.value]}(${effectLevel.value})`;
  uploadImage.style.filter = filter;
});


function setEffect(effect) {
  if (checkedRadio.value !== effect) {
    uploadImage.classList.remove(`effects__preview--${checkedRadio.value}`);
    uploadImage.style.filter = '';
    //checkedRadio = overlay.querySelector(`#effect-${effect}`);
    checkedRadio = overlay.querySelector('.effects__radio:checked');
    uploadImage.classList.add(`effects__preview--${checkedRadio.value}`);
    sliderElement.noUiSlider.updateOptions(sliderOptions[effect]);
    effectLevel.value = `${sliderElement.noUiSlider.get()}`;
    if (checkedRadio.value !== 'none') {
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

function resetForm() {
  setEffect('none');
  uploadImage.classList.remove(`effects__preview--${checkedRadio.value}`);
  uploadImage.classList.add('effects__preview--none');
  uploadImage.style.filter = '';
  checkedRadio.checked = false;
  checkedRadio = overlay.querySelector('#effect-none');
  checkedRadio.checked = true;
  changeScale(1);
  textHashtags.value = '';
  textDescription.value = '';
}

// Открытие и закрытие оверлея
function showImgUpload() {
  uploadImage.src = URL.createObjectURL(inputFile.files[0]);
  document.querySelectorAll('.effects__preview').forEach((preview) => {
    preview.style.backgroundImage = `url(${  URL.createObjectURL(inputFile.files[0])  })`;
  });

  document.body.addEventListener('keydown', closeOnEsc);
  cancelButton.addEventListener('click', closeImgUpload);
  overlay.querySelector('.img-upload__effects').addEventListener('click', onFilterChange);

  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  effectLevelElement.classList.add('hidden');
}

function closeImgUpload(clearForm) {
  document.body.removeEventListener('keydown', closeOnEsc);
  cancelButton.removeEventListener('click', closeImgUpload);
  overlay.querySelector('.img-upload__effects').removeEventListener('click', onFilterChange);

  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  inputFile.value = '';
  if (clearForm) {
    resetForm();
  }
}

inputFile.addEventListener('change', showImgUpload);

export { closeImgUpload };
