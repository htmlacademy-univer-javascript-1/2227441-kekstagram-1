function getRandom(min, max) {
  if (min > max || min < 0) {
    return null;
  }
  return Math.floor(Math.random() * (max - min) + min);
}

getRandom(0, 1);

function isCorrectString(comment, maxLength) {
  return comment.legth <= maxLength;
}

isCorrectString('comment', 10);
