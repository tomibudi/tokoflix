import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'

import routes from './routes';

render(
  <Provider store={store}  >
    <PersistGate loading={<div>LOADING</div>} persistor={persistor}>
      <Router history={browserHistory}>
        { routes }
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('app') // eslint-disable-line no-undef
);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./redux/root-reducers', () => {
    store.replaceReducer(require('./redux/root-reducers').default); // eslint-disable-line global-require
  });
}
