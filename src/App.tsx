import { AlertModal } from 'components';
import { appConfig, environment } from 'config';
import { ConfigProvider } from 'contexts';
import { useSocketSubscription } from 'hooks';
import { BaseRoutes } from 'routes';
import { chartInit } from 'utils';
import { dayjsInit } from 'utils/dayjs';

function App() {
  document.title = (environment === 'development' ? 'dev | ' : '') + appConfig.appTitle;
  useSocketSubscription([]);
  dayjsInit();
  chartInit();

  return (
    <ConfigProvider>
      <BaseRoutes />
      <AlertModal />
    </ConfigProvider>
  );
}

export default App;
