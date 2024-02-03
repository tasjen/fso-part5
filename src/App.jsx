import { useContext } from 'react';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import LogInForm from './components/LogInForm';
import LogOutButton from './components/LogOutButton';
import BlogList from './components/BlogList';
import { useUserQuery } from './hooks';
import NotificationContext from './context/NotificationContext';

const App = () => {
  const { user, isLoading, isError, error } = useUserQuery();
  const { showNotification } = useContext(NotificationContext);

  if (isLoading) {
    return <p>loading...</p>;
  } else if (isError) {
    showNotification(error);
    return <></>;
  }

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
      <Togglable buttonLabel="create new blog">
        <BlogForm />
      </Togglable>
      <BlogList />
    </>
  );
};

export default App;
