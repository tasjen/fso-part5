import { redirect, useNavigate } from 'react-router-dom';
import Notification from '../components/Notification';
import { useInput } from '../hooks';
import { useLocalStorage } from '../hooks';
import { logIn } from '../services/login';
import NotificationContext from '../context/NotificationContext';
import { useContext } from 'react';

export const loader = () => {
  const user = useLocalStorage('loggedUser').getItem();
  return user ? redirect('/') : null;
};

const LogInForm = () => {
  const username = useInput('text');
  const password = useInput('password');
  const navigate = useNavigate();
  const { showNotification } = useContext(NotificationContext);

  const handleLogIn = async (event) => {
    event.preventDefault();
    try {
      const user = await logIn({
        username: username.value,
        password: password.value,
      });
      const loggedUser = useLocalStorage('loggedUser');
      loggedUser.setItem(user);
      navigate('/');
    } catch (err) {
      showNotification(err);
    }
  };

  return (
    <form onSubmit={handleLogIn} method="post" action="/login">
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
