import { AlertModal } from 'components';
import { ConfigProvider } from 'context';
import { changeTitleApp, useSocketSubscription } from 'hooks';
import BaseRoutes from 'routes/BaseRoutes';
import { operationalSettingEventHandlers, orderEventHandlers } from 'services';

function App() {
  useSocketSubscription([orderEventHandlers, operationalSettingEventHandlers]);
  changeTitleApp();

  return (
    <ConfigProvider>
      <BaseRoutes />
      <AlertModal />
    </ConfigProvider>
  );
}

export default App;
