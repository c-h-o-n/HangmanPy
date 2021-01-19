import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export function Login() {
  const [isLoginPending, setLoginPending] = useState(false);
  const history = useHistory();
  function loginFormSubmit(e) {
    e.preventDefault();
    setLoginPending(true);
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ username: e.target.elements.username.value }),
    })
      .then(() => {
        setLoginPending(false);
        history.push('/lobby');
      })
      .catch(error => {
        alert('Login error');
        setLoginPending(false);
      });
  }

  if (isLoginPending) {
    return (
      <div className="text-center">
        <div className="spinner-border text-danger m-5"></div>
      </div>
    );
  }

  return (
    <div className="container-fluid d-flex justify-content-center h-100 login-container mt-5">
      <div className="card login-card">
        <div className="card-header login-card-header">
          <h3>HangmanPy</h3>
        </div>
        <div className="card-body">
          <form onSubmit={loginFormSubmit}>
            <div className="input-group form-group">
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="username"
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn float-right btn-warning">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
