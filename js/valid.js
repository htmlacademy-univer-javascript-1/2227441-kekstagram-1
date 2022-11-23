const form = document.querySelector('#upload-select-image');
const textHashtags = document.querySelector('.text__hashtags');

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

function validHashtags(hashtags) {
  const re = /^#[A-Za-zА-яа-яЁё0-9]{1,19}( #[A-Za-zА-яа-яЁё0-9]{1,19}){0,4}$/;
  return re.test(hashtags) || hashtags.length === 0;
}

pristine.addValidator(
  textHashtags,
  validHashtags,
  'Некорректный хэштег'
);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    form.submit();
  }
});

export {};
