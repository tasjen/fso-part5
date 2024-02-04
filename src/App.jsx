import { useContext } from 'react';
import Notification from './components/Notification';
import LogInForm from './components/LogInForm';
import LogOutButton from './components/LogOutButton';
import { useUserQuery, useBlogsQuery } from './hooks';
import NotificationContext from './context/NotificationContext';
import { Outlet, useNavigate } from 'react-router-dom';

const App = () => {
  const userQuery = useUserQuery();
  const blogsQuery = useBlogsQuery();
  const navigate = useNavigate();

  const { showNotification } = useContext(NotificationContext);

  if (userQuery.isLoading || blogsQuery.isLoading) {
    return <p>loading...</p>;
  } else if (userQuery.isError || blogsQuery.isError) {
    showNotification(userQuery.error || blogsQuery.error);
    return <></>;
  }

  const { user } = userQuery;
  console.log(user);
  console.log(blogsQuery.blogs);

  return !user ? (
    <LogInForm />
  ) : (
    <>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <LogOutButton />
      </div>
      <Outlet />
    </>
  );
};

export default App;
