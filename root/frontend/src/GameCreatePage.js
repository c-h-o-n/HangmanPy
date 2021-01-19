import { useHistory } from 'react-router-dom';
import { JoinPusherChannel } from './Pusher';
export function GameCreatePage() {
  const history = useHistory(); // to redirect automaticly

  return (
    <div className="p-5 content bg-whitesmoke text-center">
      <h2>Creating a new room...</h2>
      <form
        onSubmit={event => {
          event.preventDefault();
          const roomName = event.target.elements.name.value;
          fetch(`/create-game-${roomName}`, {
            method: 'POST',
            body: JSON.stringify({
              name: roomName,
            }),
          }).then(() => {
            history.push(`/game-${roomName}`);
          });
        }}
      >
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Room name:</label>
          <div className="col-sm-6">
            <input
              type="text"
              name="name"
              className="form-control"
              autoComplete="off"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-success">
          Create
        </button>
      </form>
    </div>
  );
}
