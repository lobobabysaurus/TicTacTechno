import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer from 'reducers';
import Home from 'views/home';

$(() => {
  ReactDOM.render(
    <Provider store={createStore(reducer)}>
      <Home />
    </ Provider>,
    document.getElementById('app'));
});
