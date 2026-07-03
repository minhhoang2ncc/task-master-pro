import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { rememberReducer, rememberEnhancer } from 'redux-remember';

import taskReducer from './features/taskSlice';
import userReducer from './features/userSlice';
import notifyReducer from './features/notifySlice';
import languageReducer from './features/languageSlice';

// 1. Assign your reducers
const reducers = {
  tasks: taskReducer,
  user: userReducer,
  notify: notifyReducer,
  language: languageReducer,
};

// 2. Combine them into a root reducer
const rootReducer = combineReducers(reducers);

// 3. Specify which keys (slices of state) you want to persist
const rememberedKeys = ['tasks', 'user', 'notify', 'language'];

// 4. Wrap your combined reducer with rememberReducer
const reducer = rememberReducer(rootReducer);

// 5. Configure the store
const store = configureStore({
  reducer,
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(
      // 6. Add the enhancer with your preferred storage (e.g., localStorage)
      rememberEnhancer(window.localStorage, rememberedKeys)
    )
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;