function getRandom(a, b) {
  const min = (a < b) ? a : b;
  const max = (a > b) ? a : b;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function isCorrectString(comment, maxLength) {
  return comment.legth <= maxLength;
}

export {getRandom, isCorrectString};
