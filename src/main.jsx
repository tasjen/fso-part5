import ReactDOM from 'react-dom/client';
import App from './App';
import Index from './components/Home';
import Users from './components/Users';
import User from './components/User';
import ErrorPage from './components/ErrorPage';
import './index.css';
import { NotificationContextProvider } from './context/NotificationContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LogInForm from './components/LogInForm';

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'users/:userId',
        element: <User />,
      },
    ],
  },
  {
    path: '/login',
    element: <LogInForm />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <RouterProvider router={router} />
    </NotificationContextProvider>
  </QueryClientProvider>
);
