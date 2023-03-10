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
    <BrowserRouter>
      <RootContext>
        <Routes />
      </RootContext>
    </BrowserRouter>
  );
};

export default App;
