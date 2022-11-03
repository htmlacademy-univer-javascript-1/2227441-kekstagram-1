function drawPictures(discriptions) {
  const pictureTemplate = document.querySelector('#picture').content;
  const picturesListFragment = document.createDocumentFragment();

  discriptions.forEach((discription) => {
    const newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('.picture__img').src = discription.url;
    newPicture.querySelector('.picture__comments').textContent = discription.comments.length;
    newPicture.querySelector('.picture__likes').textContent = discription.likes;
    picturesListFragment.appendChild(newPicture);
  });

  const pictures = document.querySelector('.pictures');
  pictures.appendChild(picturesListFragment);
}

export {drawPictures};
