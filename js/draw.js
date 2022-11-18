import {addListener} from './big_picture.js';
import {createDiscriptions} from './data.js';

const discriptions = createDiscriptions();

function drawPictures() {
  const pictureTemplate = document.querySelector('#picture').content;
  const picturesListFragment = document.createDocumentFragment();

  discriptions.forEach((discription) => {
    const newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('.picture__img').src = discription.url;
    newPicture.querySelector('.picture__comments').textContent = discription.comments.length;
    newPicture.querySelector('.picture__likes').textContent = discription.likes;
    addListener(newPicture, discription);
    picturesListFragment.appendChild(newPicture);
  });

  const pictures = document.querySelector('.pictures');
  pictures.appendChild(picturesListFragment);
}

drawPictures(discriptions);

export {drawPictures};
