import { redirect, useNavigate } from 'react-router-dom';
import Notification from '../components/Notification';
import { useInput, useUserMutation } from '../hooks';
import { useLocalStorage } from '../hooks';

export const loader = (queryClient) => async () => {
  const loggedUser =
    queryClient.getQueryData(['user']) ??
    (await queryClient.fetchQuery({
      queryKey: ['user'],
      queryFn: useLocalStorage('loggedUser').getItem,
    }));
  return loggedUser ? redirect('/') : null;
};

const LogInForm = () => {
  const username = useInput('text');
  const password = useInput('password');
  const { logIn } = useUserMutation();
  const navigate = useNavigate();

  const handleLogIn = async (event) => {
    event.preventDefault();
    await logIn({
      username: username.value,
      password: password.value,
    });
    navigate('/');
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
