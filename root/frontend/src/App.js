import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Login } from './Login';
import { Lobby } from './Lobby';
import { Game } from './Game';
import { GameCreatePage } from './GameCreatePage';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/lobby" component={Lobby} />
        <Route path="/rooms" />
        <Route path="/create-game" component={GameCreatePage} />
        <Route path="/game-:gameId" component={Game} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}
