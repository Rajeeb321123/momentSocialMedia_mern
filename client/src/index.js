import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';



// importing the reducer
import authReducer from 'state';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';



// importing  redux persist only: persist save the state and  data as local state even if the browser is closed. only way to remove it is clearing the cache
import {
  persistStore,
  FLUSH,
  persistReducer,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';



// setting our persist with authReducer or redux store states
const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);
// configure redux store with persit 
// if you want to learn normal way for this look at movieInfo code  which doesnot have perisit
const store = configureStore({
  // source redux toolkit and persit docs
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    {/* redux store */}
    <Provider store={store}>

      {/* persist */}
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>



  </React.StrictMode>
);




// note: like persist , we also have session to store state in local state for particular state only unitil browser's tab is closed . It can be helpful for future project