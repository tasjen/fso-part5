import { useUserMutation } from '../hooks';

const LogOutButton = () => {
  const { logOut } = useUserMutation();

  return <button onClick={logOut}>logout</button>;
};

export default LogOutButton;
