// Обработка эффектов
const uploadImage = document.querySelector('.img-upload__preview').querySelector('img');
const effectsSection = document.querySelector('.img-upload__effects');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelElement = document.querySelector('.effect-level');
const effectsPreviews = document.querySelectorAll('.effects__preview');
const sliderElement = document.querySelector('.effect-level__slider');

const SLIDER_FORMAT = {
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

const SLIDER_OPTIONS = {
  'none': {
    range: {
      min: 0,
      max: 100,
    }, step: 1, start: 100, format: SLIDER_FORMAT,
  },
  'chrome': {
    range: {
      min: 0,
      max: 1,
    }, step: 0.1, start: 1, format: SLIDER_FORMAT,
  },
  'sepia': {
    range: {
      min: 0,
      max: 1,
    }, step: 0.1, start: 1, format: SLIDER_FORMAT,
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
    }, step: 0.1, start: 3, format: SLIDER_FORMAT,
  },
  'heat': {
    range: {
      min: 1,
      max: 3,
    }, step: 0.1, start: 3, format: SLIDER_FORMAT,
  }
};
const STYLE_FILTERS = {
  'chrome': 'grayscale',
  'sepia': 'sepia',
  'marvin': 'invert',
  'phobos': 'blur',
  'heat': 'brightness',
};

let checkedRadio = document.querySelector('.effects__radio:checked');
noUiSlider.create(sliderElement, SLIDER_OPTIONS['none']);

sliderElement.noUiSlider.on('update', () => {
  effectLevelValue.value = `${sliderElement.noUiSlider.get()}`;
  const filter = (checkedRadio.value === 'phobos') ? `${STYLE_FILTERS[checkedRadio.value]}(${effectLevelValue.value}px)`
    : `${STYLE_FILTERS[checkedRadio.value]}(${effectLevelValue.value})`;
  uploadImage.style.filter = filter;
});


function setEffect(effect) {
  if (checkedRadio.value !== effect) {
    uploadImage.classList.remove(`effects__preview--${checkedRadio.value}`);
    uploadImage.style.filter = '';
    checkedRadio = document.querySelector('.effects__radio:checked');
    uploadImage.classList.add(`effects__preview--${checkedRadio.value}`);
    sliderElement.noUiSlider.updateOptions(SLIDER_OPTIONS[effect]);
    effectLevelValue.value = `${sliderElement.noUiSlider.get()}`;
    if (checkedRadio.value !== 'none') {
      effectLevelElement.classList.remove('hidden');
    } else {
      effectLevelElement.classList.add('hidden');
    }
  }
}

function onEffectChange(evt) {
  if (evt.target.matches('input[type="radio"]')) {
    setEffect(evt.target.value);
  }
}

function resetImageEffect() {
  setEffect('none');
  uploadImage.classList.remove(`effects__preview--${checkedRadio.value}`);
  uploadImage.classList.add('effects__preview--none');
  uploadImage.style.filter = '';
  checkedRadio.checked = false;
  checkedRadio = document.querySelector('#effect-none');
  checkedRadio.checked = true;
  effectLevelElement.classList.add('hidden');
}

function enableEffects(url) {
  effectsPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url(${  url  })`;
  });
  effectsSection.addEventListener('click', onEffectChange);
}

function disableEffects() {
  effectsSection.removeEventListener('click', onEffectChange);
}

export { onEffectChange, resetImageEffect, enableEffects, disableEffects };
