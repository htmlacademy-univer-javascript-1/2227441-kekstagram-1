import './draw.js';
import './imgUploadOverlay.js';
import './valid.js';
import { getData } from './api.js';
import { drawPictures } from './draw.js';
import { showAlert } from './utils.js';

getData((pictures) => {
  drawPictures(pictures);
},
showAlert);
