import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Home from 'components/home';
import reducer from 'reducers';

const store = createStore(reducer);

$(() => {
  ReactDOM.render(
    <Provider store={store}>
      <Home />
    </ Provider>,
    document.getElementById('app'));
});
