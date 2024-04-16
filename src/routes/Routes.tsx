import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';

import { RouteComponent, routeComponents } from './routeComponent';
import { Authenticated } from 'components/Authenticated';
import { LayoutMain } from 'layouts/LayoutMain';
import { LoginPage, RegisterPage } from 'pages/auth';
import { CatchAllNavigate } from 'components/CatchAllNavigate/CatchAllNavigate';
import { authProvider } from 'context/authProvider';
import { useMemo, useState } from 'react';

export const RenderRouteComponent = (routes: RouteComponent[]) => {
  const { authenticated } = useMemo(() => authProvider.check(), []);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(authenticated);
  return (
    <Routes>
      <Route
        element={
          <Authenticated
            key="authentication-layout"
            isLoggedIn={isLoggedIn}
            fallback={<CatchAllNavigate to="/login" />}
          >
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
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
};

export const BaseRoutes = () => {
  return <Router>{RenderRouteComponent(routeComponents)}</Router>;
};
