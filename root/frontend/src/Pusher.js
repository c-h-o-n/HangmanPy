import Pusher from 'pusher-js';
// Enable pusher logging - don't include this in production
Pusher.logToConsole = false;

export const pusher = new Pusher('63a449ee585251585a11', {
  cluster: 'eu',
});
