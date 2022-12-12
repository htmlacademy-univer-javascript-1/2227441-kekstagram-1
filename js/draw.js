import {addListener} from './big_picture.js';

const pictureTemplate = document.querySelector('#picture').content;

function drawPictures(pictures) {
  document.querySelectorAll('.picture').forEach((picture) => {
    picture.remove();
  });
  const picturesListFragment = document.createDocumentFragment();

  pictures.forEach((discription) => {
    const newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('.picture__img').src = discription.url;
    newPicture.querySelector('.picture__comments').textContent = discription.comments.length;
    newPicture.querySelector('.picture__likes').textContent = discription.likes;
    addListener(newPicture, discription);
    picturesListFragment.appendChild(newPicture);
  });

  const picturesContainer = document.querySelector('.pictures');
  picturesContainer.appendChild(picturesListFragment);
}

export {drawPictures};
