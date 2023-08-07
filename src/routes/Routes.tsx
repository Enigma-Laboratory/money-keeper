import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { RouteComponent, routeComponents } from './routeComponent';

export const renderRouteComponent = (routes: RouteComponent[]) => {
  return (
    <Routes>
      {routes.map(route => (
        <Route path={route.path} element={route.component} />
      ))}
    </Routes>
  );
};

export const BaseRoutes = () => {
  return <Router>{renderRouteComponent(routeComponents)}</Router>;
};
