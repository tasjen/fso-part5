import { useContext } from 'react';
import UserContext from '../context/UserContext';
import Notification from './Notification';
import NotificationContext from '../context/NotificationContext';
import loginService from '../services/login';
import { useInput } from '../hooks';

const LogInForm = () => {
  const { setUser } = useContext(UserContext);
  const username = useInput('text');
  const password = useInput('password');
  const { showNotification } = useContext(NotificationContext);

  const handleLogIn = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      });

      localStorage.setItem('loggedUser', JSON.stringify(user));
      setUser(user);
      resetAllForms();
    } catch (err) {
      showNotification(err);
    }
  };

  const resetAllForms = () => {
    username.onReset();
    password.onReset();
  };

  return (
    <form onSubmit={handleLogIn}>
      <h1>log in to application</h1>
      <Notification />
      <div>
        <label htmlFor="username">username</label>
        <input id="username" {...username} />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input id="password" {...password} />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LogInForm;
