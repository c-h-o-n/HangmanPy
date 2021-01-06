ajaxGame('/play/state', 'POST', null);

$('#guess > button').on('click', function () {
  const guess = document.querySelector('#guess > input[type=text]').value;
  ajaxGame('/play/guess', 'POST', JSON.stringify({ guess: guess }));
});

$('#restart > button').on('click', function () {
  ajaxGame('/play/restart', 'POST', null);
});

$('form').submit(false);

// TODO: rename function
function ajaxGame(url, method, body) {
  fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      renderGame(data);
    });
}

function renderGame(response) {
  document.getElementById(
    'current-word'
  ).textContent = response.currentState.split('').join(' ');
  document.getElementById('current-lives').textContent = response.lives;
}
