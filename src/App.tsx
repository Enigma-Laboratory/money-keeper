import { AlertModal } from 'components';
import { appConfig, environment } from 'config';
import { ConfigProvider } from 'contexts';
import { useSocketSubscription } from 'hooks';
import { BaseRoutes } from 'routes';

function App() {
  document.title = (environment === 'development' ? 'dev | ' : '') + appConfig.appTitle;
  useSocketSubscription([]);

  return (
    <ConfigProvider>
      <BaseRoutes />
      <AlertModal />
    </ConfigProvider>
  );
}

export default App;
