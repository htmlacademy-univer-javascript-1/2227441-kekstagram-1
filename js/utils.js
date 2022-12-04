function getRandom(a, b) {
  const min = (a < b) ? a : b;
  const max = (a > b) ? a : b;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function isCorrectString(comment, maxLength) {
  return comment.legth <= maxLength;
}

const ALERT_SHOW_TIME = 5000;

function showAlert(message) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '18px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

export {getRandom, isCorrectString, showAlert };
