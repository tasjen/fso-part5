import { useContext } from 'react';
import NotificationContext from '../context/NotificationContext';
import { isAxiosError } from 'axios';

const Notification = () => {
  const { notification } = useContext(NotificationContext);

  return notification === null ? (
    <></>
  ) : isAxiosError(notification) ? (
    <div className="error">
      {notification.response.data.error ?? notification.message}
    </div>
  ) : notification instanceof Error ? (
    <div className="error">{notification.message}</div>
  ) : (
    <div className="message">{notification}</div>
  );
};

export default Notification;
