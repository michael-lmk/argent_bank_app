import './App.css';
import { useEffect } from 'react';
import { Provider } from 'react-redux'
import Navigation from './navigation/Navigation';
import store from './redux/store/Store';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import React from 'react';

let persistor = persistStore(store);

function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation></Navigation>
      </PersistGate>
    </Provider>
  );
}

export default App;
