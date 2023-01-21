import { useRoutes } from 'react-router-dom';
import PageWrapper from '../../components/PageWrapper';
import { Home, Customers, Products, NotFound } from '../../pages'


function page(component) {
    return <PageWrapper>
        {component ?? null}
    </PageWrapper>
}

function AppRouter() {
    const routing = useRoutes([
        { path: "/", element: page(Home) },
        { path: "/customers", element: page(Customers) },
        { path: "/products", element: page(Products) },
        { path: "*", element: < NotFound /> }]

    );
    return (
        <div>
            {routing}
        </div>
    )
}

export default AppRouter