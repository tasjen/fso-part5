import { Link } from 'react-router-dom';
import { useUserQuery } from '../hooks';
import LogOutButton from './LogOutButton';

const Navigation = () => {
  const { user } = useUserQuery();
  return (
    <nav>
      <Link to="/">blogs</Link> <Link to="/users">users</Link> {user?.name}{' '}
      logged in <LogOutButton />
    </nav>
  );
};

export default Navigation;
