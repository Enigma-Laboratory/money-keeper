import { BaseRoutes } from 'routes';
import { ConfigProvider } from 'context';
import { I18nextProvider } from 'react-i18next';
import i18n from 'services/translation';

function App() {
  return (
    <ConfigProvider>
      <I18nextProvider i18n={i18n}>
        <BaseRoutes />
      </I18nextProvider>
    </ConfigProvider>
  );
}

export default App;
