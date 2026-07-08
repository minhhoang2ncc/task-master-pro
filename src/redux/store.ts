import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rememberReducer, rememberEnhancer } from 'redux-remember';
import rootSaga from '@/shared/saga';

import taskReducer from './features/taskSlice';
import userReducer from './features/userSlice';
import notifyReducer from './features/notifySlice';
import languageReducer from './features/languageSlice';

const sagaMiddleware = createSagaMiddleware();

const reducers = {
  tasks: taskReducer,
  user: userReducer,
  notify: notifyReducer,
  language: languageReducer,
};

const rootReducer = combineReducers(reducers);

const rememberedKeys = ['tasks', 'user', 'notify', 'language'];

const reducer = rememberReducer(rootReducer);

const store = configureStore({
  reducer,
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(
      rememberEnhancer(window.localStorage, rememberedKeys)
    ),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  middleware: (getDefaultMiddleware) =>
    // redux-remember bundles its own RTK copy which causes a TS2719 duplicate-type
    // conflict on GetDefaultMiddleware. Casting to `any` here is the minimal fix;
    // AppDispatch (derived from store.dispatch) still carries the full thunk + saga types.
    getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware) as any,
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
