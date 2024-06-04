import { Outlet, Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';

import { Authenticated, CatchAllNavigate } from 'components';
import { useKeyboardShortcut } from 'hooks';
import { InitialLayout, LayoutMain } from 'layouts';
import { ForgotPage, LoginPage, RegisterPage } from 'pages';
import { NavigateService } from 'services';

import { RouteComponent, routeComponents } from './routeComponent';

const RenderRouteComponent = (props: { routes: RouteComponent[] }) => {
  const { routes } = props;
  const navigate = useNavigate();
  NavigateService.instance.setNavigate(navigate);
  const { toggleTheme, toggleLanguage } = useKeyboardShortcut();

  toggleTheme();
  toggleLanguage({ character: '|' });
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
        <Route path="forgot" element={<ForgotPage />} />
      </Route>
    </Routes>
  );
};

export const BaseRoutes = () => {
  return (
    <Router>
      <RenderRouteComponent routes={routeComponents} />
    </Router>
  );
};
