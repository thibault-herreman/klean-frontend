import React from 'react';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import tokenObj from './Reducers/token.reducer'
import Nav from './NavComponents/Nav'

const store = createStore(combineReducers({ tokenObj }));

export default function App() {
  return (
    <Provider store={store}>
      <Nav/>
    </Provider>
  );
}