const pusher = new Pusher('63a449ee585251585a11', {
  cluster: 'eu',
});

document.getElementById('btn-new-room').onclick = () => {
  const roomName = document.getElementById('new-room-name').value;
  const channel = pusher.subscribe(`presence-${roomName}`);
  console.log(pusher.channels);
  let userCount = 0;

  const roomHtml = `
        <div class="card" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title">${roomName}</h5>
        <p class="card-text">${userCount}</p>
        <a href="#" class="btn btn-primary">Join</a>
        </div>
        </div>
    `;

  document.getElementById('rooms').innerHTML += roomHtml;
};
