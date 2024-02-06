import Notification from './components/Notification';
import { useLocalStorage } from './hooks';
import { Outlet, redirect } from 'react-router-dom';
import blogService from './services/blogs';
import Navigation from './components/Navigation';

export const loader = (queryClient) => async () => {
  const user = useLocalStorage('loggedUser').getItem();

  if (!user) return redirect('/login');

  if (!queryClient.getQueryData(['blogs'])) {
    await queryClient.fetchQuery({
      queryKey: ['blogs'],
      queryFn: blogService.getAll,
    });
  }

  return null;
};

const App = () => {
  return (
    <>
      <Navigation />
      <Notification />
      <Outlet />
    </>
  );
};

export default App;
