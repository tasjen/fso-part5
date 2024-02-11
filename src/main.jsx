import ReactDOM from 'react-dom/client';
import App from './App';
import Index from './pages/Index';
import Users from './pages/Users';
import User from './pages/User';
import ErrorPage from './pages/ErrorPage';
import BlogPage from './pages/BlogPage';
import './index.css';
import { NotificationContextProvider } from './context/NotificationContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LogInForm from './pages/LogInForm';
import { loader as loginLoader } from './pages/LogInForm';
import { loader as appLoader } from './App';

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/login',
    element: <LogInForm />,
    loader: loginLoader,
  },
  {
    path: '/',
    element: <App />,
    loader: appLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
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
      {
        path: 'blogs/:blogId',
        element: <BlogPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <RouterProvider router={router} />
    </NotificationContextProvider>
  </QueryClientProvider>
);
