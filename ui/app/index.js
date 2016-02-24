import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer from 'reducers';
import Home from 'components/home';

const store = createStore(reducer);

$(() => {
  ReactDOM.render(
    <Provider store={store}>
      <Home />
    </ Provider>,
    document.getElementById('app'));
});
