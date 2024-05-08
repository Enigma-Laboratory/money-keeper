import { AlertModal } from 'components';
import { ConfigProvider } from 'context';
import { BaseRoutes } from 'routes';

function App() {
  return (
    <ConfigProvider>
      <BaseRoutes />
      <AlertModal />
    </ConfigProvider>
  );
}

export default App;
