function getRandom(min, max) {
  if (min >= max || min < 0) {
    throw new Error('Invalid input data');
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}

getRandom(0, 1);

function isCorrectString(comment, maxLength) {
  return comment.legth <= maxLength;
}

isCorrectString('comment', 10);
