import { useContext } from 'react';
import UserContext from '../context/UserContext';
import { useLocalStorage } from '../hooks';

const LogOutButton = () => {
  const { setUser } = useContext(UserContext);
  const loggedUser = useLocalStorage('loggedUser');
  const handleLogOut = () => {
    setUser(null);
    loggedUser.removeItem();
  };
  return <button onClick={handleLogOut}>logout</button>;
};

export default LogOutButton;
