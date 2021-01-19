import { useEffect, useState } from 'react';
import { pusher } from './Pusher';

export function Game(props) {
  const id = props.match.params.gameId;

  const [gameState, setGameState] = useState({});
  function fetchOnGuess(e) {
    e.preventDefault();
    fetch(`/game-${id}/guess`, {
      method: 'POST',
      body: JSON.stringify({ guess: e.target.elements.guessChar.value }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setGameState(data);
      })
      .catch(error => {
        Promise.reject(error);
      });
  }
  function getState() {
    fetch(`/game-${id}/state`)
      .then(response => response.json())
      .then(data => {
        setGameState(data);
      });
  }

  useEffect(() => {
    getState();
    const channel = pusher.subscribe(`presence-${id}`);
    channel.bind(`update-event`, function (data) {
      getState();
    });
  }, []);

  return (
    <div>
      <h1>
        Hello <span></span>!
      </h1>
      <h3>
        Lives: <span>{gameState.lives}</span>
      </h3>
      <h3>
        Your current guess:
        <span>{gameState.currentState}</span>
      </h3>

      <form id="guess" className="d-inline" onSubmit={fetchOnGuess}>
        <input
          type="text"
          name="guessChar"
          placeholder="guess..."
          autoComplete="off"
          maxLength="1"
          autoFocus
          required
        />
        <button
          className="btn btn-dark"
          type="submit"
          name="forwardBtn"
          autoFocus="autofocus"
          //   onClick={() => setGuessing(true)}
        >
          Guess
        </button>
      </form>

      <form id="restart" className="d-inline">
        <button
          className="btn btn-outline-dark"
          type="submit"
          name="restartBtn"
        >
          Restart
        </button>
      </form>
    </div>
  );
}
