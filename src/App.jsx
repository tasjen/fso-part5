import Notification from './components/Notification';
import { useLocalStorage } from './hooks';
import { Outlet, redirect } from 'react-router-dom';
import Navigation from './components/Navigation';

export const loader = async () => {
  const user = useLocalStorage('loggedUser').getItem();

  if (!user) return redirect('/login');

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
