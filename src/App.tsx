import { BaseRoutes } from 'routes';
import { LayoutMain } from './layouts/LayoutMain';

function App() {
  console.log(process.env);
  return (
    <LayoutMain>
      <BaseRoutes />
    </LayoutMain>
  );
}

export default App;
