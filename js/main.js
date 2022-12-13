import './draw.js';
import './img-upload-overlay.js';
import './valid.js';
import { getData } from './api.js';
import { drawPictures } from './draw.js';
import { getRandomSubarray, showAlert, throttle } from './utils.js';
import { showFilters, setFilterClick } from './filters.js';

const RENDER_DELAY = 500;
const NUM_RAND_PHOTOS = 10;

getData(
  (pictures) => {
    drawPictures(pictures);
    showFilters();
    setFilterClick('default', throttle(() => drawPictures(pictures), RENDER_DELAY));
    setFilterClick('random', throttle(() => drawPictures(getRandomSubarray(pictures.slice(), NUM_RAND_PHOTOS)), RENDER_DELAY));
    setFilterClick('discussed', throttle(() =>
      drawPictures(pictures.slice().sort((a, b) => b.comments.length - a.comments.length)), RENDER_DELAY));
  },
  showAlert
);
