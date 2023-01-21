import { useRoutes } from 'react-router-dom';
import PageWrapper from '../../components/PageWrapper';
import { Customers, Products, NotFound } from '../../pages';

function page(Component) {
  return <PageWrapper>{<Component /> ?? null}</PageWrapper>;
}

function AppRouter() {
  const routing = useRoutes([
    { path: '/customers', element: page(Customers) },
    { path: '/products', element: page(Products) },
    { path: '*', element: <NotFound /> },
  ]);
  return <div>{routing}</div>;
}

export default AppRouter;
