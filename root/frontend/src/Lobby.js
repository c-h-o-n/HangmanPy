import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
// TODO: find a better way to refresh page
export function Lobby() {
  const [rooms, setRooms] = useState([]);
  const [isPending, setPending] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);
  useEffect(() => {
    setPending(true);
    fetch('/rooms')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const arrayData = Object.keys(data).map(key => ({
          name: key.slice(key.indexOf('-') + 1),
          userCount: data[key].user_count,
        }));
        setRooms(arrayData);
      })
      .catch(error => Promise.reject(error))
      .finally(() => {
        setPending(false);
      });
  }, [isRefreshing]);

  if (isPending) {
    return (
      <div className="text-center">
        <div className="spinner-border text-danger m-5"></div>
      </div>
    );
  }

  return (
    <div className="m-5">
      <div className="d-flex justify-content-center">
        <NavLink
          to={{
            pathname: '/create-game',
          }}
        >
          <div className="btn btn-primary">Create a room</div>
        </NavLink>
        <NavLink to="/lobby" onClick={() => setRefreshing(!isRefreshing)}>
          <div className="btn btn-primary ml-2">Refresh</div>
        </NavLink>
      </div>
      {!rooms.length ? <h1 className="m-5">No room available</h1> : ''}
      {rooms.map(room => (
        <div className="mt-5">
          <div className="card w-50 m-auto">
            <div className="card-body">
              <h5 className="card-title">{room.name}</h5>
              <h6 className="card-subtitle mb-2">{room.userCount}</h6>
              <p className="card-text">I love u</p>
              <NavLink
                key={room.name}
                to={{
                  pathname: '/game-' + room.name,
                }}
              >
                <div className="btn btn-primary">Join</div>
              </NavLink>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
