import { Link } from 'react-router-dom';
import LogOutButton from './LogOutButton';
import { useLocalStorage } from '../hooks';

const Navigation = () => {
  const user = useLocalStorage('loggedUser').getItem();
  return (
    <nav>
      <Link to="/">blogs</Link> <Link to="/users">users</Link> {user?.name}{' '}
      logged in <LogOutButton />
    </nav>
  );
};

export default Navigation;
