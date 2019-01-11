import { persistReducer } from 'redux-persist';
import reducers from './root-reducers';
import promiseMiddleware from 'redux-promise-middleware';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'tokoflix2019',
    storage,
}
const promise = promiseMiddleware()
const persistedReducer = persistReducer(persistConfig, reducers)

export {
    promise,
    persistedReducer
}