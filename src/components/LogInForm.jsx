import Notification from './Notification';
import { useInput, useUserMutation } from '../hooks';

const LogInForm = () => {
  const username = useInput('text');
  const password = useInput('password');
  const { logIn } = useUserMutation();

  const handleLogIn = async (event) => {
    event.preventDefault();
    await logIn({
      username: username.value,
      password: password.value,
    });
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
