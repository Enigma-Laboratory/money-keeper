import { AlertModal } from 'components';
import { ConfigProvider } from 'contexts';
import { useSocketSubscription } from 'hooks';
import BaseRoutes from 'routes/BaseRoutes';

function App() {
  useSocketSubscription([]);

  return (
    <ConfigProvider>
      <BaseRoutes />
      <AlertModal />
    </ConfigProvider>
  );
}

export default App;
