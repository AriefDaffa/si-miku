import { BrowserRouter } from 'react-router-dom';

import RootContext from './context';
import Routes from './routes';

const App = () => {
  return (
    <RootContext>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </RootContext>
  );
};

export default App;
