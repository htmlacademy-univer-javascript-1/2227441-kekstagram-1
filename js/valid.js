const form = document.querySelector('#upload-select-image');
const textHashtags = document.querySelector('.text__hashtags');

const pristine = new Pristine(form, {
  classTo: 'img-upload__hashtags',
  errorTextParent: 'img-upload__hashtags',
  errorTextClass: 'img-upload__error-text',
});

function validHashtagsAmount(hashtags) {
  const text = hashtags.split(' ');
  return text.length < 6 && text.length > 0;
}

pristine.addValidator(
  textHashtags,
  validHashtagsAmount,
  'Не больше 5 хэштегов'
);

function validHashtags(hashtags) {
  const re = /^#[A-Za-zА-яа-яЁё0-9]{1,19}$/;
  hashtags.split(' ').forEach((hashtag) => {
    if (!re.test(hashtag)) { return false; }
  });
  return true;
}

pristine.addValidator(
  document.querySelector('.text__hashtags'),
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
