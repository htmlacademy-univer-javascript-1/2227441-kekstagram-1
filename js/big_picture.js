const bigPicture = document.querySelector('.big-picture');
const img = bigPicture.querySelector('.big-picture__img').querySelector('img');
const commentTemplate = bigPicture.querySelector('#comment-template').content;
const commentCounter = bigPicture.querySelector('.social__comment-count');
const comments = bigPicture.querySelector('.social__comments');
const loadCommentsButton = bigPicture.querySelector('.comments-loader');

let currentComment = 0;

// Закрытие окна с изображением
function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.body.removeEventListener('keydown', closeOnEsc);
  bigPicture.querySelector('.big-picture__cancel').removeEventListener('click', closeBigPicture);
  loadCommentsButton.removeEventListener('click', loadCommentsListener);

  currentComment = 0;
  loadCommentsButton.classList.remove('hidden');

  bigPicture.querySelectorAll('.social__comment').forEach((commentNode) => {
    comments.removeChild(commentNode);
  });
}

function closeOnEsc(evt) {
  if (evt.keyCode === 27) {
    closeBigPicture();
  }
}

// Открытие в полноэкранном режиме, если нажали на миниатюру
function addListener(picture, discription) {
  picture.querySelector('.picture__img').addEventListener('click', () => {
    document.body.addEventListener('keydown', closeOnEsc);
    bigPicture.querySelector('.big-picture__cancel').addEventListener('click', closeBigPicture);

    bigPicture.classList.remove('hidden');
    img.src = discription.url;
    bigPicture.querySelector('.likes-count').textContent = discription.likes;
    bigPicture.querySelector('.social__caption').textContent = discription.description;

    discription.comments.forEach((comment) => {
      const socialComment = commentTemplate.cloneNode(true);
      const commentImg = socialComment.querySelector('img');
      commentImg.src = comment.avatar;
      commentImg.alt = comment.name;
      socialComment.querySelector('p').textContent = comment.message;
      comments.appendChild(socialComment);
    });

    bigPicture.querySelectorAll('.social__comment').forEach((commentNode) => {
      commentNode.classList.add('hidden');
    });

    show5Comments();
    loadCommentsButton.addEventListener('click', loadCommentsListener);
    document.body.classList.add('modal-open');
  });
}

// Показать еще 5 комментариев
function show5Comments() {
  let i = currentComment;
  currentComment = (comments.children.length - i > 5) ? i + 5 : comments.children.length;
  for (i; i < currentComment; i++) {
    comments.children[i].classList.remove('hidden');
  }
  if (currentComment === comments.children.length) {
    loadCommentsButton.classList.add('hidden');
  }
  commentCounter.textContent = `${currentComment} из ${comments.children.length}`;
}

function loadCommentsListener() {
  show5Comments();
}

export {addListener};
