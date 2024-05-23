import { Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { Authenticated, CatchAllNavigate } from 'components';
import { InitialLayout, LayoutMain } from 'layouts';
import { LoginPage, RegisterPage } from 'pages';
import { RouteComponent, routeComponents } from './routeComponent';

const RenderRouteComponent = (routes: RouteComponent[]) => {
  return (
    <Routes>
      <Route
        element={
          <Authenticated key="authentication-layout" fallback={<CatchAllNavigate to="login" />}>
            <LayoutMain>
              <Outlet />
            </LayoutMain>
          </Authenticated>
        }
      >
        {routes.map((route) => {
          return <Route key={route.name} path={route.path} element={route.component} />;
        })}
      </Route>

      <Route
        element={
          <InitialLayout>
            <Outlet />
          </InitialLayout>
        }
      >
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
};

const BaseRoutes = () => {
  return <Router>{RenderRouteComponent(routeComponents)}</Router>;
};

export default BaseRoutes;
