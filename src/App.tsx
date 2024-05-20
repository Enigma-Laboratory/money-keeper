import { AlertModal } from 'components';
import { ConfigProvider } from 'context';
import BaseRoutes from 'routes/BaseRoutes';

function App() {
  return (
    <ConfigProvider>
      <BaseRoutes />
      <AlertModal />
    </ConfigProvider>
  );
}

export default App;
