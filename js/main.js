import './draw.js';
import './imgUploadOverlay.js';
import './valid.js';
import { getData } from './api.js';
import { drawPictures } from './draw.js';
import { getRandomSubarray, showAlert, throttle } from './utils.js';
import { showFilters, setFilterClick } from './filters.js';

const RENDER_DELAY = 500;

getData(
  (pictures) => {
    drawPictures(pictures);
    showFilters();
    setFilterClick('default', throttle(() => drawPictures(pictures), RENDER_DELAY));
    setFilterClick('random', throttle(() => drawPictures(getRandomSubarray(pictures.slice(), 10)), RENDER_DELAY) );
    setFilterClick('discussed', throttle(() => drawPictures(pictures.slice().sort((a, b) => b.comments.length - a.comments.length)), RENDER_DELAY));
  },
  showAlert
);
