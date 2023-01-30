import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import RootContext from './context';
import Routes from './routes';

const App = () => {
  const loader = document.querySelector('.loader-container');
  const hideLoader = () => loader?.classList.add('loader--hide');

  useEffect(() => {
    hideLoader();
  }, []);

  return (
    <RootContext>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </RootContext>
  );
};

export default App;
