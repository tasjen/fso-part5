import { useContext } from 'react';
import NotificationContext from '../context/NotificationContext';
import { isAxiosError } from 'axios';

const Notification = () => {
  const { notification } = useContext(NotificationContext);

  if (notification === null) {
    return <></>;
  }

  let isError = false;
  let message = notification;

  if (isAxiosError(notification)) {
    message = notification.response.data.error;
    isError = true;
  } else if (notification instanceof Error) {
    message = notification.message;
    isError = true;
  }

  return <div className={isError ? 'error' : 'message'}>{message}</div>;
};

export default Notification;
