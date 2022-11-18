function exitOnEsc(evt) {
  if (evt.keyCode === 27) {
    document.body.classList.remove('modal-open');
  }
}

export {exitOnEsc};
