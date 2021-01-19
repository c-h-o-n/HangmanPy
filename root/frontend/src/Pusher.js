import Pusher from 'pusher-js';
// Enable pusher logging - don't include this in production
Pusher.logToConsole = false;

export const pusher = new Pusher('63a449ee585251585a11', {
  cluster: 'eu',
});

// Create one if it doesn't exist
export function JoinPusherChannel(channelName) {
  const channel = pusher.subscribe(`presence-${channelName}`);
  channel.bind(`update-event`, function (data) {
    console.log(JSON.stringify(data));
  });
}
