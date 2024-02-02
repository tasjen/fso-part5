import { useContext } from 'react';
import NotificationContext from '../context/NotificationContext';

const Notification = () => {
  const { notification } = useContext(NotificationContext);

  if (notification.text === '') {
    return <></>;
  }

  return (
    <div className={notification.error ? 'error' : 'message'}>
      {notification.text}
    </div>
  );
};

export default Notification;
