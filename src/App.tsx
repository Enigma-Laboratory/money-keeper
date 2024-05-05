import { ConfigProvider } from 'context';
import { BaseRoutes } from 'routes';

function App() {
  return (
    <ConfigProvider>
      <BaseRoutes />
    </ConfigProvider>
  );
}

export default App;
