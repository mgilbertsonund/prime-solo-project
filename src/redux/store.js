import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; 
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './reducers/_root.reducer';
import rootSaga from './sagas/_root.saga';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const middlewareList = process.env.NODE_ENV === 'development'
  ? [sagaMiddleware, logger]
  : [sagaMiddleware];

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  applyMiddleware(...middlewareList, thunk)
);

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };
