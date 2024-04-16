import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';

import { RouteComponent, routeComponents } from './routeComponent';
import { Authenticated } from 'components/Authenticated';
import { LayoutMain } from 'layouts/LayoutMain';
import { LoginPage, RegisterPage } from 'pages/auth';

export const renderRouteComponent = (routes: RouteComponent[]) => {
  return (
    <Routes>
      <Route
        element={
          <Authenticated key="authentication-layout" fallback={<></>}>
            <LayoutMain>
              <Outlet />
            </LayoutMain>
          </Authenticated>
        }
      >
        {routes.map((route) => (
          <Route path={route.path} element={route.component} />
        ))}
      </Route>

      <Route
        element={
          <Authenticated key="authentication-auth" redirectOnFail fallback={<Outlet />}>
            <Navigate to="dashboard" />
          </Authenticated>
        }
      >
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
};

export const BaseRoutes = () => {
  return <Router>{renderRouteComponent(routeComponents)}</Router>;
};
