import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks';
import NotificationContext from '../context/NotificationContext';
import { useContext } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const LogOutButton = () => {
  const navigate = useNavigate();
  const { showNotification } = useContext(NotificationContext);
  const queryClient = useQueryClient();

  const handleLogOut = () => {
    try {
      const loggedUser = useLocalStorage('loggedUser');
      loggedUser.removeItem();
      queryClient.removeQueries(['blogs']);
    } catch (err) {
      showNotification(err);
    }
    navigate('/login');
  };

  return <button onClick={handleLogOut}>logout</button>;
};

export default LogOutButton;
