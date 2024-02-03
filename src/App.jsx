import { useEffect, useContext } from 'react';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import UserContext from './context/UserContext';
import LogInForm from './components/LogInForm';
import LogOutButton from './components/LogOutButton';
import BlogList from './components/BlogList';
import { useLocalStorage } from './hooks';

const App = () => {
  const { user, setUser } = useContext(UserContext);
  const loggedUser = useLocalStorage('loggedUser');

  useEffect(() => {
    if (loggedUser) {
      setUser(loggedUser.getItem());
    }
  }, []);

  if (user === null) {
    return <LogInForm />;
  }

  return (
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
