import { Navigate, Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { Authenticated, CatchAllNavigate } from 'components';
import { authProvider } from 'context';
import { LayoutMain } from 'layouts';
import { LoginPage, RegisterPage } from 'pages';
import { useMemo, useState } from 'react';
import { RouteComponent, routeComponents } from './routeComponent';

const RenderRouteComponent = (routes: RouteComponent[]) => {
  const { authenticated } = useMemo(() => authProvider.check(), []);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(authenticated);
  return (
    <Routes>
      <Route
        element={
          <Authenticated key="authentication-layout" isLoggedIn={isLoggedIn} fallback={<CatchAllNavigate to="login" />}>
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
          <Authenticated key="authentication-auth" isLoggedIn={isLoggedIn} fallback={<Outlet />}>
            <Navigate to="/" />
          </Authenticated>
        }
      >
        <Route path="login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
};

const BaseRoutes = () => {
  return <Router>{RenderRouteComponent(routeComponents)}</Router>;
};

export default BaseRoutes;
