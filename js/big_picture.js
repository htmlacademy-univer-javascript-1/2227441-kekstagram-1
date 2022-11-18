const bigPicture = document.querySelector('.big-picture');
const img = bigPicture.querySelector('.big-picture__img').querySelector('img');
const commentTemplate = bigPicture.querySelector('#comment-template').content;

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    bigPicture.classList.add('hidden');
  }
});

bigPicture.querySelector('.big-picture__cancel').addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

function addListener(picture, discription) {
  picture.querySelector('.picture__img').addEventListener('click', () => {
    bigPicture.classList.remove('hidden');
    img.src = discription.url;
    bigPicture.querySelector('.likes-count').textContent = discription.likes;
    bigPicture.querySelector('.comments-count').textContent = discription.comments.length;
    bigPicture.querySelector('.social__caption').textContent = discription.description;
    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    bigPicture.querySelector('.comments-loader').classList.add('hidden');
    const comments = bigPicture.querySelector('.social__comments');
    discription.comments.forEach((comment) => {
      const socialComment = commentTemplate.cloneNode(true);
      const commentImg = socialComment.querySelector('img');
      commentImg.src = comment.avatar;
      commentImg.alt = comment.name;
      socialComment.querySelector('p').textContent = comment.message;
      comments.appendChild(socialComment);
    });
    document.body.classList.add('modal-open');
  });
}

export {addListener};
