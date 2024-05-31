import { createBrowserRouter } from 'react-router-dom';
import Garage from '../components/pages/Garage';
import NotFound from '../components/pages/NotFound';
import Winners from '../components/pages/Winners';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Garage />,
  },
  {
    path: '/winners',
    element: <Winners />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
