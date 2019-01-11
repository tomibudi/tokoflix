import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { promise, persistedReducer } from './persist';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const preloadedState = window.__PRELOADED_STATE__ || {}; // eslint-disable-line

const store = createStore(
  persistedReducer,
  preloadedState,
  composeEnhancers(applyMiddleware(promise, ...middleware ))
);
const persistor = persistStore(store)

export {
    store,
    persistor
}