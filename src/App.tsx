import { AlertModal } from 'components';
import { ConfigProvider } from 'context';
import { useSocketSubscription } from 'hooks';
import BaseRoutes from 'routes/BaseRoutes';
import { operationalSettingEventHandlers, orderEventHandlers } from 'services';

function App() {
  useSocketSubscription([orderEventHandlers, operationalSettingEventHandlers]);
  return (
    <ConfigProvider>
      <BaseRoutes />
      <AlertModal />
    </ConfigProvider>
  );
}

export default App;
