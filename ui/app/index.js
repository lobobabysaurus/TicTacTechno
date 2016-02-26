import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import Home from 'components/home';
import reducer from 'reducers';

const store = createStore(reducer,
                          applyMiddleware(thunkMiddleware));

$(() => {
  ReactDOM.render(
    <Provider store={store}>
      <Home />
    </ Provider>,
    document.getElementById('app'));
});
