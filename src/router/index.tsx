import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Container, Spinner } from 'react-bootstrap';

const Garage = lazy(() => import('../components/pages/Garage'));
const Winners = lazy(() => import('../components/pages/Winners'));
const NotFound = lazy(() => import('../components/pages/NotFound'));
const Loader = (
  <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
    <Spinner animation="border" />
  </Container>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={Loader}>
        <Garage />
      </Suspense>
    ),
  },
  {
    path: '/winners',
    element: (
      <Suspense fallback={Loader}>
        <Winners />{' '}
      </Suspense>
    ),
  },
  {
    path: '*',
    element: (
      <Suspense fallback={Loader}>
        <NotFound />{' '}
      </Suspense>
    ),
  },
]);

export default router;
