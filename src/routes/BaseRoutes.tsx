import { Outlet, Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';

import { Authenticated, CatchAllNavigate } from 'components';
import { InitialLayout, LayoutMain } from 'layouts';
import { LoginPage, RegisterPage } from 'pages';
import { NavigateService } from 'services/NavigateService';
import { RouteComponent, routeComponents } from './routeComponent';

const RenderRouteComponent = (props: { routes: RouteComponent[] }) => {
  const { routes } = props;
  const navigate = useNavigate();
  NavigateService.instance.setNavigate(navigate);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Authenticated key="authentication" fallback={<CatchAllNavigate to="login" />}>
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
        path="/"
        element={
          <Authenticated
            key="public"
            fallback={
              <InitialLayout>
                <Outlet />
              </InitialLayout>
            }
          >
            <CatchAllNavigate to="login" />
          </Authenticated>
        }
      >
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
};

const BaseRoutes = () => {
  return (
    <Router>
      <RenderRouteComponent routes={routeComponents} />
    </Router>
  );
};

export default BaseRoutes;
