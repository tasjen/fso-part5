import Notification from './components/Notification';
import LogOutButton from './components/LogOutButton';
import { useLocalStorage } from './hooks';
import { Outlet, redirect, useLoaderData } from 'react-router-dom';
import blogService from './services/blogs';
import Navigation from './components/Navigation';

export const loader = (queryClient) => async () => {
  const loggedUser =
    queryClient.getQueryData(['user']) ??
    (await queryClient.fetchQuery({
      queryKey: ['user'],
      queryFn: useLocalStorage('loggedUser').getItem,
    }));

  if (!loggedUser) return redirect('/login');

  if (!queryClient.getQueryData(['blogs'])) {
    await queryClient.fetchQuery({
      queryKey: ['blogs'],
      queryFn: blogService.getAll,
    });
  }

  return loggedUser;
};

const App = () => {
  const user = useLoaderData();

  return (
    <>
      <Navigation />
      <h2>blogs</h2>
      <Notification />
      <div>
        {user?.name} logged in
        <LogOutButton />
      </div>
      <Outlet />
    </>
  );
};

export default App;
