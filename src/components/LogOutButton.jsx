import { useUserMutation } from '../hooks';
import { useNavigate } from 'react-router-dom';

const LogOutButton = () => {
  const { logOut } = useUserMutation();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await logOut();
    navigate('/login');
  };

  return <button onClick={handleLogOut}>logout</button>;
};

export default LogOutButton;
