import { Link } from 'react-router-dom';
import LogOutButton from './LogOutButton';
import { useLocalStorage } from '../hooks';

const Navigation = () => {
  const user = useLocalStorage('loggedUser').getItem();
  return (
    <nav className="m-4 flex font-bold text-xl">
      <Link to="/" className="mr-4">
        blogs
      </Link>
      <Link to="/users" className="mr-auto">
        users
      </Link>
      <p className="mr-4 font-normal">{user?.name} logged in</p>
      <LogOutButton />
    </nav>
  );
};

export default Navigation;
