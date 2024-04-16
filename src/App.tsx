import { BaseRoutes } from 'routes';
import { LayoutMain } from './layouts/LayoutMain';
import { ConfigProvider } from './context';

function App() {
  return (
    <ConfigProvider>
      <BaseRoutes />
    </ConfigProvider>
  );
}

export default App;
