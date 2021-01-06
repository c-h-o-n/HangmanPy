const username = document.getElementById('user').textContent;

// Enable pusher logging - don't include this in production
// Pusher.logToConsole = true;

var pusher = new Pusher('63a449ee585251585a11', {
  cluster: 'eu',
});
var channel = pusher.subscribe('presence-global-channel');

channel.bind('my-event', function (data) {
  console.log(data);
  document.getElementById('current-word').textContent = data.currentState
    .split('')
    .join(' ');
});

channel.bind('pusher:subscription_succeeded', players => {
  console.log(players.count);
  document.querySelector('#player-count').textContent = players.count - 1;
  players.each(player => {
    if (username !== player.info['user_name']) {
      console.log('id:', player.id, 'name: ', player.info['user_name']);
      const onlinePlayersHtml = document.getElementById('online-players');
      const node = document.createElement('li');
      const textNode = document.createTextNode(player.info['user_name']);
      node.appendChild(textNode);
      onlinePlayersHtml.appendChild(node);
    }
  });
});

channel.bind('pusher:member_added', player => {
  console.log(
    'new player connected:\nid:',
    player.id,
    'name: ',
    player.info['user_name']
  );

  const playerCount = document.querySelector('#player-count');
  playerCount.textContent = parseInt(playerCount.textContent) + 1;

  const onlinePlayersHtml = document.getElementById('online-players');
  const node = document.createElement('li');
  const textNode = document.createTextNode(player.info['user_name']);
  node.appendChild(textNode);
  onlinePlayersHtml.appendChild(node);
});

channel.bind('pusher:member_removed', player => {
  console.log(player);
  const playerCount = document.querySelector('#player-count');
  playerCount.textContent = parseInt(playerCount.textContent) - 1;
  console.log(pusher);
  // document.querySelector('#player-count').textContent = players.count - 1;
  let test = document.getElementById('online-players');

  for (let i = 0; i < test.children.length; i++) {
    if (test.children[i].textContent == player.info['user_name']) {
      console.log('removed:', test.children[i].textContent);
      test.removeChild(test.children[i]);
    }
  }
});

$('#testbutton').on('click', function () {
  pusher.unsubscribe('presence-global-channel');
});
